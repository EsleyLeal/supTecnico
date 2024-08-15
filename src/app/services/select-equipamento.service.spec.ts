import { TestBed } from '@angular/core/testing';

import { SelectEquipamentoService } from './select-equipamento.service';

describe('SelectEquipamentoService', () => {
  let service: SelectEquipamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectEquipamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
