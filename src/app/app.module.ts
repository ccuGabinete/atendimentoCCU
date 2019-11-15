import { PdfService } from './services/pdf/pdf.service';
import { Destino } from './models/destino/destino';

import 'reflect-metadata';
import '../polyfills';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DadosComponent } from './dados/dados.component';
import { Cadastro } from './models/cadastro/cadastro';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginService } from './services/acesso/login.service';
import { Usuario } from './models/usuario/usuario';
import { HomeComponent } from './home/home.component';

import { AppComponent } from './app.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertaComponent } from './alerta/alerta.component';
import { SucessoService } from './services/sucesso/SucessoService';
import { Aviso } from './models/aviso/aviso';
import { AvisocamposService } from './services/avisocampos/avisocampos.service';
import { AvisosalvarService } from './services/avisosalvar/avisosalvar.service';
import { Avisocamposmodel } from './models/avisoscamposmodel/avisocamposmodel';
import { Avisosalvarmodel } from './models/avisosalvarmodel/avisosalvarmodel';
import { AvisosalvarComponent } from './avisosalvar/avisosalvar.component';
import { AvisocamposComponent } from './avisocampos/avisocampos.component';
import { LogadoService } from './services/logado/logado.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TitleCasePipe } from '@angular/common';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DadosComponent,
    HomeComponent,
    AlertaComponent,
    AvisosalvarComponent,
    AvisocamposComponent
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgbModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    Destino,
    Usuario,
    Cadastro,
    Aviso,
    PdfService,
    LoginService,
    SucessoService,
    AvisocamposService,
    AvisosalvarService,
    Avisosalvarmodel,
    Avisocamposmodel,
    LogadoService,
    TitleCasePipe
  ],
  bootstrap: [AppComponent],
  exports: [
    AlertaComponent,
    AvisocamposComponent,
    AvisosalvarComponent
  ],
  entryComponents: [
    AlertaComponent,
    AvisocamposComponent,
    AvisosalvarComponent
  ]

})
export class AppModule { }
