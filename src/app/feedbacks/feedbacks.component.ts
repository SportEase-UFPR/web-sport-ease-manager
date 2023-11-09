import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FeedbacksService } from './services/feedbacks.service';
import { Item } from '../shared/components/inputs/input-select-option/model/item.model';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FeedbackReserva } from '../shared/models/reserva/feedback-reserva.model';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
})
export class FeedbacksComponent implements OnInit {
  formComentarios: FormGroup = new FormGroup({
    espacoEsportivo: new FormControl(null),
  });

  p: number = 1;
  comentarios: FeedbackReserva[] = [];
  espacos: Item[] = [];

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
    this.feedbacksService.listarEE().subscribe({
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
    this.ngxLoaderService.startLoader('loader-01');
    this.feedbacksService
      .buscarComentarios(
        Number(this.formComentarios.get('espacoEsportivo')?.value)
      )
      .subscribe({
        next: (result) => {
          this.comentarios = result.filter((c) => c.comentario !== null);
        },
        error: (err) => {
          this.comentarios = [];
          console.log(err);
        },
      });
    this.ngxLoaderService.stopLoader('loader-01');
  }
}
