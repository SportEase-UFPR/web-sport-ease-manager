import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faAngleDown,
  faAngleUp,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Reserva } from 'src/app/shared/models/reserva/reserva.model';

@Component({
  selector: 'app-card-reserva',
  templateUrl: './card-reserva.component.html',
  styleUrls: ['./card-reserva.component.scss'],
})
export class CardReservaComponent implements OnInit {
  @Input() reserva: Reserva = new Reserva();

  @Output() aprovarReserva = new EventEmitter();
  @Output() negarReserva = new EventEmitter();

  faConfirm = faCheck;
  faCancel = faXmark;

  motivoReservaCollapsed = false;

  constructor() {}

  ngOnInit(): void {}

  changeIcon(isCollapsed: boolean) {
    return isCollapsed ? faAngleDown : faAngleUp;
  }

  aprovar() {
    this.aprovarReserva.emit();
  }

  negar() {
    this.negarReserva.emit();
  }
}
