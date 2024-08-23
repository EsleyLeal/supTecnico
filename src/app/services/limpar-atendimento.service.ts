import { Injectable } from '@angular/core';
import { RelatorioService } from './relatorio.service';

@Injectable({
  providedIn: 'root'
})
export class LimparAtendimentoService {

  constructor(
    private relatorioService: RelatorioService

  ) { }



  limparAtendimento(component: any) {
    if (confirm('Você realmente deseja limpar o atendimento?')) {
      component.atendimentoGerado = '';
      component.nomeDoCliente = '';
      component.nomeDoTecnico = '';
      component.patrimonioOnt = '';
      component.macOnt = '';
      component.fhttDaOnt = '';
      component.senhaWifiOnt = '';

      component.patrimonioOnu = '';
      component.macDaOnu = '';
      component.fhttDaOnu = '';
      component.patrimonioRoteador = '';
      component.macRot = '';
      component.snRot = '';
      component.senhaWifiOnu = '';

      component.fttbSelecionado = '';
      component.senhaWifiFttb = '';

      component.relatorioGerado = '';
      component.localInstalacao = '';
      component.sinalFibra = '';
      component.vaga = '';


      // Limpando os materiais e observações via serviço
      this.relatorioService.materiais = [{ tipo: '', quantidade: '' }];
      component.materiais = this.relatorioService.getMateriais(); 
      this.relatorioService.observacao = '';
      component.observacao = this.relatorioService.getObservacao();



      component.valorCtoCeip = '';
      component.valorPortaCtoCeip = undefined;
      component.textObservacao = '';
    } else {
      console.log('Ação de limpar atendimento cancelada.');
    }
  }
}
