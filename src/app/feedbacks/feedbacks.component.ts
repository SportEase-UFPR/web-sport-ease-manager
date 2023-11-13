import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FeedbacksService } from './services/feedbacks.service';
import { Item } from '../shared/components/inputs/input-select-option/model/item.model';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FeedbackReserva } from '../shared/models/reserva/feedback-reserva.model';
import { BuildFilter } from '../utils/build-filter';
import { take } from 'rxjs';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
})
export class FeedbacksComponent implements OnInit {
  formComentarios: FormGroup = new FormGroup({
    espacoEsportivo: new FormControl(null),
  });

  formRating: FormGroup = new FormGroup({
    rating: new FormControl(-1),
  });

  p: number = 1;
  comentarios?: FeedbackReserva[] = [];
  comentariosFiltered?: FeedbackReserva[];
  espacos: Item[] = [];
  filterRating: Item[] = [];

  constructor(
    private feedbacksService: FeedbacksService,
    private toastrService: ToastrService,
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
          this.espacos = result.map((r) => new Item(r.id, r.nome));
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
    this.comentarios = undefined;
    this.feedbacksService
      .buscarComentarios(
        Number(this.formComentarios.get('espacoEsportivo')?.value)
      )
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.formRating.reset();
          this.comentarios = result.filter((c) => c.comentario !== null);
          BuildFilter.adicionarItem(this.filterRating, -1, 'Todos');
          this.comentarios.forEach((c) =>
            BuildFilter.adicionarItem(
              this.filterRating,
              c.avaliacao!,
              `${c.avaliacao} ${c.avaliacao == 1 ? ' estrela' : ' estrelas'}`
            )
          );
        },
        error: (err) => {
          this.comentarios = [];
          console.log(err);
        },
      });
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
}
