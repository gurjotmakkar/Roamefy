import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  LoadingController,
  Loading,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { EmailValidator } from '../../validators/email';
import { PasswordValidator } from '../../validators/password';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm:FormGroup;
  public loading:Loading;
  public submitAttempt;

  constructor(public nav: NavController, public authData: AuthProvider, public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.signupForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, PasswordValidator.isValid, Validators.minLength(8)])]
    });
  }

  signupUser(){
    this.submitAttempt = true;
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.firstName, 
        this.signupForm.value.lastName)
      .then(() => {
        this.nav.setRoot(HomePage);
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  goToLogin(){
    this.nav.push(LoginPage);
  }
}