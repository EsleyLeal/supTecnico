import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Material } from '../models/material.model'; // Ajuste o caminho conforme necessário
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  materiais: Material[] = [{ tipo: '', quantidade: '' }];
  observacao: string = '';

  // Lista de opções para autocomplete
  options: string[] = ['Fixa Fio', 'Conector', 'Cabo de Fibra Óptica', 'Esticador', 'PTO', 'Caixa de Emenda', 'Splitters'];
  filteredOptions: Observable<string[]>;

  // FormControl para a entrada do autocomplete
  myControl = new FormControl();

  constructor() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || ''))
    );
  }

  // Função para adicionar novo material
  adicionarMaterial() {
    this.materiais.push({ tipo: '', quantidade: '' });
  }

  // Função para remover material
  removerMaterial(index: number) {
    this.materiais.splice(index, 1);
  }

  // Função de filtro para autocomplete
  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getMateriais() {
    return this.materiais;
  }

  getObservacao(): string {
    return this.observacao;
  }
}
