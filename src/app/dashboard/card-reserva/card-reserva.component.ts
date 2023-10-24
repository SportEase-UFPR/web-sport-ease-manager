import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  faAngleDown,
  faAngleUp,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-reserva',
  templateUrl: './card-reserva.component.html',
  styleUrls: ['./card-reserva.component.scss'],
})
export class CardReservaComponent implements OnInit {
  faConfirm = faCheck;
  faCancel = faXmark;

  motivoReservaCollapsed = false;
  justificativaReservaCollapsed = false;

  @Output() aprovarReserva = new EventEmitter();
  @Output() negarReserva = new EventEmitter();

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
