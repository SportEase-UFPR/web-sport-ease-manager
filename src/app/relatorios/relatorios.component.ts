import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  faAngleDown,
  faAngleUp,
  faFilterCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ModalDetalhesComponent } from './modal-detalhes/modal-detalhes.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss'],
})
export class RelatoriosComponent implements OnInit {
  formFiltros: FormGroup = new FormGroup({
    dataInicial: new FormControl(null),
    dataFinal: new FormControl(null),
    solicitante: new FormControl(null),
    local: new FormControl(null),
    status: new FormControl(null),
  });

  faFilterRemove = faFilterCircleXmark;
  motivoReservaCollapsed: boolean = true;

  historico?: any[];
  historicoFiltered?: any[];

  p: number = 1;

  constructor(
    private toastrService: ToastrService,
    private ngxLoaderService: NgxUiLoaderService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {}

  filterHistorico(): void {
    const form = this.formFiltros;
    const dataInicial = form.get('dataInicial');
    const dataFinal = form.get('dataFinal');
    const solicitante = form.get('solicitante')?.value;
    const localFilter = form.get('local')?.value;
    const statusFilter = form.get('status')?.value;

    let filteredHistorico = this.historico;

    if (dataInicial?.value && dataFinal?.value) {
      const dataInicialValue = moment(dataInicial?.value);
      const dataFinalValue = moment(dataFinal?.value);

      if (dataFinalValue.diff(dataInicialValue, 'hour') >= 0) {
        this.ngxLoaderService.startLoader('loader-01');
        filteredHistorico = filteredHistorico?.filter((h) => {
          const dataReserva = moment(h.dataHoraInicioReserva);

          return (
            dataReserva.isSameOrAfter(dataInicialValue, 'day') &&
            dataReserva.isSameOrBefore(dataFinalValue, 'day')
          );
        });
        this.ngxLoaderService.stopLoader('loader-01');
      } else {
        dataFinal.patchValue(null);
        this.toastrService.info(
          'A data final não pode ser anterior à data inicial. Por favor, selecione uma data válida',
          'Período inválido'
        );
      }
    }

    if (solicitante) {
      this.ngxLoaderService.startLoader('loader-01');
      filteredHistorico = filteredHistorico?.filter(
        (h) => h.solicitante === solicitante
      );
      this.ngxLoaderService.stopLoader('loader-01');
    }

    if (localFilter) {
      this.ngxLoaderService.startLoader('loader-01');
      filteredHistorico = filteredHistorico?.filter(
        (h) => h.idEspacoEsportivo === Number(localFilter)
      );
      this.ngxLoaderService.stopLoader('loader-01');
    }

    if (statusFilter) {
      this.ngxLoaderService.startLoader('loader-01');
      filteredHistorico = filteredHistorico?.filter(
        (h) => h.status === statusFilter
      );
      this.ngxLoaderService.stopLoader('loader-01');
    }

    this.historicoFiltered = filteredHistorico;
  }

  limparFiltros() {
    this.ngxLoaderService.startLoader('loader-01');
    this.historicoFiltered = undefined;
    this.formFiltros.reset();
    this.ngxLoaderService.stopLoader('loader-01');
  }

  changeIcon(isCollapsed: boolean) {
    return isCollapsed ? faAngleDown : faAngleUp;
  }

  openModalDetalhes(reserva: any): void {
    const modalRef = this.modalService.open(ModalDetalhesComponent, {
      centered: true,
    });

    modalRef.componentInstance.reserva = reserva;
  }

}
