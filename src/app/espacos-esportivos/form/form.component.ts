import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  isVisualizacao: boolean = false;
  isEdicao: boolean = false;

  inscricaoRota!: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.inscricaoRota = this.activatedRoute.url.subscribe((url) => {
      switch (url[0].path) {
        case 'novo-espaco':
          this.isVisualizacao = false;
          this.isEdicao = false;
          break;

        case 'editar-espaco':
          this.isVisualizacao = false;
          this.isEdicao = true;
          this.inscricaoRota = this.activatedRoute.params.subscribe(
            (params) => {}
          );
          break;

        default:
          this.isVisualizacao = true;
          this.isEdicao = false;
          this.inscricaoRota = this.activatedRoute.params.subscribe(
            (params) => {}
          );
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.inscricaoRota?.unsubscribe();
  }
}
