import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-espacos-esportivos',
  templateUrl: './espacos-esportivos.component.html',
  styleUrls: ['./espacos-esportivos.component.scss'],
})
export class EspacosEsportivosComponent implements OnInit {
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

  openModalConfirmacao(): void {
    const modalRef = this.modalService.open(ModalConfirmacaoComponent, {
      centered: true,
    });
  }
}
