import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LimparAtendimentoService {

  constructor() { }

  limparAtendimento(component: any) {
    if (confirm('Você realmente deseja limpar o atendimento?')) {
      component.atendimentoGerado = '';
      component.nomeDoCliente = '';
      component.nomeDoTecnico = '';
      component.aparelhoSelecionadoOnu = '';
      component.aparelhoSelecionadoOntP = '';
      component.senhaSelecionada = '';
      component.patrimonioRoteador = '';
      component.fttbSelecionado = '';
      component.valorCtoCeip = '';
      component.valorPortaCtoCeip = undefined;
      component.textObservacao = '';
    } else {
      console.log('Ação de limpar atendimento cancelada.');
    }
  }
}
