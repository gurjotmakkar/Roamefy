import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { HomePage } from '../home/home'

@IonicPage()
@Component({
  selector: 'page-initial-configuration-two',
  templateUrl: 'initial-configuration-two.html',
})
export class InitialConfigurationTwoPage {
  distance: number = 0;
  time: number = 0;
  obj: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private firebase: FirebaseProvider, public alertCtrl: AlertController) {
    this.obj = this.firebase.getObject();
    this.obj.forEach(x => {
      this.distance = x.distance;
      this.time = x.time;
    })
  }

  updateDistance(distance){
    this.firebase.updateDistance(distance);
  }

  updateTime(time){
    this.firebase.updateTime(time);
  }

  isConfigured(){
    var id = this.firebase.getUserID();
    var db = this.firebase.afd.app.database().ref('users').child(id).child('Configured');
    var configured;
    db.on('value', function(snapshot) {
       configured = snapshot.val();
    });
    if(configured == false) {
      return true;
    }
    else{
      return false;
    }
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
      var id = this.firebase.getUserID();
      this.firebase.afd.app.database().ref('users').child(id).child('Configured').set(true);
      this.navCtrl.setRoot(HomePage);
    }
  }

  
ngOnDestroy() {
  this.obj.subscribe().unsubscribe();
}
}