import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    SegurancaRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
  })
  ],
  declarations: [
    LoginFormComponent
  ],
  providers: [
    JwtHelperService
  ]
})
export class SegurancaModule { }
