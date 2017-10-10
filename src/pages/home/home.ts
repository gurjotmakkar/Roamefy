import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseProvider } from './../../providers/firebase/firebase';

import { LoginPage } from '../login/login'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public authData: AuthProvider, public navCtrl: NavController, public firebaseProvider: FirebaseProvider) {}
  
  logout() {
    this.authData.logoutUser();
    this.navCtrl.setRoot(LoginPage);
  }

}
