import { AfterViewInit } from '@angular/core';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-btn-purple',
  templateUrl: './btn-purple.component.html',
  styleUrls: ['./btn-purple.component.scss'],
})
export class BtnPurpleComponent implements OnInit {
  @Input() buttonDisabled: boolean = false;
  @Input() textButton: string = '';
  @Input() type: string = 'button';
  @Input() showIcon: boolean = false;
  @Input() iconFirst: boolean = true;
  @Input() icone: any;

  @Output() emmiterClick = new EventEmitter();


  constructor() {}

  ngOnInit(): void {}

  clickButton(data: any): void {
    return this.emmiterClick.emit(data);
  }
}
