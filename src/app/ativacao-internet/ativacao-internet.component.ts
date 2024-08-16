import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectEquipamentoService } from '../services/select-equipamento.service';
import { Equipamento } from '../enum/equipamento';
import { LimparAtendimentoService } from '../services/limpar-atendimento.service';

declare var bootstrap: any;


@Component({
  selector: 'app-ativacao-internet',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ativacao-internet.component.html',
  styleUrl: './ativacao-internet.component.css',
  providers: [DatePipe]
})



export class AtivacaoInternetComponent implements OnInit {

  dataAtual: Date = new Date();
  dataFormatada: string = '';

  constructor(
    private datePipe: DatePipe,
    private selectEquipamento: SelectEquipamentoService,
    private limparAtendimentoService: LimparAtendimentoService
  ) { }


  limparAtendimento() {
    this.limparAtendimentoService.limparAtendimento(this);
  }

  ngOnInit(): void {
    this.dataAtual = new Date;
    this.dataFormatada = this.datePipe.transform(this.dataAtual, 'dd/MM/yyyy HH:mm:ss') || '';
  }


  nomeDoCliente: string = '';
  nomeDoTecnico: string = '';

  // Propriedades relacionadas aos equipamentos
  aparelhoSelecionadoOnu: string = '';
  aparelhoSelecionadoOntP: string = '';
  patrimonioRoteador: string = '';
  senhaSelecionada: string = '';
  wifiIntegrado: string = 'WIFI INTEGRADO';
  ont: string = '';
  ontPatrimonio: string = '';
  senhaWifi: string = '';
  roteador: string = 'ONU + ROTEADOR';
  onu: string = '';
  onuRoteador: string = '';
  fttb: string = 'FTTB';
  fttbSelecionado: string = '';

  // Propriedades relacionadas ao CTO/CEIP
  cto: string = 'CTO:';
  tipoCtoCeipSelecionado: string = '';
  valorPortaCtoCeip: number | undefined;
  ceip: string = 'CEIP:';
  switch: string = 'SWITCH:';
  valorCtoCeip: string = '';
  semIdentificacao: boolean = false;

  textObservacao: string = '';


  mostrarInputCtoCeip: boolean = true;
  mostrarInputGP_WI: boolean = false;
  esconderInput: boolean = false;
  mostrarInputSenha: boolean = false;
  mostrarInputPR: boolean = false;
  mostrarInputFTTB: boolean = false;

  mostrarInputGP_OR: boolean = false;

  atendimentoGerado: string = '';


  tipoEquipamentoSelecionado: Equipamento | null = null;

  selecaoEquipamento(event: Event) {
    const valorSelecionado = (event.target as HTMLSelectElement).value;

    let config: any;

    switch (valorSelecionado) {
      case Equipamento.WIFI_INTEGRADO:
        this.tipoEquipamentoSelecionado = Equipamento.WIFI_INTEGRADO;
        config = this.selectEquipamento.configurarEquipamentoWiFiIntegrado();
        break;
      case Equipamento.ONU_ROTEADOR:
        this.tipoEquipamentoSelecionado = Equipamento.ONU_ROTEADOR;
        config = this.selectEquipamento.configurarEquipamentoOnuRoteador();
        break;
      case Equipamento.FTTB:
        this.tipoEquipamentoSelecionado = Equipamento.FTTB;
        config = this.selectEquipamento.configurarEquipamentoFttb();
        break;
      default:
        this.tipoEquipamentoSelecionado = null;
        console.log('Equipamento não reconhecido:', valorSelecionado);
        return;
    }

    // Atribuir os valores retornados para as propriedades do componente
    this.mostrarInputGP_WI = config.mostrarInputGP_WI || false;
    this.mostrarInputSenha = config.mostrarInputSenha || false;
    this.aparelhoSelecionadoOnu = config.aparelhoSelecionadoOnu || '';
    this.aparelhoSelecionadoOntP = config.aparelhoSelecionadoOntP || '';
    this.senhaSelecionada = config.senhaSelecionada || '';
    this.mostrarInputPR = config.mostrarInputPR || false;
    this.mostrarInputFTTB = config.mostrarInputFTTB || false;
  }

  selecaoCtoCeip(event: Event) {
    const valorSelecionado = (event.target as HTMLSelectElement).value;
    let config: any;

    switch (valorSelecionado) {
      case 'cto':
        config = this.selectEquipamento.configurarCto();
        this.semIdentificacao = false; // Certifique-se de que está configurado corretamente
        break;
      case 'ctoSemIdentificacao':
        config = this.selectEquipamento.configurarCtoSemIdentificacao();
        this.semIdentificacao = true; // Aqui sem identificação deve ser verdadeiro
        break;
      case 'ceip':
        config = this.selectEquipamento.configurarCeip();
        this.semIdentificacao = false;
        break;
      case 'switch':
        config = this.selectEquipamento.configurarSwitch();
        this.semIdentificacao = false;
        break;
      default:
        this.semIdentificacao = false;
    }

    this.tipoCtoCeipSelecionado = config.tipoCtoCeipSelecionado || '';
    this.esconderInput = config.esconderInput || false;
    this.mostrarInputCtoCeip = config.mostrarInputCtoCeip || false;
  }

  gerarAtendimento() {
    // Verificação básica de que os campos essenciais estão preenchidos
    if (this.tipoEquipamentoSelecionado === Equipamento.WIFI_INTEGRADO &&
        this.nomeDoCliente && this.nomeDoTecnico && this.aparelhoSelecionadoOnu &&
        this.aparelhoSelecionadoOntP && this.senhaSelecionada) {

      console.log('Entrou na condição ONT');
      this.atendimentoGerado = `
        ${this.dataFormatada}

        ATIVAÇÃO REALIZADA COM SUCESSO!

        NOME DO CLIENTE: ${this.nomeDoCliente}
        NOME DO TECNICO: ${this.nomeDoTecnico}
        ${this.wifiIntegrado}
        FHTT/SN DA ONU: ${this.aparelhoSelecionadoOnu}
        PATRIMONIO DA ONU: ${this.aparelhoSelecionadoOntP}
        ${this.obterIdentificacaoCtoCeip()}
        SENHA DO WIFI: ${this.senhaSelecionada}

        ${this.textObservacao ? `\nOBSERVAÇÃO:\n${this.textObservacao}` : ''}
      `;
    } else if (this.tipoEquipamentoSelecionado === Equipamento.ONU_ROTEADOR &&
               this.nomeDoCliente && this.nomeDoTecnico && this.aparelhoSelecionadoOnu &&
               this.patrimonioRoteador) {

      console.log('Entrou na condição ONU');
      this.atendimentoGerado = `
        ${this.dataFormatada}

        ATIVAÇÃO REALIZADA COM SUCESSO!

        NOME DO CLIENTE: ${this.nomeDoCliente}
        NOME DO TECNICO: ${this.nomeDoTecnico}
        ${this.roteador}
        FHTT DA ONU: ${this.aparelhoSelecionadoOnu}
        ${this.obterIdentificacaoCtoCeip()}
        PATRIMONIO DO ROTEADOR: ${this.patrimonioRoteador}

        ${this.textObservacao ? `\nOBSERVAÇÃO:\n${this.textObservacao}` : ''}
      `;
    } else if (this.tipoEquipamentoSelecionado === Equipamento.FTTB &&
               this.nomeDoCliente && this.nomeDoTecnico && this.fttbSelecionado) {

      console.log('Entrou na condição FTTB');
      this.atendimentoGerado = `
        ${this.dataFormatada}

        ATIVAÇÃO REALIZADA COM SUCESSO!

        NOME DO CLIENTE: ${this.nomeDoCliente}
        NOME DO TECNICO: ${this.nomeDoTecnico}
        ${this.fttb}
        ${this.obterIdentificacaoCtoCeip()}
        PATRIMONIO DO ROTEADOR: ${this.fttbSelecionado}

        ${this.textObservacao ? `\nOBSERVAÇÃO:\n${this.textObservacao}` : ''}
      `;
    } else {
      console.error('Erro: Equipamento não reconhecido ou informação insuficiente.');
      alert('Erro: Equipamento não reconhecido ou informação insuficiente.');
      return; // Sai da função para evitar que o modal seja exibido
    }

    console.log('Atendimento Gerado:', this.atendimentoGerado);

    // Exibe o modal apenas se o atendimento foi gerado corretamente
    if (this.atendimentoGerado.trim() !== '') {
      const elementoModal = document.getElementById('resultadoModal');
      const instanciaModal = new bootstrap.Modal(elementoModal!);
      instanciaModal.show();
    }
  }


copiarTexto() {
  const textoAtendimento = document.getElementById('atendimentoText')!;
  const selecao = window.getSelection();
  const intervalo = document.createRange();
  intervalo.selectNodeContents(textoAtendimento);
  selecao!.removeAllRanges();
  selecao!.addRange(intervalo);

  document.execCommand('copy');
  alert('TEXTO COPIADO, ENVIE PARA O SUPORTE N1');
}




  private obterIdentificacaoCtoCeip(): string {
    return this.semIdentificacao
      ? `SEM IDENTIFICAÇÃO - PORTA: ${this.valorPortaCtoCeip}`
      : `${this.tipoCtoCeipSelecionado} - ${this.valorCtoCeip} - PORTA: ${this.valorPortaCtoCeip}`;
  }

}
