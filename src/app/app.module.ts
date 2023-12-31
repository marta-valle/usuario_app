import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{Routes, RouterModule} from'@angular/router';

import { AppComponent } from './app.component';
import { AutenticarComponent } from './autenticar/autenticar.component';
import { CriarcontaComponent } from './criarconta/criarconta.component';
import { RecuperarsenhaComponent } from './recuperarsenha/recuperarsenha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//dia:01/07 roteando rotas do projeto
const routes:Routes =[
  {path:'', pathMatch: 'full', redirectTo: '/home/acessar-conta'},
  {path: 'home/acessar-conta', component: AutenticarComponent},
  {path: 'home/criar-conta', component: CriarcontaComponent},
  {path: 'home/recuperar-senha', component:RecuperarsenhaComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    AutenticarComponent,
    CriarcontaComponent,
    RecuperarsenhaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //formulários reativos - usamos no criação de cadastro
    ReactiveFormsModule, //formulários reativos - usamos no criação de cadastro
    HttpClientModule,//biblioteca para requisições HTTP
    RouterModule.forRoot(routes),//registrando as rotas no projeto(dia:01/07)
    NgxSpinnerModule, //Registrando a biblioteca do spinner (que deixa interativo para o usuario, a espera a comunicação entre o front e o back)
    BrowserAnimationsModule //Premite a animação do spinner
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
