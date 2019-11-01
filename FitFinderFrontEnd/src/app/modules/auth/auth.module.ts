import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {AngularMaterialModule} from '../shared-modules/angular-material.module';
import {PageNotFoundComponent} from '../../components/page-not-found/page-not-found.component';
import {SignInComponent} from '../../components/sign-in/sign-in.component';
import {ForgotPasswordComponent} from '../../components/forgot-password/forgot-password.component';
import {EmailConfirmedComponent} from '../../components/email-confirmed/email-confirmed.component';
import {EmailConfirmationLinkExpiredComponent} from '../../components/email-confirmation-link-expired/email-confirmation-link-expired.component';
import {ForbiddenComponent} from '../../components/forbidden/forbidden.component';

@NgModule({
  declarations: [
    SignInComponent,
    ForgotPasswordComponent,
    EmailConfirmedComponent,
    EmailConfirmationLinkExpiredComponent,
    ForbiddenComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    AngularMaterialModule
  ]
})
export class AuthModule {}
