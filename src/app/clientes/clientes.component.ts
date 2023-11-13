import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ClientesService } from './services/clientes.service';
import { ClienteDetalhado } from '../shared/models/cliente/cliente-detalhado.model';
import { BloquearContaRequest } from '../shared/models/cliente/bloquear-conta-request.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  formJustificativa: FormGroup = new FormGroup({
    justificativa: new FormControl(null, [Validators.required]),
  });

  formSearch: FormGroup = new FormGroup({
    searchValue: new FormControl(null),
  });

  faClose = faXmark;
  faConfirm = faCheck;

  nomeClienteModify: string = '';
  idCliente: number = 0;

  clientes?: ClienteDetalhado[];
  clientesFiltered?: ClienteDetalhado[];

  constructor(
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private ngxLoaderService: NgxUiLoaderService,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.populate();
  }

  populate() {
    this.clientes = undefined;
    this.clientesFiltered = undefined;
    this.clientesService.buscarCliente().subscribe({
      next: (result) => {
        this.clientes = result;
        this.ordenaArray(this.clientes);
      },
      error: (err) => {
        this.clientes = [];
        this.toastrService.error(
          'Por favor, tente novamente mais tarde',
          'Erro ao buscar clientes'
        );
      },
    });
  }

  searchClientes(): void {
    const value = this.formSearch.get('searchValue')?.value;

    if (value) {
      this.clientesFiltered = this.clientes?.filter((c) =>
        c.nome?.toUpperCase()?.includes(value.toUpperCase())
      );

      this.ordenaArray(this.clientesFiltered!);
    } else {
      this.clientesFiltered = undefined;
    }
  }

  ordenaArray(array: ClienteDetalhado[]) {
    array.sort((a, b) => {
      if (a.nome?.toUpperCase()! > b.nome?.toUpperCase()!) {
        return 1;
      }
      if (a.nome?.toUpperCase()! < b.nome?.toUpperCase()!) {
        return -1;
      }

      return 0;
    });
  }

  openModalConfirmacao(
    modal: any,
    idCliente: number,
    nomeCliete: string
  ): void {
    this.idCliente = idCliente;
    this.nomeClienteModify = nomeCliete;

    this.modalService.open(modal, {
      centered: true,
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  bloquearCliente() {
    const form = this.formJustificativa;
    if (form.valid) {
      this.ngxLoaderService.startLoader('loader-01');
      this.clientesService
        .bloquarCliente(
          this.idCliente,
          new BloquearContaRequest(form.get('justificativa')?.value)
        )
        .subscribe({
          next: (result) => {
            this.populate();
            this.closeModal();
            form.reset();
            this.toastrService.success(
              `A conta de ${this.nomeClienteModify} foi bloqueada`,
              'Sucesso'
            );
          },
          error: (err) => {
            this.toastrService.error(
              'Por favor, tente novamente mais tarde',
              `Erro ao bloquear ${this.nomeClienteModify}`
            );
          },
        });
      this.ngxLoaderService.stopLoader('loader-01');
    } else {
      this.toastrService.warning(
        `Por favor, informe a justificativa para bloquear ${this.nomeClienteModify}`,
        'Justificativa é obrigatória'
      );
    }
  }

  desbloquearCliente() {
    this.ngxLoaderService.startLoader('loader-01');
    this.clientesService.desbloquarCliente(this.idCliente).subscribe({
      next: (result) => {
        this.populate();
        this.closeModal();
        this.toastrService.success(
          `A conta de ${this.nomeClienteModify} foi desbloqueada`,
          'Sucesso'
        );
      },
      error: (err) => {
        this.toastrService.error(
          'Por favor, tente novamente mais tarde',
          `Erro ao desbloquear ${this.nomeClienteModify}`
        );
      },
    });
    this.ngxLoaderService.stopLoader('loader-01');
  }
}
