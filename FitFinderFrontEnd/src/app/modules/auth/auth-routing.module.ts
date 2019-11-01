import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from '../../components/sign-in/sign-in.component';
import {EmailConfirmedComponent} from '../../components/email-confirmed/email-confirmed.component';
import {EmailConfirmationLinkExpiredComponent} from '../../components/email-confirmation-link-expired/email-confirmation-link-expired.component';
import {ForgotPasswordComponent} from '../../components/forgot-password/forgot-password.component';
import {ForbiddenComponent} from '../../components/forbidden/forbidden.component';
import {AuthGuard} from '../../auth/auth.guard';


const authRoutes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'email-confirmed',
    component: EmailConfirmedComponent
  },
  {
    path: 'email-confirmation-dialog-link-expired',
    component: EmailConfirmationLinkExpiredComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}
