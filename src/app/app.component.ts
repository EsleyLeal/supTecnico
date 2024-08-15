import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AtivacaoInternetComponent } from './ativacao-internet/ativacao-internet.component';
import { MudancaEnderecoComponent } from './mudanca-endereco/mudanca-endereco.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AtivacaoInternetComponent, MudancaEnderecoComponent, FormsModule, CommonModule],
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
