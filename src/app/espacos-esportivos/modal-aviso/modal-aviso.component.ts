import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-aviso',
  templateUrl: './modal-aviso.component.html',
  styleUrls: ['./modal-aviso.component.scss'],
})
export class ModalAvisoComponent implements OnInit {
  faClose = faXmark;
  faConfirm = faCheck;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
