import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectEquipamentoService {

  constructor() { }

  configurarEquipamentoWiFiIntegrado() {
    return {
      mostrarInputGP_WI: true,
      mostrarInputSenha: true,
      aparelhoSelecionadoOnu: '',
      aparelhoSelecionadoOntP: '',
      senhaSelecionada: ''
    };
  }

  configurarEquipamentoOnuRoteador() {
    return {
      mostrarInputGP_OR: true,
      mostrarInputPR: true,
      aparelhoSelecionadoOnu: '',
      aparelhoSelecionadoOntP: '',
    };
  }

  configurarEquipamentoFttb() {
    return {
      mostrarInputFTTB: true,
      aparelhoSelecionadoOnu: 'FTTB',
      fttbSelecionado: 'ONU + ROTEADOR'
    };
  }

  configurarCto() {
    return {
      tipoCtoCeipSelecionado: 'CTO',
      esconderInput: true,
      mostrarInputCtoCeip: true
    };
  }

  configurarCeip() {
    return {
      tipoCtoCeipSelecionado: 'CEIP',
      esconderInput: true,
      mostrarInputCtoCeip: true
    };
  }

  configurarSwitch() {
    return {
      tipoCtoCeipSelecionado: 'SWITCH',
      esconderInput: true,
      mostrarInputCtoCeip: true
    };
  }

  configurarCtoSemIdentificacao() {
    return {
      esconderInput: true,
      mostrarInputCtoCeip: false
    };
  }
}
