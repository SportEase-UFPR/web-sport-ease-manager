import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import {
  faCheck,
  faPlus,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EspacosEsportivosService } from '../services/espacos-esportivos.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EsporteRequest } from 'src/app/shared/models/esporte/esporte-request';
import { EsporteResponse } from 'src/app/shared/models/esporte/esporte-response';
import { Item } from 'src/app/shared/components/inputs/input-select-option/model/item.model';
import { NgxImageCompressService } from 'ngx-image-compress';
import { EsporteExclusaoResponse } from 'src/app/shared/models/espaco-esportivo/esporte-exclusao-response.model';
import { EspacoEsportivoRequest } from 'src/app/shared/models/espaco-esportivo/espaco-esportivo-request.model';
import { EspacoEsportivoResponse as eeResponse } from '../../shared/models/espaco-esportivo/espaco-esportivo-response.model';
import { FormEspacoValidation } from './form-espaco-validation';
import { Subject, take, takeUntil } from 'rxjs';
import { ModalAvisoComponent } from '../modal-aviso/modal-aviso.component';
const moment = require('moment');

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  formEspacoEsportivo: FormGroup = new FormGroup({
    ativo: new FormControl(true),
    nome: new FormControl(null, [Validators.required]),
    descricao: new FormControl(null, [Validators.required]),
    localidade: new FormControl(null, [Validators.required]),
    dimensoes: new FormControl(null, [Validators.required]),
    abertura: new FormControl(null, [Validators.required]),
    fechamento: new FormControl(null, [Validators.required]),
    periodo: new FormControl(null, [Validators.required]),
    maxLocacao: new FormControl(null, [Validators.required, Validators.min(1)]),
    esportes: new FormControl(null),
    piso: new FormControl(null, [Validators.required]),
    capacidadeMin: new FormControl(null, [Validators.required]),
    capacidadeMax: new FormControl(null, [Validators.required]),
    funcionamento: new FormArray(
      [
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
      ],
      FormEspacoValidation.requiredMinCheckbox(1)
    ),
  });

  formEsporte: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
  });

  faAdd = faPlus;
  faClose = faXmark;
  faConfirm = faCheck;
  faTrash = faTrash;

  imgPreviewUrl: string = '';
  diasFuncionamento: number[] = [];

  isEdicao: boolean = false;
  idEEEdicao?: number;

  esportes: Item[] = [];
  esportesOfEE: EsporteResponse[] = [];

  daysOfWeek: string[] = [
    'domingo',
    'segunda',
    'terça',
    'quarta',
    'quinta',
    'sexta',
    'sábado',
  ];

  horaAbertura?: string;
  horaFechamento?: string;

  ativo$ = new Subject();
  funcionamento$ = new Subject();
  abertura$ = new Subject();
  fechamento$ = new Subject();
  periodo$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private eeService: EspacosEsportivosService,
    private toastrService: ToastrService,
    private ngxLoaderService: NgxUiLoaderService,
    private imgCompressService: NgxImageCompressService,
    private sanatizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.populate();

    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      const id = Number(params?.['id']);
      if (id) {
        this.ngxLoaderService.startLoader('loader-01');
        this.isEdicao = true;
        this.eeService
          .pegarEE(id)
          .pipe(take(1))
          .subscribe({
            next: (result: eeResponse) => {
              this.ngxLoaderService.stopLoader('loader-01');

              const diasFuncionamento: boolean[] = [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
              ];
              result.diasFuncionamento?.forEach(
                (d) => (diasFuncionamento[d] = true)
              );

              this.idEEEdicao = result.id;

              this.formEspacoEsportivo.patchValue({
                ativo: result.disponivel,
                nome: result.nome,
                descricao: result.descricao,
                localidade: result.localidade,
                dimensoes: result.dimensoes,
                piso: result.piso,
                abertura: `${result.horaAbertura?.split(':')[0]}:${
                  result.horaAbertura?.split(':')[1]
                }`,
                fechamento: `${result.horaFechamento?.split(':')[0]}:${
                  result.horaFechamento?.split(':')[1]
                }`,
                periodo: `${result.periodoLocacao?.split(':')[0]}:${
                  result.periodoLocacao?.split(':')[1]
                }`,
                maxLocacao: result.maxLocacaoDia,
                capacidadeMin: result.capacidadeMin,
                capacidadeMax: result.capacidadeMax,
                funcionamento: diasFuncionamento,
              });

              this.esportesOfEE = result.listaEsportes!;
              this.imgPreviewUrl = `data:image/jpeg;base64,${result.imagemBase64}`;
            },
            error: (err) => {
              console.error(err);
              this.ngxLoaderService.stopLoader('loader-01');
              this.toastrService.error(
                'Por favor, tente novamente mais tarde',
                'Erro ao trazer dados do espaço esportivo'
              );
              this.navigate();
            },
          });
      } else {
        this.isEdicao = false;
      }
    });

    this.formEspacoEsportivo
      .get('funcionamento')
      ?.valueChanges.pipe(takeUntil(this.funcionamento$))
      .subscribe((v) => this.setDiasFuncionamento(v));

    this.formEspacoEsportivo
      .get('abertura')
      ?.valueChanges.pipe(takeUntil(this.abertura$))
      .subscribe((v) => {
        this.horaAbertura = v;
        this.validHours();
      });

    this.formEspacoEsportivo
      .get('fechamento')
      ?.valueChanges.pipe(takeUntil(this.fechamento$))
      .subscribe((v) => {
        if (v) {
          this.horaFechamento = v;
          this.validHours();
        }
      });

    this.formEspacoEsportivo
      .get('periodo')
      ?.valueChanges.pipe(takeUntil(this.periodo$))
      .subscribe((v) => {
        if (v) {
          this.horaAbertura = v;
          this.validPeriodo();
        }
      });

    if (this.isEdicao) {
      this.formEspacoEsportivo
        .get('ativo')
        ?.valueChanges.pipe(takeUntil(this.ativo$))
        .subscribe((v) => this.showAviso(v));
    }
  }

  ngOnDestroy(): void {
    this.funcionamento$.next(null);
    this.abertura$.next(null);
    this.fechamento$.next(null);
    this.periodo$.next(null);
    this.funcionamento$.complete();
    this.abertura$.complete();
    this.fechamento$.complete();
    this.periodo$.complete();
  }

  populate(): void {
    this.esportes = [];
    this.eeService
      .listarEsportes()
      .pipe(take(1))
      .subscribe({
        next: (result: EsporteResponse[]) => {
          result.forEach((e) => {
            this.esportes.push(new Item(e.id, e.nome));
          });
        },
        error: (err) => {
          console.error(err);
          this.esportes = [];
        },
      });
  }

  sanatizerImg(imgUrl: string) {
    return this.sanatizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  carregarImg() {
    this.imgCompressService.uploadFile().then(({ image, orientation }) => {
      if (this.imgValid(image.split(',')[0]?.split(';')[0]?.split('/')[1])) {
        this.imgCompressService
          .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
          .then((compressedImage) => {
            this.imgPreviewUrl = compressedImage;
          });
      } else {
        this.toastrService.warning(
          "O tipo aceito é: 'jpeg'",
          'Tipo da imagem incorreto'
        );
      }
    });
  }

  imgValid(imgType: string): boolean {
    const allowedExtensions = ['jpeg'];

    return allowedExtensions.includes(imgType);
  }

  removeImg(): void {
    this.imgPreviewUrl = '';
  }

  navigate(): void {
    this.router.navigateByUrl('/espacos-esportivos');
  }

  opneModal(modal: any): void {
    this.modalService.open(modal, {
      centered: true,
      size: 'lg',
    });
  }

  closeModal() {
    this.modalService.dismissAll();
    this.formEsporte.patchValue({ nome: null });
  }

  cadastrarEsporte(): void {
    const formEsporte = this.formEsporte;

    if (formEsporte.valid) {
      this.ngxLoaderService.startLoader('loader-01');

      const esporte: string = formEsporte.get('nome')?.value;
      const novoEsporte: EsporteRequest = new EsporteRequest(
        esporte.toUpperCase()
      );

      this.eeService
        .criarEsporte(novoEsporte)
        .pipe(take(1))
        .subscribe({
          next: (result: EsporteResponse) => {
            this.ngxLoaderService.stopLoader('loader-01');
            this.adicionarEsporteArray(
              result.id!,
              new Item(result.id, result.nome)
            );
            this.populate();
            this.formEsporte.reset();
            this.closeModal();
          },
          error: (err) => {
            this.ngxLoaderService.stopLoader('loader-01');
            this.toastrService.error(
              err.error.message ?? 'Por favor, tente novamente mais tarde',
              'Erro ao cadastrar esporte'
            );
            console.error(err);
          },
        });
    } else {
      this.toastrService.warning(
        'Por favor, informe o nome do esporte',
        'Cuidado com o nome'
      );
    }
  }

  adicionaEsporte(): void {
    const esporte = this.formEspacoEsportivo.get('esportes');
    const idEsporte = Number(esporte?.value);
    this.esportes.forEach((e) => {
      if (e.value == idEsporte) {
        this.adicionarEsporteArray(idEsporte, e);
      }
    });

    esporte?.patchValue(null);
  }

  adicionarEsporteArray(idEsporte: number, item: Item) {
    const jaExiste = this.esportesOfEE?.some((eq) => eq.id === idEsporte);

    if (!jaExiste) {
      this.esportesOfEE.push(
        new EsporteResponse(Number(item.value), item.label)
      );
    }
  }

  removerTipoEsporte(id: number): void {
    this.esportesOfEE = this.esportesOfEE.filter((e) => {
      return e.id != id;
    });
  }

  deletarEsporte(id: number | string): void {
    this.ngxLoaderService.startLoader('loader-01');
    this.eeService
      .excluirEsporte(Number(id))
      .pipe(take(1))
      .subscribe({
        next: (result: EsporteExclusaoResponse) => {
          this.removerTipoEsporte(Number(id));
          this.populate();
          this.ngxLoaderService.stopLoader('loader-01');
        },
        error: (err) => {
          this.ngxLoaderService.stopLoader('loader-01');
          this.toastrService.error(
            err.error.message ?? 'Por favor, tente novamente mais tarde',
            'Falha ao remover esporte'
          );
        },
      });
  }

  salvarEspacoEsportivo(): void {
    const form = this.formEspacoEsportivo;
    if (
      form.valid &&
      this.imgPreviewUrl !== '' &&
      this.esportesOfEE.length > 0
    ) {
      this.ngxLoaderService.startLoader('loader-01');

      const novoEE: EspacoEsportivoRequest = new EspacoEsportivoRequest(
        form.get('nome')?.value,
        form.get('descricao')?.value,
        form.get('localidade')?.value,
        form.get('piso')?.value,
        form.get('dimensoes')?.value,
        form.get('ativo')?.value,
        this.esportesOfEE,
        this.imgPreviewUrl,
        form.get('abertura')?.value,
        form.get('fechamento')?.value,
        form.get('periodo')?.value,
        Number(form.get('maxLocacao')?.value),
        Number(form.get('capacidadeMax')?.value),
        Number(form.get('capacidadeMin')?.value),
        this.diasFuncionamento
      );

      if (this.isEdicao) {
        this.eeService
          .editarEE(novoEE, this.idEEEdicao!)
          .pipe(take(1))
          .subscribe({
            next: (result: eeResponse) => {
              this.ngxLoaderService.stopLoader('loader-01');
              this.navigate();
            },
            error: (err) => {
              this.ngxLoaderService.stopLoader('loader-01');
              console.error(err);
              this.toastrService.error(
                'Por favor, tente novamente mais tarde',
                'Erro ao cadastrar espaço esportivo'
              );
            },
          });
      } else {
        this.eeService
          .cadastrarEE(novoEE)
          .pipe(take(1))
          .subscribe({
            next: (result: eeResponse) => {
              this.ngxLoaderService.stopLoader('loader-01');
              this.navigate();
            },
            error: (err) => {
              this.ngxLoaderService.stopLoader('loader-01');
              console.error(err);
              this.toastrService.error(
                'Por favor, tente novamente mais tarde',
                'Erro ao cadastrar espaço esportivo'
              );
            },
          });
      }
    } else {
      this.toastrService.warning(
        'Por favor, preencha todos os campos do formulário',
        'Verificar os dados'
      );
    }
  }

  validHours() {
    const form = this.formEspacoEsportivo;
    let abertura = moment();
    let fechamento = moment();
    const horaAbertura = form.get('abertura')?.value;
    const horaFechamento = form.get('fechamento')?.value;

    if (horaAbertura) {
      abertura
        .hour(Number(horaAbertura?.split(':')[0]))
        .minute(Number(horaAbertura?.split(':')[1]));
    }

    if (horaFechamento) {
      fechamento
        .hour(Number(horaFechamento?.split(':')[0]))
        .minute(Number(horaFechamento?.split(':')[1]));
    }

    const showInfo = () => {
      this.toastrService.warning(
        'Por favor, informe um intervalo de horário válido',
        'Horário de funcionamento inválido'
      );

      form.get('fechamento')?.patchValue(null);
    };

    if (horaAbertura && horaFechamento) {
      if (abertura.hour() === fechamento.hour()) {
        if (abertura.minute() > fechamento.minute()) {
          showInfo();
        }
      } else {
        if (abertura.hour() > fechamento.hour()) {
          showInfo();
        }
      }
    }
  }

  validPeriodo() {
    const form = this.formEspacoEsportivo;
    let abertura = moment();
    let fechamento = moment();
    const horaAbertura = form.get('abertura')?.value;
    const horaFechamento = form.get('fechamento')?.value;
    const periodo = form.get('periodo');

    if (horaAbertura) {
      abertura
        .hour(Number(horaAbertura?.split(':')[0]))
        .minute(Number(horaAbertura?.split(':')[1]));
    }

    if (horaFechamento) {
      fechamento
        .hour(Number(horaFechamento?.split(':')[0]))
        .minute(Number(horaFechamento?.split(':')[1]));
    }

    if (horaAbertura && horaFechamento) {
      if (
        fechamento.diff(abertura, 'hours') <
        Number(periodo?.value?.split(':')[0])
      ) {
        this.toastrService.warning(
          'Por favor, informe uma duração de locação menor que o horário de funcionamento',
          'Duração da locação inválida'
        );

        periodo?.patchValue(null);
      }
    } else {
      periodo?.patchValue(null);
      periodo?.reset();
      this.toastrService.info(
        'Por favor, primeiro informe o horário de funcionamento',
        'Sem horário de funcionamento'
      );
    }
  }

  setDiasFuncionamento(array: boolean[]) {
    this.diasFuncionamento = [];
    array.forEach((a, i) => {
      if (a) {
        this.diasFuncionamento.push(i);
      }
    });
  }

  showAviso(show: boolean) {
    if (!show) {
      this.modalService.open(ModalAvisoComponent, {
        centered: true,
      });
    }
  }
}
