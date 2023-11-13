import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import {
  faCheck,
  faPencil,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdministradoresService } from './services/administradores.service';
import { take } from 'rxjs';
import { Adm } from '../shared/models/adm/adm.model';
import { SessionStorageService } from '../shared/services/session-storage/session-storage.service';
import { environment as env } from 'src/environments/environment';
import { Token } from '../shared/models/token/token.model';
import jwt_decode from 'jwt-decode';
import { UsuarioSs } from '../shared/models/usuario-ss/usuario-ss.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { AdmExclusaoResponse } from '../shared/models/adm/adm-exclusao-response';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.scss'],
})
export class AdministradoresComponent implements OnInit {
  formSearch: FormGroup = new FormGroup({
    searchValue: new FormControl(null, [Validators.required]),
  });

  adms?: Adm[];
  admsFilter: Adm[] = [];

  p: number = 1;
  faPlus = faPlus;
  faTrash = faTrashCan;
  faPencil = faPencil;
  faEye = faEye;
  faClose = faXmark;
  faConfirm = faCheck;
  nomeGerenteDelete!: string;
  idGerenteDelete!: number;
  userId!: number;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private admsService: AdministradoresService,
    private ssService: SessionStorageService,
    private toastrService: ToastrService,
    private ngxLoaderService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    const ssDados: UsuarioSs = this.ssService.get(env.ss_token);
    const token: Token = jwt_decode(ssDados.token!);
    this.userId = Number(token.sub);
    this.populate();
  }

  populate(): void {
    this.admsService.getAdministradores().pipe(take(1)).subscribe({
      next: (result: Adm[]) => {
        this.adms = result;
        this.admsFilter = result;
      },
      error: (err) => {
        this.adms = [];
        console.error(err);
      },
    });
  }

  searchAdms(): void {
    this.admsFilter = this.adms!;

    const valueSearch: string = this.formSearch.get('searchValue')?.value;
    this.admsFilter = this.admsFilter.filter((adm) => {
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
    this.nomeGerenteDelete = nomeEE;
    this.idGerenteDelete = id;
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  deletarEspacoEsportivo() {
    this.ngxLoaderService.startLoader('loader-01');
    this.admsService.deletarAdm(this.idGerenteDelete).pipe(take(1)).subscribe({
      next: (result: AdmExclusaoResponse) => {
        this.ngxLoaderService.stopLoader('loader-01');
        this.populate();
        this.closeModal();
        this.toastrService.success('Gerente removido', 'Sucesso!');
      },
      error: (err) => {
        this.ngxLoaderService.stopLoader('loader-01');
        this.toastrService.error(
          'Por favor, tente novamente mais tarde',
          'Falha ao remover gerente'
        );
      },
    });
  }
}
