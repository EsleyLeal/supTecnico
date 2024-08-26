import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectEquipamentoService } from '../services/select-equipamento.service';
import { LimparAtendimentoService } from '../services/limpar-atendimento.service';
import { Equipamento } from '../enum/equipamento';
import { RelatorioService } from '../services/relatorio.service';  // Ajuste o caminho conforme necessário
import { Material } from '../models/material.model';  // Ajuste o caminho conforme necessário
import { Observable, of } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-mudanca-endereco',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './mudanca-endereco.component.html',
  styleUrls: ['./mudanca-endereco.component.css'],
  providers: [DatePipe]
})
export class MudancaEnderecoComponent implements OnInit {


  constructor(
    private datePipe: DatePipe,
    private selectEquipamento: SelectEquipamentoService,
    private limparAtendimentoService: LimparAtendimentoService,
    private relatorioService: RelatorioService
  ) { }

  // Service Limpar Atendimento
  limparAtendimento() {
    this.limparAtendimentoService.limparAtendimento(this);
  }

  ngOnInit(): void {
    this.dataAtual = new Date;
    this.dataFormatada = this.datePipe.transform(this.dataAtual, 'dd/MM/yyyy HH:mm:ss') || '';

    this.materiais = this.relatorioService.getMateriais();
    this.observacao = this.relatorioService.getObservacao();
    this.filteredOptions = this.relatorioService.filteredOptions;
  }

  removerMaterial(): void {
    if (this.materiais.length > 1) {
      this.materiais.pop();
    }
  }

  adicionarMaterial() {
    this.relatorioService.adicionarMaterial();
  }

  filter(value: string): string[] {
    return this.relatorioService.filter(value);
  }

  dataAtual: Date = new Date();
  dataFormatada: string = '';

  materiais: Material[] = [];
  observacao: string = '';
  filteredOptions: Observable<string[]> = of([]);

  nomeDoCliente: string = '';
  nomeDoTecnico: string = '';

  // Propriedades relacionadas aos equipamentos

  wifiIntegrado: string = 'WIFI INTEGRADO';
  patrimonioOnt: string = '';
  macOnt:string = '';
  fhttDaOnt: string = '';

  roteador: string = 'ONU + ROTEADOR';
  patrimonioOnu:string = '';
  macDaOnu: string = '';
  fhttDaOnu:string = '';
  patrimonioRoteador: string = '';
  macRot: string = '';
  snRot: string = '';


  fttb: string = 'FTTB';
  fttbSelecionado: string = '';

  senhaWifiOnt: string = '';
  senhaWifiOnu: string = '';
  senhaWifiFttb: string = '';

  // Propriedades relacionadas ao CTO/CEIP
  cto: string = 'CTO:';
  tipoCtoCeipSelecionado: string = '';
  valorPortaCtoCeip: number | undefined;
  ceip: string = 'CEIP:';
  switch: string = 'SWITCH:';
  valorCtoCeip: string = '';
  semIdentificacao: boolean = false;

  textObservacao: string = '';

  // inputs wifi-integrado
  mostrarInputOntPatrimonio: boolean = false;
  mostrarInputMacOnt: boolean = false;
  mostrarInputOntSn: boolean = false;
  mostrarInputSenhaWifiOnt: boolean = false; // Esse input é global

   // inputs onu + roteador
   mostrarInputOnuPatrimonio: boolean = false;
   mostrarInputMacOnu: boolean = false;
   mostrarInputFhttOnu: boolean = false;

   mostrarInputPR: boolean = false;
   mostrarInputMacRot: boolean = false;
   mostrarInputSnRot:boolean = false;
   mostrarInputSenhaWifiOnu: boolean = false;

  // input unico FTTB
   mostrarInputFTTB: boolean = false;
   mostrarInputSenhaFttb: boolean = false;

  //Controle de inputs
  mostrarInputCtoCeip: boolean = true;
  esconderInput: boolean = false;
  mostrarInput: boolean = false;


  atendimentoGerado: string = '';

  // Area de gerarRelatorio
  relatorioGerado: string = '';

  localInstalacao: string = '';
  sinalFibra: string = '';
  vaga: string = '';
  codigo: string = this.nomeDoCliente;
  nomeRede2G: string = '';
  nomeRede5G: string = '';

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
        return;
    }

    //  mostrar inputs wifi-integrado
    this.patrimonioOnt = config.patrimonioOnt || '' ;
    this.mostrarInputOntPatrimonio = config.mostrarInputOntPatrimonio || false;
    this.mostrarInputMacOnt = config.mostrarInputMacOnt || false;
    this.mostrarInputOntSn = config.mostrarInputOntSn || false;
    this.senhaWifiOnt = config.senhaWifiOnt || '';

    //  mostrar inputs onu + roteador
    this.mostrarInputOnuPatrimonio = config.mostrarInputOnuPatrimonio || false;
    this.mostrarInputMacOnu = config.mostrarInputMacOnu || false;
    this.mostrarInputFhttOnu = config.mostrarInputFhttOnu || false;
    this.mostrarInputPR = config.mostrarInputPR || false;
    this.mostrarInputMacRot = config.mostrarInputMacRot || false;
    this.mostrarInputSnRot = config.mostrarInputSnRot || false;
    this.mostrarInputFTTB = config.mostrarInputFTTB || false;

    this.patrimonioOnu = config.patrimonioOnu || '';
    this.macDaOnu = config.macDaOnu || '';
    this.fhttDaOnt = config.fhttDaOnt || '';

    // area senha wifi
    this.mostrarInputSenhaWifiOnt = config.mostrarInputSenhaWifiOnt || false;
    this.mostrarInputSenhaWifiOnu = config.mostrarInputSenhaWifiOnu || false;
    this.mostrarInputSenhaFttb = config.mostrarInputSenhaFttb || false;
  }

  selecaoCtoCeip(event: Event) {
    const valorSelecionado = (event.target as HTMLSelectElement).value;
    let config: any;

    switch (valorSelecionado) {
      case 'cto':
        config = this.selectEquipamento.configurarCto();
        this.semIdentificacao = false;
        break;
      case 'ctoSemIdentificacao':
        config = this.selectEquipamento.configurarCtoSemIdentificacao();
        this.semIdentificacao = true;
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
    if (this.nomeDoCliente && this.nomeDoTecnico) {

      this.atendimentoGerado = `
${this.dataFormatada}

MUDANÇA DE ENDEREÇO REALIZADA COM SUCESSO!

NOME DO CLIENTE: ${this.nomeDoCliente}
NOME DO TECNICO: ${this.nomeDoTecnico}
NOVA: ${this.obterIdentificacaoCtoCeip()}

${this.textObservacao ? `\nOBSERVAÇÃO:\n${this.textObservacao}` : ''}
      `;
    } else if (this.nomeDoCliente && this.nomeDoTecnico) {

      this.atendimentoGerado = `
${this.dataFormatada}

MUDANÇA DE ENDEREÇO REALIZADA COM SUCESSO!

NOME DO CLIENTE: ${this.nomeDoCliente}
NOME DO TECNICO: ${this.nomeDoTecnico}
NOVA: ${this.obterIdentificacaoCtoCeip()}


${this.textObservacao ? `\nOBSERVAÇÃO:\n${this.textObservacao}` : ''}
      `;
    } else if (this.nomeDoCliente && this.nomeDoTecnico) {

      this.atendimentoGerado = `
${this.dataFormatada}

MUDANÇA DE ENDEREÇO REALIZADA COM SUCESSO!

NOME DO CLIENTE: ${this.nomeDoCliente}
NOME DO TECNICO: ${this.nomeDoTecnico}
NOVA: ${this.obterIdentificacaoCtoCeip()}

${this.textObservacao ? `\nOBSERVAÇÃO:\n${this.textObservacao}` : ''}
      `;
    } else {
      alert('Erro: Equipamento não reconhecido ou informação insuficiente.');
      return;
    }
    console.log('Atendimento Gerado:', this.atendimentoGerado);

    if (this.atendimentoGerado.trim() !== '') {
      const elementoModal = document.getElementById('resultadoModal');
      const instanciaModal = new bootstrap.Modal(elementoModal!);
      instanciaModal.show();
    }
  }

  // Funcao relatorio
  atualizarLocalInstalacao(resposta: string): void {
    if (resposta === 'SIM') {
      this.localInstalacao = 'CABO E EQUIPAMENTOS FIXADOS NA PAREDE DA LOJA, CONFORME O CLIENTE PEDIU.';
    } else {
      this.localInstalacao = ''; // Limpa o campo para que o usuário possa escrever
    }
  }


  gerarRelatorio() {
    this.codigo = this.nomeDoCliente.match(/\d+/g)?.join('') || '';
    this.nomeRede2G = `TELY_${this.codigo}_2G`;
    this.nomeRede5G = `TELY_${this.codigo}_5G`;

    this.relatorioService.observacao = this.observacao;

      if(
        this.localInstalacao &&
        this.sinalFibra &&
        this.vaga
      ) {
        this.relatorioGerado =
        `
  ATIVAÇÃO EFETUADA COM SUCESSO.


  CLIENTE: ${this.nomeDoCliente}
  __________________________________

  ${this.localInstalacao}

  __________________________________

  ${this.obterIdentificacaoCtoCeip()}

  SINAL: ${this.sinalFibra}

  VAGA: ${this.vaga}
  `;

// Criar uma variável para armazenar os materiais usados
let materiaisUsados = '';

this.materiais.forEach(material => {
  if (material.tipo.trim() !== '') {
materiaisUsados += `
${material.tipo.toUpperCase()}: ${material.quantidade}
  `;
  }
});

// Se houver materiais usados, adicione-os ao relatório
if (materiaisUsados.trim() !== '') {
  this.relatorioGerado += `
__________________________________

MATERIAL USADO:
${materiaisUsados}
  `;
}



    this.relatorioGerado += `
__________________________________

  OBS: ${this.relatorioService.getObservacao()}

  TÉCNICO: ${this.nomeDoTecnico}
    `;

  } else {
    alert('PREENCHA O RELATORIO');
    return;
  }


  if (this.relatorioGerado.trim() !== '') {
    const elementoModal = document.getElementById('relatorioModal');
    const instanciaModal = new bootstrap.Modal(elementoModal!);
    instanciaModal.show();
  }
}


  copiarTexto(elementId: string) {
    const textoElemento = document.getElementById(elementId)!;
    const selecao = window.getSelection();
    const intervalo = document.createRange();
    intervalo.selectNodeContents(textoElemento);
    selecao!.removeAllRanges();
    selecao!.addRange(intervalo);

    document.execCommand('copy');
    alert('TEXTO COPIADO');
  }


  private obterIdentificacaoCtoCeip(): string {
    return this.semIdentificacao
      ? `CTO SEM IDENTIFICAÇÃO - PORTA: ${this.valorPortaCtoCeip}`
      : `${this.tipoCtoCeipSelecionado} - ${this.valorCtoCeip} - PORTA: ${this.valorPortaCtoCeip}`;
  }

}
