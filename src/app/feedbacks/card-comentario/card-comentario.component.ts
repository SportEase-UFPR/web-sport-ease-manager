import { Component, Input, OnInit } from '@angular/core';
import { FeedbackReserva } from 'src/app/shared/models/reserva/feedback-reserva.model';

@Component({
  selector: 'app-card-comentario',
  templateUrl: './card-comentario.component.html',
  styleUrls: ['./card-comentario.component.scss'],
})
export class CardComentarioComponent implements OnInit {
  @Input() comentario: FeedbackReserva = new FeedbackReserva();

  constructor() {}

  ngOnInit(): void {}

  buildingStartsRating(media: number): string[] {
    let stars = ['a', 'a', 'a', 'a', 'a'];
    if (media <= 4.7) {
      const parteInteira = Math.trunc(media);
      const parteDecimal = media % 1;
      for (let i = parteInteira; i < 5; i++) {
        if (i == parteInteira) {
          stars[i] =
            parteDecimal <= 0.3 ? 'c' : parteDecimal >= 0.7 ? 'a' : 'm';
        } else {
          stars[i] = 'c';
        }
      }
    }

    return stars;
  }
}
