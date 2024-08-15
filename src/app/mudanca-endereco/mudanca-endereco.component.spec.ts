import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MudancaEnderecoComponent } from './mudanca-endereco.component';

describe('MudancaEnderecoComponent', () => {
  let component: MudancaEnderecoComponent;
  let fixture: ComponentFixture<MudancaEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MudancaEnderecoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MudancaEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
