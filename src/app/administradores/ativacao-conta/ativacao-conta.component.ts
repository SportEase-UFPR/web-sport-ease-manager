import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';
import { take } from 'rxjs';
import { AdministradoresService } from '../services/administradores.service';

@Component({
  selector: 'app-ativacao-conta',
  templateUrl: './ativacao-conta.component.html',
  styleUrls: ['./ativacao-conta.component.scss'],
})
export class AtivacaoContaComponent implements OnInit, OnDestroy {
  ativandoConta: boolean = true;
  contaAtivada: boolean = false;
  email = env.email;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private admsService: AdministradoresService
  ) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');

    this.activatedRoute.queryParams.pipe(take(1)).subscribe((queryParams) => {
      const token = queryParams['token'];

      if (token) {
        this.admsService
          .ativarConta(token)
          .pipe(take(1))
          .subscribe({
            next: (result) => {
              this.ativandoConta = false;
              this.contaAtivada = true;
            },

            error: (err) => {
              this.ativandoConta = false;
              this.contaAtivada = false;
            },
          });
      } else {
        this.ativandoConta = false;
        this.contaAtivada = false;
      }
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');
  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
