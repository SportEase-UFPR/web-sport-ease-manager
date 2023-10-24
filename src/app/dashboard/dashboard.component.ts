import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  formNegarReserva: FormGroup = new FormGroup({
    justificativa: new FormControl(null, [Validators.required]),
  });

  faClose = faXmark;
  faConfirm = faCheck;

  constructor(
    private modalService: NgbModal,
    private ngxLoaderService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.ngxLoaderService.startLoader('loader-01');
    this.ngxLoaderService.stopLoader('loader-01');
  }

  openModalConfirmacao(modal: any): void {
    console.log('aqui');

    this.modalService.open(modal, {
      centered: true,
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  aprovarReserva() {}

  negarReserva() {}
}
