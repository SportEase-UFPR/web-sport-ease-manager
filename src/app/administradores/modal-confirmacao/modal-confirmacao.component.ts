import { Component, Input, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdministradoresService } from '../services/administradores.service';
import { AdmExclusaoResponse } from '../../shared/models/adm-exclusao-response/adm-exclusao-response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss'],
})
export class ModalConfirmacaoComponent implements OnInit {
  @Input() nomeGerente!: string;
  @Input() idGerente!: number;

  faClose = faXmark;
  faConfirm = faCheck;

  constructor(
    public activeModal: NgbActiveModal,
    private admsService: AdministradoresService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  deletarAdministrador(): void {
    this.admsService.deletarAdm(this.idGerente).subscribe({
      next: (result: AdmExclusaoResponse) => {
        this.toastrService.success('', 'Gerente removido!');
        this.activeModal.close();
        location.reload();
      },
      error: (err) => {
        this.toastrService.error(
          'Por favor, tente novamente mais tarde',
          'Falha ao remover gerente'
        );
      },
    });
  }
}
