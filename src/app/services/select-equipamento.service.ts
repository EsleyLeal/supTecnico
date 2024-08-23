import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectEquipamentoService {


  constructor() { }

  configurarEquipamentoWiFiIntegrado() {
    return {
      mostrarInputOntPatrimonio: true,
      mostrarInputMacOnt: true,
      mostrarInputOntSn: true,
      mostrarInputSenhaWifiOnt: true,
      patrimonioOnt: '',
      senhaSelecionada: ''
    };
  }

  configurarEquipamentoOnuRoteador() {
    return {
      mostrarInputOnuPatrimonio: true,
      mostrarInputMacOnu: true,
      mostrarInputFhttOnu: true,
      mostrarInputMacRot: true,
      mostrarInputSnRot: true,
      mostrarInputPR: true,
      mostrarInputSenhaWifiOnu: true,
      patrimonioOnu: '',
    };
  }

  configurarEquipamentoFttb() {
    return {
      mostrarInputMacRot: true,
      mostrarInputSnRot: true,
      mostrarInputFTTB: true,
      mostrarInputSenhaFttb: true
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
