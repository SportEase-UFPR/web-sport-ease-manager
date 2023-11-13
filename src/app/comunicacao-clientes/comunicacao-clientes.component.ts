import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { Item } from '../shared/components/inputs/input-select-option/model/item.model';
import { ComunicacaoClientesService } from './services/comunicacao-clientes.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EmailCliente } from '../shared/models/cliente/email-cliente.model';
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { SendEmailAll } from '../shared/models/cliente/send-email-all.model';
import { SendEmailCliente } from '../shared/models/cliente/send-email-cliente.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-comunicacao-clientes',
  templateUrl: './comunicacao-clientes.component.html',
  styleUrls: ['./comunicacao-clientes.component.scss'],
})
export class ComunicacaoClientesComponent implements OnInit, OnDestroy {
  formComunicacao: FormGroup = new FormGroup({
    sendToAll: new FormControl(true),
    assunto: new FormControl(null),
    mensagem: new FormControl({ value: '', disabled: false }, [
      Validators.required(),
    ]),
  });

  editor!: Editor;
  toolbar: Toolbar = [
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote'],
    ['ordered_list', 'bullet_list'],
    ['link'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  showClientes: boolean = false;
  faSendEmail = faEnvelopeCircleCheck;

  emailClientes: EmailCliente[] = [];
  emailClietesToSelect: Item[] = [];
  emailClienteToSend: string[] = [];

  constructor(
    private toastrService: ToastrService,
    private ngxLoaderService: NgxUiLoaderService,
    private comunicacaoService: ComunicacaoClientesService
  ) {}

  ngOnInit(): void {
    this.ngxLoaderService.startLoader('loader-01');
    this.editor = new Editor();
    this.ngxLoaderService.stopLoader('loader-01');
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  setSentToAll() {
    const form = this.formComunicacao;

    if (form.get('sendToAll')?.value) {
      this.ngxLoaderService.startLoader('loader-01');

      this.comunicacaoService
        .buscarClientes()
        .pipe(take(1))
        .subscribe({
          next: (result) => {
            this.emailClientes = result;
            this.emailClietesToSelect = result.map(
              (c) =>
                new Item(c.idCliente, `${c.nomeCliente}: ${c.emailCliente}`)
            );
          },
          error: (err) => {
            this.toastrService.error(
              'Por favor, tente novamente mais tarde',
              'Erro ao trazer e-mail dos clientes'
            );
          },
        });

      form.addControl('cliente', new FormControl(null));
      form.updateValueAndValidity();
      this.showClientes = true;

      this.ngxLoaderService.stopLoader('loader-01');
    } else {
      this.showClientes = false;
      form.removeControl('cliente');
      form.updateValueAndValidity();
    }
  }

  adicionarCliente() {
    const cliente = this.formComunicacao.get('cliente');
    const idCliente = Number(cliente?.value);
    this.emailClientes.forEach((e) => {
      if (e.idCliente == idCliente) {
        let jaExiste = false;
        this.emailClienteToSend?.forEach((eC) => {
          if (eC.includes(e.emailCliente!)) {
            jaExiste = true;
          }
        });

        if (!jaExiste) {
          this.emailClienteToSend.push(e.emailCliente!);
        }
      }
    });

    cliente?.patchValue(null);
  }

  removerEmail(email: string) {
    this.emailClienteToSend = this.emailClienteToSend.filter(
      (e) => e !== email
    );
  }

  enviarEmail() {
    const form = this.formComunicacao;

    if (form.valid) {
      if (form.get('sendToAll')?.value) {
        this.ngxLoaderService.startLoader('loader-01');
        const dados: SendEmailAll = new SendEmailAll(
          form.get('assunto')?.value,
          form.get('mensagem')?.value
        );

        this.comunicacaoService
          .enviarEmailAll(dados)
          .pipe(take(1))
          .subscribe({
            next: (result) => {
              this.ngxLoaderService.stopLoader('loader-01');
              this.toastrService.success(
                result?.mensagem ?? 'E-mails enviados',
                'Sucesso no envio do e-mail'
              );
              form.reset();
              this.emailClienteToSend = [];
            },
            error: (err) => {
              this.ngxLoaderService.stopLoader('loader-01');
              this.toastrService.error(
                'Por favor, tente novamente mais tarde',
                'Erro ao enviar e-mail'
              );
            },
          });
      } else {
        if (this.emailClienteToSend.length) {
          this.ngxLoaderService.startLoader('loader-01');
          const dados: SendEmailCliente = new SendEmailCliente(
            this.emailClienteToSend,
            form.get('assunto')?.value,
            form.get('mensagem')?.value
          );

          this.comunicacaoService
            .enviarEmailClientes(dados)
            .pipe(take(1))
            .subscribe({
              next: (result) => {
                this.ngxLoaderService.stopLoader('loader-01');
                this.toastrService.success(
                  result?.mensagem ?? 'E-mail enviados',
                  'Sucesso no envio do e-mail'
                );
                form.reset();
                this.emailClienteToSend = [];
              },
              error: (err) => {
                this.ngxLoaderService.stopLoader('loader-01');
                this.toastrService.error(
                  'Por favor, tente novamente mais tarde',
                  'Erro ao enviar e-mail'
                );
              },
            });
        } else {
          this.toastrService.warning(
            'Por favor, informe ao menos um cliente que irá receber o e-mail',
            'Informar clientes'
          );
        }
      }
    } else {
      this.toastrService.warning(
        'Por favor, preencha todos os campos do formulário',
        'Formulário inválido'
      );
    }
  }
}
