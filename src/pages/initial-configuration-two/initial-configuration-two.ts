import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { HomePage } from '../home/home'
import { Subscription } from 'rxjs/Subscription'

@IonicPage()
@Component({
  selector: 'page-initial-configuration-two',
  templateUrl: 'initial-configuration-two.html',
})
export class InitialConfigurationTwoPage {
  distance: number = 0;
  time: number = 0;
  userID: string;
  obj: FirebaseObjectObservable<any>;
  subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private firebase: FirebaseProvider, public alertCtrl: AlertController) {
    this.obj = this.firebase.getObject();
    this.subscription = this.obj.subscribe(x => {
      this.distance = x.distance;
      this.time = x.time;
      this.userID = x.$key;
    })
  }

  updateDistance(distance){
    this.firebase.updateDistance(this.userID, distance);
  }

  updateTime(time){
    this.firebase.updateTime(this.userID, time);
  }

  isConfigured(){
    return this.firebase.isUserConfigured(this.userID);
    
  }

  finishSetup(){
    if(this.distance === undefined || this.time === undefined){
        let alert = this.alertCtrl.create({
          message: "Please configure to proceed",
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
    }else{
      this.firebase.configureUser(this.userID);
      this.navCtrl.setRoot(HomePage);
    }
  }

  
  ngOnDestroy() {
    this.userID = null;
    this.subscription.unsubscribe();
  }
}