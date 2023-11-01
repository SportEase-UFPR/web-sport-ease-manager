import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import {
  faCheck,
  faPlus,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
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
import * as moment from 'moment';

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
    capacidade: new FormControl(null, [Validators.required]),
  });

  formEsporte: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
  });

  faAdd = faPlus;
  faClose = faXmark;
  faConfirm = faCheck;
  faTrash = faTrash;

  imgPreviewUrl: string = '';

  isEdicao: boolean = false;
  idEEEdicao?: number;

  esportes: Item[] = [];
  esportesOfEE: EsporteResponse[] = [];
  inscricaoRota!: Subscription;
  inscricaoEsportes!: Subscription;
  inscricaoCriacaoEsporte!: Subscription;
  inscricaoExclusaoEsporte!: Subscription;
  inscricaoCriacaoEE!: Subscription;

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

    this.inscricaoRota = this.activatedRoute.params.subscribe((params) => {
      const id = Number(params?.['id']);
      if (id) {
        this.ngxLoaderService.startLoader('loader-01');
        this.isEdicao = true;
        this.eeService.pegarEE(id).subscribe({
          next: (result: eeResponse) => {
            this.ngxLoaderService.stopLoader('loader-01');

            this.idEEEdicao = result.id;

            this.formEspacoEsportivo.patchValue({
              ativo: result.disponivel,
              nome: result.nome,
              descricao: result.descricao,
              localidade: result.localidade,
              dimensoes: result.dimensoes,
              piso: result.piso,
              capacidade: result.capacidade,
              abertura: result.horaAbertura,
              fechamento: result.horaFechamento,
              periodo: result.periodoLocacao,
              maxLocacao: result.maxLocacaoDia,
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
  }

  ngOnDestroy(): void {
    this.inscricaoRota?.unsubscribe();
    this.inscricaoEsportes?.unsubscribe();
    this.inscricaoCriacaoEsporte?.unsubscribe();
    this.inscricaoExclusaoEsporte?.unsubscribe();
    this.inscricaoCriacaoEE?.unsubscribe();
  }

  populate(): void {
    this.esportes = [];
    this.inscricaoEsportes = this.eeService.listarEsportes().subscribe({
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
      this.imgCompressService
        .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
        .then((compressedImage) => {
          this.imgPreviewUrl = compressedImage;
        });
    });
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

  adiconarEsporte(): void {
    const formEsporte = this.formEsporte;

    if (formEsporte.valid) {
      this.ngxLoaderService.startLoader('loader-01');

      const esporte: string = formEsporte.get('nome')?.value;
      const novoEsporte: EsporteRequest = new EsporteRequest(
        esporte.toUpperCase()
      );

      this.inscricaoCriacaoEsporte = this.eeService
        .criarEsporte(novoEsporte)
        .subscribe({
          next: (result: EsporteResponse) => {
            this.ngxLoaderService.stopLoader('loader-01');
            this.populate();
            this.closeModal();
          },
          error: (err) => {
            this.ngxLoaderService.stopLoader('loader-01');
            this.toastrService.error(
              'Por favor, tente novamente mais tarde',
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

  adiconaEsporte(): void {
    const esporte = this.formEspacoEsportivo.get('esportes');
    const idEsporte = Number(esporte?.value);
    this.esportes.forEach((e) => {
      if (e.value == idEsporte) {
        let jaExiste = false;
        this.esportesOfEE?.forEach((eq) => {
          if (eq.id == idEsporte) {
            jaExiste = true;
          }
        });

        if (!jaExiste) {
          this.esportesOfEE.push(new EsporteResponse(e.value, e.label));
        }
      }
    });

    esporte?.patchValue(null);
  }

  removerTipoEsporte(id: number): void {
    this.esportesOfEE = this.esportesOfEE.filter((e) => {
      return e.id != id;
    });
  }

  deletarEsporte(id: number): void {
    this.ngxLoaderService.startLoader('loader-01');
    this.inscricaoExclusaoEsporte = this.eeService
      .excluirEsporte(id)
      .subscribe({
        next: (result: EsporteExclusaoResponse) => {
          this.removerTipoEsporte(id);
          this.populate();
          this.ngxLoaderService.stopLoader('loader-01');
        },
        error: (err) => {
          this.ngxLoaderService.stopLoader('loader-01');
          this.toastrService.error(
            'Por favor, tente novamnete mais tarde',
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
        Number(form.get('capacidade')?.value),
        form.get('ativo')?.value,
        this.esportesOfEE,
        this.imgPreviewUrl,
        form.get('abertura')?.value,
        form.get('fechamento')?.value,
        form.get('periodo')?.value,
        Number(form.get('maxLocacao')?.value)
      );

      if (this.isEdicao) {
        this.inscricaoCriacaoEE = this.eeService
          .editarEE(novoEE, this.idEEEdicao!)
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
        this.inscricaoCriacaoEE = this.eeService.cadastrarEE(novoEE).subscribe({
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
}
