import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  isVisualizacao: boolean = false;
  isEdicao: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.url.subscribe((url) => {
      switch (url[0].path) {
        case 'novo-espaco':
          this.isVisualizacao = false;
          this.isEdicao = false
          break;

        case 'editar-espaco':
          this.isVisualizacao = false;
          this.isEdicao = true
          this.activatedRoute.params.subscribe((params) => {});
          break;

        default:
          this.isVisualizacao = true;
          this.isEdicao = false
          this.activatedRoute.params.subscribe((params) => {});
          break;
      }
    });
  }
}
