import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environment';


@Component({
  selector: 'app-criarconta',
  templateUrl: './criarconta.component.html',
  styleUrls: ['./criarconta.component.css']
})
export class CriarcontaComponent {

  //Variaveis
  mensagem_sucesso: string = ''
  mensagem_erro: string = ''

  //construtor para conectar com os endpoint do back
  constructor(
    private httpClient: HttpClient
  ) {

  }
  //dia 01/07: Criar um objeto pra catura de campo do formulario e validar antes de envio
  formCriarConta = new FormGroup({
    //camp 'nome' = valor inicial vazio / obrigatorio / minimo 8 / maximo 150
    nome: new FormControl('',
      [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(150)
      ]),
    //campo 'email'= valor inicial vazio / obrigatorio / tipo email
    email: new FormControl('',
      [Validators.required,
      Validators.email]),

    //campo 'senha'
    senha: new FormControl('',
      [Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-=_+[\]{}|\\,.<>/?])[a-zA-Z0-9!@#$%^&*()\-=_+[\]{}|\\,.<>/?]{8,}$/)])
  });


  //função utilizada para exibir as mensagens de erro na página
  get form(): any {
    return this.formCriarConta.controls;
  }


  //função para capturar o SUBMIT do formulário
  onSubmit(): void {
    //Fazendo uma requisição para o POST /api/usuarios/criar-conta
    //limpar os valores das variáveis
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    this.httpClient.post(
      enviroment.apiUsuarios + '/criar-conta', // este endereço da API
      this.formCriarConta.value
    )
      .subscribe({
        next: (data: any) => { //capturando o retorno de sucesso da API
          //exibir mensagem de sucesso na página
          this.mensagem_sucesso = data.mensagem;
          //limpar o conteúdo do formulário
          this.formCriarConta.reset();

        },
        error: (e) => { //capturando o retorno de erro da API
          //exibir mensagem de erro na página
          this.mensagem_erro = e.error.mensagem;console.log(e.error);
        }
      })
  }


}


