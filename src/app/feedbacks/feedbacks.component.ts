import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FeedbacksService } from './services/feedbacks.service';
import { Item } from '../shared/components/inputs/input-select-option/model/item.model';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FeedbackReserva } from '../shared/models/reserva/feedback-reserva.model';
import { BuildFilter } from '../utils/build-filter';
import { take } from 'rxjs';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
})
export class FeedbacksComponent implements OnInit {
  formComentarios: FormGroup = new FormGroup({
    espacoEsportivo: new FormControl(-1),
  });

  formRating: FormGroup = new FormGroup({
    rating: new FormControl(-1),
  });

  p: number = 1;
  comentarios?: FeedbackReserva[] = [];
  comentariosFiltered?: FeedbackReserva[];
  espacos: Item[] = [];
  filterRating: Item[] = [];

  private idComentario: number = 0;

  faClose = faXmark;
  faConfirm = faCheck;

  constructor(
    private feedbacksService: FeedbacksService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private ngxLoaderService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.ngxLoaderService.startLoader('loader-01');
    this.populate();
    this.ngxLoaderService.stopLoader('loader-01');
  }

  populate() {
    this.feedbacksService
      .listarEE()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.espacos = [];
          BuildFilter.adicionarItem(this.espacos, -1, 'Nenhum');
          result.forEach((e) => {
            BuildFilter.adicionarItem(this.espacos, e.id!, e.nome!);
          });
        },
        error: (err) => {
          this.toastrService.error(
            'Por favor, tente novamente mais tarde',
            'Erro ao buscar espaços esportivos'
          );
        },
      });
  }

  buscarComentarios() {
    const espaco = Number(this.formComentarios.get('espacoEsportivo')?.value);
    if (espaco == -1) {
      this.filterRating = [];
      this.comentarios = [];
      this.comentariosFiltered = undefined;
    } else {
      this.comentarios = undefined;
      this.feedbacksService
        .buscarComentarios(espaco)
        .pipe(take(1))
        .subscribe({
          next: (result) => {
            this.comentarios = result.filter((c) => c.avaliacao);
            this.filterRating = [];
            BuildFilter.adicionarItem(this.filterRating, -1, 'Todos');
            this.comentarios.forEach((c) =>
              BuildFilter.adicionarItem(
                this.filterRating,
                c.avaliacao!,
                `${c.avaliacao} ${c.avaliacao == 1 ? ' estrela' : ' estrelas'}`
              )
            );
            this.formRating.reset();
          },
          error: (err) => {
            this.comentarios = [];
            console.log(err);
          },
        });
    }
  }

  filtrarComentarios() {
    this.ngxLoaderService.startLoader('loader-01');
    const value = Number(this.formRating.get('rating')?.value);

    if (value == -1) {
      this.comentariosFiltered = undefined;
    } else {
      this.comentariosFiltered = this.comentarios?.filter(
        (c) => c.avaliacao == Number(this.formRating.get('rating')?.value)
      );
    }
    this.ngxLoaderService.stopLoader('loader-01');
  }

  openModalConfirmacao(id: number, modal: any): void {
    this.idComentario = id;

    this.modalService.open(modal, {
      centered: true,
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  excluirComentario() {
    this.ngxLoaderService.startLoader('loader-01');
    this.feedbacksService
      .deletarComentario(this.idComentario)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.ngxLoaderService.stopLoader('loader-01');
          this.closeModal();
          this.toastrService.success('O comentário foi excluído', 'Sucesso');
          this.buscarComentarios();
        },
        error: (err) => {
          this.ngxLoaderService.stopLoader('loader-01');
          this.closeModal();
          this.toastrService.error(
            'Por favor, tente novamente mais tarde',
            'Erro ao excluir o comentário'
          );
        },
      });
  }
}
