import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { InitialConfigurationTwoPage } from '../initial-configuration-two/initial-configuration-two';
import { Subscription } from 'rxjs/Subscription'

@IonicPage()
@Component({
  selector: 'page-initial-configuration',
  templateUrl: 'initial-configuration.html',
})
export class InitialConfigurationPage {
  obj: FirebaseListObservable<any[]>;
  interest: any[] = [];
  subscription: Subscription;
  userID: string;
  obj2: FirebaseObjectObservable<any>;
  subscription2: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: FirebaseProvider,
      public alertCtrl: AlertController) {
    this.obj = this.firebase.getInterestList();
    this.subscription = this.obj.subscribe(x => {
      x.forEach(i => {
        this.interest.push(i);
      });
    });
    this.obj2 = this.firebase.getObject();
    this.subscription2 = this.obj2.subscribe(x => {
      this.userID = x.$key;
    });
  }

  checkornot(members){
    for (var member in members) {
      if(member == this.userID){
        return true;
      }else{
        return false;
      }
    }
  }

  toggleCheck(members, key){
    if(this.checkornot(members)){
      this.interest = [];
      this.firebase.removeInterest(this.userID, key);
    } else {
      this.interest = [];
      this.firebase.addInterest(this.userID, key);
    }
  }

  isConfigured(){
    return this.firebase.isUserConfigured(this.userID);
  }

  interestCount(){
    var count = 0;
    this.interest.forEach(item => {
      item.forEach( i => {
        if(this.checkornot(i.members))
          count++;
      })
    })
    return count;
  }

  nextSetupPage(){
    if(this.interestCount() >= 3){
      this.navCtrl.setRoot(InitialConfigurationTwoPage);
    }else {
      let alert = this.alertCtrl.create({
      message: "Please select at least 3 interests",
      buttons: [
        {
          text: "Ok",
          role: 'cancel'
        }
      ]
    });
    alert.present();
    }
  }

  /*
  ionViewWillLeave(){
    if(this.interestCount() >= 3){
      this.navCtrl.pop();
    } else {
      let alert = this.alertCtrl.create({
        message: "Please select at least 3 interests",
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();
    }
  }
  */
  
ngOnDestroy() {
  this.subscription.unsubscribe()
  this.userID = null;
  this.subscription2.unsubscribe();
}

}
