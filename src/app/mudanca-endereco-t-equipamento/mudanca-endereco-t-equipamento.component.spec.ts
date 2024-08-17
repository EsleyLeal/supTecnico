import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MudancaEnderecoTEquipamentoComponent } from './mudanca-endereco-t-equipamento.component';

describe('MudancaEnderecoTEquipamentoComponent', () => {
  let component: MudancaEnderecoTEquipamentoComponent;
  let fixture: ComponentFixture<MudancaEnderecoTEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MudancaEnderecoTEquipamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MudancaEnderecoTEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
