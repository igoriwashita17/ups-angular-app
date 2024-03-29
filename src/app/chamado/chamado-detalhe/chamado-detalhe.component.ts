import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import * as uuid from 'uuid';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChamadoService } from 'app/services/chamado.service';
import { ClienteService } from 'app/services/cliente.service';
import { TipoAtendimento } from 'app/commons/enum/tipoAtendimento';
// import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-chamado-detalhe',
  templateUrl: './chamado-detalhe.component.html',
  styleUrls: ['./chamado-detalhe.component.css']
})
export class ChamadoDetalheComponent implements OnInit {

  cdCliente = null;
  chamadoFormSubmitted = false;
  cdEmpresa = null;
  cdAtendimento = null;

  tiposAtendimento = [];
  empresas = [];
  unidades = [];


  form: any = {
    cdEmpresa: null,
    cdUnidade: null,
    cdTipoAtendimento: null,
    equipamentos: []
  }

  equipamento: any = {
    dsEquipamento: null,
    dsTipo: null,
    fgAtivo: true
  }

  tiposEquipamento = [
    "GMG", "Nobreak", "Infraestrutura"
  ]

  private readonly notifier: NotifierService;

  constructor(public chamadoService: ChamadoService, public notifierService: NotifierService, public route: ActivatedRoute, public clienteService: ClienteService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {

    this.carregarCombos().then((combos) => {
      this.route.queryParams.subscribe(params => {
        if (params['cdEmpresa']) {
          this.cdEmpresa = params['cdEmpresa'];
          this.form.cdEmpresa = parseInt(params['cdEmpresa']);
          this.carregarUnidades();
          // this.detalhar();
        }
        if (params['cdAtendimento']) {
          this.cdAtendimento = params['cdAtendimento'];
          this.form.cdAtendimento = parseInt(params['cdAtendimento']);
          this.carregarUnidades();
          this.detalhar();
        }
      })
    })



  }

  carregarCombos() {

    return new Promise((resolve, reject) => {
      this.chamadoService.carregarCombos().then((combos) => {
        resolve(combos);
        console.log(combos);
        this.tiposAtendimento = combos.tiposAtendimento;
        this.empresas = combos.empresas;
      }).catch((fail) => {
        console.log(fail);
        reject(fail);
      })
    })


  }


  carregarUnidades() {
    this.clienteService.carregarUnidades(this.form.cdEmpresa).then((unidades) => {
      console.log(unidades);
      this.unidades = unidades;
      if (this.unidades.length == 1) {
        this.form.cdUnidade = unidades[0].cdUnidade;
      }
      console.log(this.form)
    })
  }


  addEquipamento() {

    if (this.form.equipamentos) {

      if (this.equipamento) {
        let equipamento = {
          dsEquipamento: this.equipamento.dsEquipamento,
          dsTipo: this.equipamento.dsTipo,
          fgAtivo: this.equipamento.fgAtivo
        }
        this.form.equipamentos.push(equipamento);
      }

    }

  }

  carregarEquipamentos() {

    if (!this.form.cdAtendimento) {

      if (this.form.cdTipoAtendimento == TipoAtendimento.PREVENTIVA || this.form.cdTipoAtendimento == TipoAtendimento.PREVENTIVA_E_CORRETIVA) {
        this.chamadoService.carregarEquipamentos(this.form.cdUnidade).then((equipamentos) => {

          this.form.equipamentos = [];

          if (equipamentos.length > 0) {
            equipamentos.forEach((item, i) => {
              let equip = {
                dsEquipamento: item.dsEquipamento,
                dsTipo: item.dsTipo,
                fgAtivo: true
              }
              this.form.equipamentos.push(equip);
            })
          }
        })
      }
    }

  }

  deletarEquipamento(i) {
    this.form.equipamentos.splice(i, 1);
  }

  salvar() {

    this.chamadoFormSubmitted = true;

    if (
      this.form.cdEmpresa && this.form.cdUnidade && this.form.cdTipoAtendimento && this.form.dsDescricao && this.form.equipamentos.length > 0
    ) {

      console.log(this.form);

      this.chamadoService.salvar(this.form).then((results) => {

        if (results) {
          this.form.cdAtendimento = results.cdAtendimento;
        }

        this.notifier.notify("success", "Dados salvos com sucesso.");
      })
    }
    else {
      this.notifier.notify("error", "Há campos de preenchimento obrigatório em branco");
    }

  }

  detalhar() {
    this.chamadoService.detalhar(this.cdAtendimento).then((chamado) => {
      this.form = chamado;
      this.carregarUnidades();
    })
  }

}
