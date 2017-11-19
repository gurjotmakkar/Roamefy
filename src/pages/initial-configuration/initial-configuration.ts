import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { InitialConfigurationTwoPage } from '../initial-configuration-two/initial-configuration-two';
import { Subscription } from 'rxjs/Subscription'

@IonicPage()
@Component({
  selector: 'page-initial-configuration',
  templateUrl: 'initial-configuration.html',
})

export class InitialConfigurationPage {
  interest: any[] = [];
  subscription: Subscription;
  userID: string;
  subscription2: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: FirebaseProvider,
      public alertCtrl: AlertController) {
    this.subscription = this.firebase.getInterestList().subscribe(x => {
      this.interest = x;
    });
    this.subscription2 = this.firebase.getObject().subscribe(x => {
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
      this.firebase.removeInterest(this.userID, key);
    } else {
      this.firebase.addInterest(this.userID, key);
    }
  }

  isConfigured(){
    return this.firebase.isUserConfigured(this.userID);
  }

  interestCount(){
    var count = 0;
    this.interest.forEach(item => {
        if(this.checkornot(item.members))
          count++;
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

  ionViewWillLeave(){
    if(this.interestCount() >= 3){
      console.log("leaving page")
    } else {
      this.navCtrl.setRoot(InitialConfigurationPage);
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
  
ngOnDestroy() {
  this.interest = [];
  this.subscription.unsubscribe();
  this.subscription2.unsubscribe();
}

}
