import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { InitialConfigurationTwoPage } from '../initial-configuration-two/initial-configuration-two';

@IonicPage()
@Component({
  selector: 'page-initial-configuration',
  templateUrl: 'initial-configuration.html',
})
export class InitialConfigurationPage {
  interest: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: FirebaseProvider) {
    this.interest = this.firebase.getInterestList();
  }

  checkornot(members){
    for (var member in members) {
      if(member == this.firebase.getUserID()){
        return true;
      }else{
        return false;
      }
    }
  }

  toggleCheck(members, key){
    if(this.checkornot(members))
      this.firebase.removeInterest(key);
    else
      this.firebase.addInterest(key);
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

  nextSetupPage(){
    this.navCtrl.setRoot(InitialConfigurationTwoPage);
  }

}
