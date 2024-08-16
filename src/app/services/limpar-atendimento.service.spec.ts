import { TestBed } from '@angular/core/testing';

import { LimparAtendimentoService } from './limpar-atendimento.service';

describe('LimparAtendimentoService', () => {
  let service: LimparAtendimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LimparAtendimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
