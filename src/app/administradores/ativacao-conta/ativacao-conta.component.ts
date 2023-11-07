import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';
import { Subscription } from 'rxjs';
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
  inscricaoRota!: Subscription;
  inscricaoAtivacao!: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private admsService: AdministradoresService
  ) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');

    this.inscricaoRota = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        const token = queryParams['token'];

        if (token) {
          this.inscricaoAtivacao = this.admsService
            .ativarConta(token)
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
      }
    );
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');
    this.inscricaoAtivacao?.unsubscribe();
    this.inscricaoRota?.unsubscribe();
  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
