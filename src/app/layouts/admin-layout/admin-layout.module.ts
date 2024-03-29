import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { ClienteConsultaComponent } from 'app/cliente/cliente-consulta/cliente-consulta.component';
import { ClienteDetalheComponent } from 'app/cliente/cliente-detalhe/cliente-detalhe.component';
// import { IConfig } from 'ngx-mask/lib/config';
import { NgxMaskModule } from 'ngx-mask'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatSelectModule} from '@angular/material/select';
import { ChamadoConsultaComponent } from 'app/chamado/chamado-consulta/chamado-consulta.component';
import { ChamadoDetalheComponent } from 'app/chamado/chamado-detalhe/chamado-detalhe.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AtendimentoConsultaComponent } from 'app/atendimento/atendimento-consulta/atendimento-consulta.component';
import { AtendimentoDetalheComponent } from 'app/atendimento/atendimento-detalhe/atendimento-detalhe.component';

// export let options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ReactiveFormsModule, 
    FormsModule,
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
    MatSelectModule,
    MatAutocompleteModule
    
  ],
  declarations: [
    HomeComponent,
    ClienteConsultaComponent,
    ClienteDetalheComponent,
    ChamadoConsultaComponent,
    ChamadoDetalheComponent,
    AtendimentoConsultaComponent,
    AtendimentoDetalheComponent
  ]
})

export class AdminLayoutModule {}
