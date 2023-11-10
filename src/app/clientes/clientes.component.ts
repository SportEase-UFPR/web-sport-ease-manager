import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
    searchValue: new FormControl(null, [Validators.required]),
  });

  faClose = faXmark;
  faConfirm = faCheck;

  nomeClienteModify: string = '';

  clientes?: any[]

  constructor(
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private ngxLoaderService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {}

  searchClientes(): void {}

  openModalConfirmacao(modal: any): void {
    this.modalService.open(modal, {
      centered: true,
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  bloquearCliente() {}

  desbloquearCliente() {}
}
