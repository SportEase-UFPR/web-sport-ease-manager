import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faAngleDown,
  faAngleUp,
  faBan,
  faCheck,
  faFilterCircleXmark,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ModalDetalhesComponent } from './modal-detalhes/modal-detalhes.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RelatoriosService } from './services/relatorios.service';
import { Reserva } from '../shared/models/reserva/reserva.model';
import { Item } from '../shared/components/inputs/input-select-option/model/item.model';
import { NegarReserva } from '../shared/models/reserva/negar-reserva.model';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { BuildFilter } from '../utils/build-filter';
import { Subject, distinctUntilChanged, take, takeUntil } from 'rxjs';
import { EncerrarReserva } from '../shared/models/reserva/encerrar-reserva.model';
const moment = require('moment');

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss'],
})
export class RelatoriosComponent implements OnInit, OnDestroy {
  formFiltros: FormGroup = new FormGroup({
    dataInicial: new FormControl(null),
    dataFinal: new FormControl(null),
    solicitante: new FormControl(-1),
    local: new FormControl(-1),
    status: new FormControl(-1),
  });

  formJustificativa: FormGroup = new FormGroup({
    justificativa: new FormControl(null, [Validators.required]),
  });

  faFilterRemove = faFilterCircleXmark;
  faClose = faXmark;
  faConfirm = faCheck;
  faEye = faEye;
  faBan = faBan;

  motivoReservaCollapsed: boolean = true;

  historico?: Reserva[];
  historicoFiltered?: Reserva[];

  filtroClientes: Item[] = [];
  filtroLocal: Item[] = [];
  filtroStatus: Item[] = [];

  minDate?: Date;
  maxDate?: Date;

  p: number = 1;

  dataInicial$ = new Subject();
  dataFinal$ = new Subject();

  private idReserva?: number;

  constructor(
    private toastrService: ToastrService,
    private ngxLoaderService: NgxUiLoaderService,
    private modalService: NgbModal,
    private relatoriosService: RelatoriosService
  ) {}

  ngOnInit(): void {
    this.populate();

    this.formFiltros
      .get('dataInicial')
      ?.valueChanges.pipe(distinctUntilChanged())
      .pipe(takeUntil(this.dataInicial$))
      .subscribe((v) => {
        (this.minDate = new Date(v)), this.filterHistorico();
      });

    this.formFiltros
      .get('dataFinal')
      ?.valueChanges.pipe(distinctUntilChanged())
      .pipe(takeUntil(this.dataFinal$))
      .subscribe((v) => {
        (this.maxDate = new Date(v)), this.filterHistorico();
      });
  }

  ngOnDestroy(): void {
    this.dataInicial$.next(null);
    this.dataFinal$.next(null);
    this.dataInicial$.complete();
    this.dataFinal$.complete();
  }

  populate() {
    this.relatoriosService
      .buscarRelatorios()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.historico = result;
          this.ordernarArray(this.historico);
          this.montarFiltros();
        },
        error: (erro) => {
          this.historico = [];
          this.toastrService.error(
            'Por favor, tente novamente mais tarde',
            'Erro ao trazer histórico das reservas'
          );
        },
      });
  }

  ordernarArray(array: Reserva[]) {
    array?.sort((a, b) => b.id! - a.id!);
  }

  filterHistorico(): void {
    const form = this.formFiltros;
    const dataInicial = form.get('dataInicial');
    const dataFinal = form.get('dataFinal');
    const solicitante = form.get('solicitante')?.value;
    const localFilter = form.get('local')?.value;
    const statusFilter = form.get('status')?.value;

    let filteredHistorico = this.historico;

    if (Number(solicitante) == -1) {
      filteredHistorico = this.historico;
    }

    if (Number(localFilter) == -1) {
      filteredHistorico = this.historico;
    }

    if (Number(statusFilter) == -1) {
      filteredHistorico = this.historico;
    }

    if (dataInicial?.value && dataFinal?.value) {
      const dataInicialValue = moment(dataInicial?.value).startOf('day');
      const dataFinalValue = moment(dataFinal?.value).startOf('day');

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

    if (solicitante && solicitante != -1) {
      this.ngxLoaderService.startLoader('loader-01');
      filteredHistorico = filteredHistorico?.filter(
        (h) => h.informacoesComplementaresLocacao?.nomeCliente === solicitante
      );
      this.ngxLoaderService.stopLoader('loader-01');
    }

    if (localFilter && localFilter != -1) {
      this.ngxLoaderService.startLoader('loader-01');
      filteredHistorico = filteredHistorico?.filter(
        (h) =>
          h.informacoesComplementaresLocacao?.idEspacoEsportivo ===
          Number(localFilter)
      );
      this.ngxLoaderService.stopLoader('loader-01');
    }

    if (statusFilter && statusFilter != -1) {
      this.ngxLoaderService.startLoader('loader-01');
      filteredHistorico = filteredHistorico?.filter(
        (h) => h.status === statusFilter
      );
      this.ngxLoaderService.stopLoader('loader-01');
    }

    this.historicoFiltered = filteredHistorico;
    this.ordernarArray(this.historicoFiltered!);
  }

  limparFiltros() {
    this.ngxLoaderService.startLoader('loader-01');
    this.formFiltros.patchValue({
      dataInicial: null,
      dataFinal: null,
      solicitante: -1,
      local: -1,
      status: -1,
    });
    this.historicoFiltered = undefined;
    this.minDate = undefined;
    this.maxDate = undefined;
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
    this.filtroClientes = [];
    this.filtroLocal = [];
    this.filtroStatus = [];
    this.motivoReservaCollapsed = false;

    BuildFilter.adicionarItem(this.filtroClientes, -1, 'Todos');
    BuildFilter.adicionarItem(this.filtroLocal, -1, 'Todos');
    BuildFilter.adicionarItem(this.filtroStatus, -1, 'Todos');

    this.historico?.forEach((h) => {
      BuildFilter.adicionarItem(
        this.filtroClientes,
        h.informacoesComplementaresLocacao?.nomeCliente!
      );

      BuildFilter.adicionarItem(
        this.filtroLocal,
        h.informacoesComplementaresLocacao?.idEspacoEsportivo!,
        h.informacoesComplementaresLocacao?.nomeEspacoEsportivo
      );

      BuildFilter.adicionarItem(this.filtroStatus, h.status!);
    });
  }

  openModalConfirmacao(id: number, modal: any): void {
    this.idReserva = id;

    this.modalService.open(modal, {
      centered: true,
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  aprovarReserva() {
    this.ngxLoaderService.startLoader('loader-01');
    this.relatoriosService
      .aprovarReserva(this.idReserva!)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.populate();
          this.formJustificativa.reset();
          this.closeModal();
          this.toastrService.success(
            `Reserva ${this.idReserva} aprovada com sucesso`,
            'Sucesso!'
          );
        },
        error: (err) => {
          this.toastrService.error(
            'Por favor, tente novamente mais tarde',
            `Erro ao aprovar reserva ${this.idReserva}`
          );
        },
      });
    this.ngxLoaderService.stopLoader('loader-01');
  }

  negarReserva() {
    this.ngxLoaderService.startLoader('loader-01');
    const motivo = this.formJustificativa.get('justificativa');
    if (motivo?.valid) {
      this.relatoriosService
        .negarReserva(this.idReserva!, new NegarReserva(motivo.value))
        .pipe(take(1))
        .subscribe({
          next: (result) => {
            this.populate();
            this.formJustificativa.reset();
            this.closeModal();
            this.toastrService.success(
              `Reserva ${this.idReserva} negada com sucesso`,
              'Sucesso!'
            );
          },
          error: (err) => {
            this.toastrService.error(
              'Por favor, tente novamente mais tarde',
              `Erro ao negar reserva ${this.idReserva}`
            );
          },
        });
    } else {
      this.toastrService.error(
        'Por favor, informe o motivo da negação da reserva',
        `Erro ao negar reserva ${this.idReserva}`
      );
    }
    this.ngxLoaderService.stopLoader('loader-01');
  }

  encerrarReserva() {
    const form = this.formJustificativa;
    if (form.valid) {
      this.ngxLoaderService.startLoader('loader-01');
      this.relatoriosService
        .encerrarReserva(
          this.idReserva!,
          new EncerrarReserva(form.get('justificativa')?.value)
        )
        .pipe(take(1))
        .subscribe({
          next: (result) => {
            this.populate();
            this.closeModal();
            this.toastrService.success(
              `A reserva ${this.idReserva} foi encerrada`,
              'Sucesso'
            );
          },
          error: (err) => {
            this.toastrService.error(
              'Por favor, tente novamente mais tarde',
              `Erro ao encerrar reserva ${this.idReserva}`
            );
          },
        });
      this.ngxLoaderService.stopLoader('loader-01');
    } else {
      this.toastrService.warning(
        'Por favor, informe a justificativa para encerrar a reserva',
        'Justificativa é obrigatória'
      );
    }
  }

  showEncerrarStatus(hora: Date | string): boolean {
    const horaAtual = moment();
    const horaReserva = moment(hora);
    return horaAtual.diff(horaReserva, 'hours') >= 1;
  }

  showAprovarReserva(hora: Date | string): boolean {
    const horaAtual = moment();
    const horaReserva = moment(hora);
    return horaAtual.diff(horaReserva, 'minutes') <= -15;
  }

  showNegarReserva(hora: Date | string): boolean {
    const horaAtual = moment();
    const horaReserva = moment(hora);
    return horaAtual.diff(horaReserva, 'minutes') <= 0;
  }
}
