import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import {
  faCheck,
  faPencil,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EspacosEsportivosService } from './services/espacos-esportivos.service';
import { EspacoEsportivoResponse as eeResponse } from '../shared/models/espaco-esportivo/espaco-esportivo-response.model';
import { ModalDetalhesComponent } from './modal-detalhes/modal-detalhes.component';
import { EspacoEsportivoExclusaoResponse as eeExclusaoResponse } from '../shared/models/espaco-esportivo/espaco-esportivo-exclusao-response.model';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-espacos-esportivos',
  templateUrl: './espacos-esportivos.component.html',
  styleUrls: ['./espacos-esportivos.component.scss'],
})
export class EspacosEsportivosComponent implements OnInit {
  formSearch: FormGroup = new FormGroup({
    searchValue: new FormControl(null, [Validators.required]),
  });

  ee: eeResponse[] = [];
  eeFilter: eeResponse[] = [];

  p: number = 1;
  faPlus = faPlus;
  faTrash = faTrashCan;
  faPencil = faPencil;
  faEye = faEye;

  faClose = faXmark;
  faConfirm = faCheck;

  nomeEEDelete!: string;
  idEEDelete!: number;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private eeService: EspacosEsportivosService,
    private toastrService: ToastrService,
    private ngxLoaderService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.ngxLoaderService.startLoader('loader-01');
    this.populate();
    this.ngxLoaderService.stopLoader('loader-01');
  }

  populate(): void {
    this.eeService.listarEE().subscribe({
      next: (result: eeResponse[]) => {
        this.ee = result;
      },
      error: (err) => {
        this.ee = [];
        console.error(err);
      },
    });
  }

  searchEspacoEsportivo(): void {
    this.eeFilter = this.ee;

    const valueSearch: string = this.formSearch.get('searchValue')?.value;
    this.eeFilter = this.eeFilter.filter((adm) => {
      return adm.nome?.toUpperCase()?.includes(valueSearch.toUpperCase());
    });
  }

  navigate(rota: string, parametro?: string) {
    this.router.navigateByUrl(parametro ? `${rota}/${parametro}` : rota);
  }

  openModalConfirmacao(modal: any, id: number, nomeEE: string): void {
    this.modalService.open(modal, {
      centered: true,
    });
    this.nomeEEDelete = nomeEE;
    this.idEEDelete = id;
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  deletarEspacoEsportivo() {
    this.ngxLoaderService.startLoader('loader-01');
    this.eeService.excluirEE(this.idEEDelete).subscribe({
      next: (result: eeExclusaoResponse) => {
        this.closeModal();
        this.populate();
        this.ngxLoaderService.stopLoader('loader-01');
        this.toastrService.success('Espaço esportivo removido', 'Sucesso!');
      },
      error: (err) => {
        this.closeModal();
        console.error(err);
        this.ngxLoaderService.stopLoader('loader-01');
        this.toastrService.error(
          'Por favor, tente novamente mais tarde',
          'Erro ao remover espaço esportivo'
        );
      },
    });
  }

  visualizarEE(ee: eeResponse): void {
    const modalRef = this.modalService.open(ModalDetalhesComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.ee = ee;
  }

  editarEE(id: number): void {
    this.router.navigateByUrl(`/editar-espaco/${id}`);
  }
}
