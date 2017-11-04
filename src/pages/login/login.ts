import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  LoadingController,
  Loading,
  AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { PasswordValidator } from '../../validators/password';
import { HomePage } from '../home/home';
import { InitialConfigurationPage } from '../initial-configuration/initial-configuration';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController, public authData: AuthProvider,
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, private menu: MenuController) {
      this.menu.swipeEnable(false);
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.required, PasswordValidator.isValid])]
      });
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        if (this.authData.afAuth.auth.currentUser.emailVerified == false){
          this.authData.logoutUser();
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: "Please verify your email",
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        } else {
          var db = this.authData.afAuth.app.database().ref('users').child(this.authData.afAuth.auth.currentUser.uid).child('Configured');
          var configured;
          db.on('value', function(snapshot) {
             configured = snapshot.val();
             console.log(configured);
          });
          if(configured == false) {
            this.navCtrl.setRoot(InitialConfigurationPage);
          }
          else{
            this.navCtrl.setRoot(HomePage);
          }
        }
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
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

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

  createAccount(){
    this.navCtrl.push('SignupPage');
  }

}