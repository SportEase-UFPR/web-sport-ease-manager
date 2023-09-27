import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-btn-border-purple',
  templateUrl: './btn-border-purple.component.html',
  styleUrls: ['./btn-border-purple.component.scss']
})
export class BtnBorderPurpleComponent implements OnInit {
  @Input() buttonDisabled: boolean = false;
  @Input() textButton: string = '';
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
