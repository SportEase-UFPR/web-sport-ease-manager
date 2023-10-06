import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chip-esporte',
  templateUrl: './chip-esporte.component.html',
  styleUrls: ['./chip-esporte.component.scss'],
})
export class ChipEsporteComponent implements OnInit {
  @Input() esporte: string = '';

  @Output() emitterClick = new EventEmitter()

  faCancel = faXmark;

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.emitterClick.emit()
  }
}
