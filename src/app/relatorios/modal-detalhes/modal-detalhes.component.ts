import { Component, Input, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reserva } from 'src/app/shared/models/reserva/reserva.model';

@Component({
  selector: 'app-modal-detalhes',
  templateUrl: './modal-detalhes.component.html',
  styleUrls: ['./modal-detalhes.component.scss'],
})
export class ModalDetalhesComponent implements OnInit {
  @Input() reserva: Reserva = new Reserva();

  faClose = faXmark;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
