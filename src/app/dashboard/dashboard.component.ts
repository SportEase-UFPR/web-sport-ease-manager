import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from './services/dashboard.service';
import { Reserva } from '../shared/models/reserva/reserva.model';
import { ToastrService } from 'ngx-toastr';
import { Item } from '../shared/components/inputs/input-select-option/model/item.model';
import { NegarReserva } from '../shared/models/reserva/negar-reserva.model';
import { HttpErrorResponse } from '@angular/common/http';
const moment = require('moment');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  formNegarReserva: FormGroup = new FormGroup({
    justificativa: new FormControl(null, [Validators.required]),
  });

  formFiltro: FormGroup = new FormGroup({
    tempoSolicitacao: new FormControl(1),
  });

  faClose = faXmark;
  faConfirm = faCheck;

  reservas?: Reserva[];
  opcFiltroSolicitacoes: Item[] = [
    new Item(0, 'Antigas primeiro'),
    new Item(1, 'Recentes primeiro'),
  ];

  private idReserva?: number;

  constructor(
    private modalService: NgbModal,
    private ngxLoaderService: NgxUiLoaderService,
    private dashboardService: DashboardService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.populate();
  }

  populate() {
    this.dashboardService.listarReservasSolicitadas().subscribe({
      next: (result) => {
        this.reservas = result;
        if (this.reservas.length > 1) {
          this.ordenarReservas();
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
        this.reservas = [];
        if (err.error?.message == 'Nenhuma reserva solicitada') {
          this.toastrService.info(
            'Até o momento nenhuma reserva foi solicitada',
            'Nenhuma reserva encontrada'
          );
        } else {
          this.toastrService.error(
            'Por favor, tente novamente mais tarde',
            'Erro ao trazer reservas solicitadas'
          );
        }
      },
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

  ordenarReservas() {
    if (Number(this.formFiltro.get('tempoSolicitacao')?.value) === 0) {
      this.reservas = this.reservas?.sort(
        (a, b) => moment(a.dataHoraSolicitacao) - moment(b.dataHoraSolicitacao)
      );
    } else {
      this.reservas = this.reservas?.sort(
        (a, b) => moment(b.dataHoraSolicitacao) - moment(a.dataHoraSolicitacao)
      );
    }
  }

  aprovarReserva() {
    this.ngxLoaderService.startLoader('loader-01');
    this.dashboardService.aprovarReserva(this.idReserva!).subscribe({
      next: (result) => {
        this.populate();
        this.formNegarReserva.reset();
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
    const motivo = this.formNegarReserva.get('justificativa');
    if (motivo?.valid) {
      this.dashboardService
        .negarReserva(this.idReserva!, new NegarReserva(motivo.value))
        .subscribe({
          next: (result) => {
            this.populate();
            this.formNegarReserva.reset();
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
}
