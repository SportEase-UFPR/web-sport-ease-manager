import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao.component';
import { ModalDetalhesComponent } from './modal-detalhes/modal-detalhes.component';
import { AdministradoresService } from './services/administradores.service';
import { Subscription } from 'rxjs';
import { Adm } from '../shared/models/adm/adm.model';
import { SessionStorageService } from '../shared/services/session-storage/session-storage.service';
import { environment as env } from 'src/environments/environment';
import { Token } from '../shared/models/token/token.model';
import jwt_decode from 'jwt-decode';
import { UsuarioSs } from '../shared/models/usuario-ss/usuario-ss.model';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.scss'],
})
export class AdministradoresComponent implements OnInit, OnDestroy {
  formSearch: FormGroup = new FormGroup({
    searchValue: new FormControl(null, [Validators.required]),
  });

  inscricaoAdms!: Subscription;

  adms: Adm[] = [];
  admsFilter: Adm[] = [];

  p: number = 1;
  faPlus = faPlus;
  faTrash = faTrashCan;
  faPencil = faPencil;
  faEye = faEye;
  userId!: number

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private admsService: AdministradoresService,
    private ssService: SessionStorageService
  ) {}

  ngOnInit(): void {
    const ssDados: UsuarioSs = this.ssService.get(env.ss_token);
    const token: Token = jwt_decode(ssDados.token!);
    this.userId = Number(token.sub)
    this.populate();
  }

  populate(): void {
    this.inscricaoAdms = this.admsService.getAdministradores().subscribe({
      next: (result: Adm[]) => {
        this.adms = result;
        this.admsFilter = result;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnDestroy(): void {}

  searchEspacoEsportivo(): void {
    this.admsFilter = this.adms;

    const valueSearch: string = this.formSearch.get('searchValue')?.value;
    this.admsFilter = this.admsFilter.filter((adm) => {
      return adm.nome?.toUpperCase()?.includes(valueSearch.toUpperCase());
    });
  }

  navigate(rota: string, parametro?: string) {
    this.router.navigateByUrl(parametro ? `${rota}/${parametro}` : rota);
  }

  openModalDetalhes(adm: Adm): void {
    const modalRef = this.modalService.open(ModalDetalhesComponent, {
      centered: true,
    });

    modalRef.componentInstance.adm = adm;
  }

  openModalConfirmacao(adm: Adm): void {
    const modalRef = this.modalService.open(ModalConfirmacaoComponent, {
      centered: true,
    });

    modalRef.componentInstance.nomeGerente = adm.nome;
    modalRef.componentInstance.idGerente = adm.id;
  }
}
