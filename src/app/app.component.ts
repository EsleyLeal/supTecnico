import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AtivacaoInternetComponent } from './ativacao-internet/ativacao-internet.component';
import { MudancaEnderecoComponent } from './mudanca-endereco/mudanca-endereco.component';
import { MudancaEnderecoTEquipamentoComponent } from './mudanca-endereco-t-equipamento/mudanca-endereco-t-equipamento.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    AtivacaoInternetComponent,
    MudancaEnderecoComponent,
    MudancaEnderecoTEquipamentoComponent,
  ],
  providers: [DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title = 'supTecnico';

  selectedOption: string = 'ativacao-internet';

  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption = selectElement.value;
  }
}
