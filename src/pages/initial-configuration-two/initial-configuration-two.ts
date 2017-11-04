import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-initial-configuration-two',
  templateUrl: 'initial-configuration-two.html',
})
export class InitialConfigurationTwoPage {
  distance: number = 0;
  time: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: FirebaseProvider) {
    this.distance = this.firebase.getDistance();
    this.time = this.firebase.getTime();
    console.log(this.distance)
    console.log(this.time)
  }

  updateDistance(distance){
    this.firebase.updateDistance(distance);
  }

  updateTime(time){
    this.firebase.updateTime(time);
  }

}