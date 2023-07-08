import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { enviroment } from 'src/environments/environment';

@Component({
  selector: 'app-recuperarsenha',
  templateUrl: './recuperarsenha.component.html',
  styleUrls: ['./recuperarsenha.component.css'],
})
export class RecuperarsenhaComponent {
  //DATA: 08/07:  Variaveis
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  //DATA: 08/07: CONSTRUTORES PARA SEREM INICIADOS
constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ){
  }

  //DATA: 08/07 CRIANDO CAPTURA DE FORMULARIO
  formRecuperarSenha = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  //DATA: 08/07 função para acessar os campos do formulário na página
  //e então exibir mensagens de erro de validação
  get form(): any {
    return this.formRecuperarSenha.controls;
  }
  //DATA: 08/07: QUANDO EXECUTAR O SUBMIT
  onSubmit(): void {
    // Iniciou a animação de interação com o usuario
    this.spinner.show();
    // Executando a requisição POST para o serviço de API "Endereço + dados"
    //subscribe: recebe o que veio da API
    //. add trata e devolve pro "usuario" a resposta da API
    this.httpClient
      .post(
        enviroment.apiUsuarios + '/recuperar-senha',
        this.formRecuperarSenha.value
      )
      .subscribe({
        next: (data: any) => {
          this.mensagem_sucesso = data.mensagem; // Retornará a mensagem do json do "swagger"
          this.formRecuperarSenha.reset(); //LIMPAR FORMULARIO DEPOIS DO RETORNO
        },
        error: (e) => {
          this.mensagem_erro = e.error.mensagem; // Retornará a mensagem do Json do "swagger"
        },
      })
      .add(() => {
        this.spinner.hide();
      });
  }
}
