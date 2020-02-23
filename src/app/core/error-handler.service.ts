import { HttpErrorResponse } from '@angular/common/http';
import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastyService: ToastyService) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {
      try {
        msg = errorResponse.error[0].mensagemUsuario;
        console.log('Ocorreu um erro', errorResponse);
      } catch (error) {
        msg = 'Ocorreu um erro ao processar a sua solicitação';
        console.log('Ocorreu um erro', error);
      }

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.toastyService.error(msg);
  }
}
