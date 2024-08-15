import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivacaoInternetComponent } from './ativacao-internet.component';

describe('AtivacaoInternetComponent', () => {
  let component: AtivacaoInternetComponent;
  let fixture: ComponentFixture<AtivacaoInternetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtivacaoInternetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtivacaoInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
