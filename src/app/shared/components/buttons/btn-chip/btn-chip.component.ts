import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-btn-chip',
  templateUrl: './btn-chip.component.html',
  styleUrls: ['./btn-chip.component.scss']
})
export class BtnChipComponent implements OnInit {
  @Input() text: string = '';

  @Output() emitterClick = new EventEmitter()

  faCancel = faXmark;

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.emitterClick.emit()
  }
}
