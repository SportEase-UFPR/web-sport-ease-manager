import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { StatusLocacao } from 'src/app/shared/models/enums/status-locacao';
import { ClienteDetalhado } from '../../shared/models/cliente/cliente-detalhado.model';

@Component({
  selector: 'app-card-cliente',
  templateUrl: './card-cliente.component.html',
  styleUrls: ['./card-cliente.component.scss'],
})
export class CardClienteComponent implements OnInit {
  @Input() cliente: ClienteDetalhado = new ClienteDetalhado();
  
  faCircleCheck = faCircleCheck;
  faBan = faBan;

  statusReserva = StatusLocacao;

  @Output() emitterBlock = new EventEmitter();
  @Output() emitterUnblock = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  ativarConta() {
    this.emitterUnblock.emit();
  }

  desativarConta() {
    this.emitterBlock.emit();
  }
}
