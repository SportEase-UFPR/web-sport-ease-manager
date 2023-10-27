import { TestBed } from '@angular/core/testing';

import { ComunicacaoClientesService } from './comunicacao-clientes.service';

describe('ComunicacaoClientesService', () => {
  let service: ComunicacaoClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicacaoClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
