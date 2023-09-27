import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao.component';
import { ModalDetalhesComponent } from './modal-detalhes/modal-detalhes.component';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.scss'],
})
export class AdministradoresComponent implements OnInit {
  formSearch: FormGroup = new FormGroup({
    searchValue: new FormControl(null),
  });

  numeros: number[] = [1, 2, 3, 4, 5, 6];

  p: number = 1;
  faPlus = faPlus;
  faTrash = faTrashCan;
  faPencil = faPencil;
  faEye = faEye;

  constructor(private router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {}

  searchEspacoEsportivo(): void {
    console.log(this.formSearch.value);
  }

  navigate(rota: string, parametro?: string) {
    this.router.navigateByUrl(parametro ? `${rota}/${parametro}` : rota);
  }

  visualizarDetalhes(): void {}

  openModalDetalhes(): void {
    const modalRef = this.modalService.open(ModalDetalhesComponent, {
      centered: true,
    });
  }

  openModalConfirmacao(): void {
    const modalRef = this.modalService.open(ModalConfirmacaoComponent, {
      centered: true,
    });
  }
}
