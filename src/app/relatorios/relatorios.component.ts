import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  faAngleDown,
  faAngleUp,
  faFilterCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
const moment = require('moment');
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ModalDetalhesComponent } from './modal-detalhes/modal-detalhes.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RelatoriosService } from './services/relatorios.service';
import { Reserva } from '../shared/models/reserva/reserva.model';
import { Item } from '../shared/components/inputs/input-select-option/model/item.model';
import { StatusLocacao } from '../shared/models/enums/status-locacao';

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

  historico?: Reserva[];
  historicoFiltered?: Reserva[];

  filtroClientes: Item[] = [];
  filtroLocal: Item[] = [];
  filtroStatus: Item[] = [];

  p: number = 1;

  constructor(
    private toastrService: ToastrService,
    private ngxLoaderService: NgxUiLoaderService,
    private modalService: NgbModal,
    private relatoriosService: RelatoriosService
  ) {}

  ngOnInit(): void {
    this.ngxLoaderService.startLoader('loader-01');
    this.relatoriosService.buscarRelatorios().subscribe({
      next: (result) => {
        this.historico = result;
        this.montarFiltros();
      },
      error: (erro) => {
        this.historico = undefined;
        this.toastrService.error(
          'Por favor, tente novamnete mais tarde',
          'Erro ao trazer histórico das reservas'
        );
      },
    });
    this.ngxLoaderService.stopLoader('loader-01');
  }

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
        (h) => h.informacoesComplementaresLocacao?.nomeCliente === solicitante
      );
      this.ngxLoaderService.stopLoader('loader-01');
    }

    if (localFilter) {
      this.ngxLoaderService.startLoader('loader-01');
      filteredHistorico = filteredHistorico?.filter(
        (h) =>
          h.informacoesComplementaresLocacao?.idEspacoEsportivo ===
          Number(localFilter)
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

  openModalDetalhes(reserva: Reserva): void {
    const modalRef = this.modalService.open(ModalDetalhesComponent, {
      centered: true,
    });

    modalRef.componentInstance.reserva = reserva;
  }

  montarFiltros() {
    this.historico?.forEach((h) => {
      this.adicionarItemUnico(
        this.filtroClientes,
        h.informacoesComplementaresLocacao?.nomeCliente!
      );

      this.adicionarItemUnico(
        this.filtroLocal,
        h.informacoesComplementaresLocacao?.nomeEspacoEsportivo!
      );

      this.adicionarItemUnico(this.filtroStatus, h.status!);
    });
  }

  adicionarItemUnico(filtroArray: Item[], value: string) {
    if (
      filtroArray.length === 0 ||
      !filtroArray.some((f) => f.value === value)
    ) {
      filtroArray.push(new Item(value, value));

      filtroArray.sort((a, b) => {
        if (
          a.value?.toString().toUpperCase()! >
          b.value?.toString().toUpperCase()!
        ) {
          return 1;
        }
        if (
          a.value?.toString().toUpperCase()! <
          b.value?.toString().toUpperCase()!
        ) {
          return -1;
        }

        return 0;
      });
    }
  }
}
