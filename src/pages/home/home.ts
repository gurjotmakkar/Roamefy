import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { LocationTracker } from '../../providers/location-tracker/location-tracker'; 
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public authData: AuthProvider, public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public locationTracker: LocationTracker) {}
  
  logout() {
    this.authData.logoutUser();
    this.navCtrl.setRoot(LoginPage);
  }

  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }

}
