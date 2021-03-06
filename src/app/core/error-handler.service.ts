import { HttpErrorResponse } from '@angular/common/http';
import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export class NotAuthenticatedErro {

}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toastyService: ToastyService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof NotAuthenticatedErro) {
      msg = 'Sua sessão expirou';
      this.router.navigate(['/login']);
    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação';
      } else {
        try {
          msg = errorResponse.error[0].mensagemUsuario;
          console.log('Ocorreu um erro', errorResponse);
        } catch (error) {
          msg = 'Ocorreu um erro ao processar a sua solicitação';
        }
      }

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.toastyService.error(msg);
  }
}
