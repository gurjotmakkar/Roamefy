import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription'
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { EditUserProfilePage } from '../edit-user-profile/edit-user-profile';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  userID: string;
  userName: string;
  userEmail: string;
  subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: FirebaseProvider, 
    public alertCtrl: AlertController) {
    this.subscription = this.firebase.getObject().subscribe(x => {
      this.userName = x.firstName + " " + x.lastName;
      this.userEmail = this.firebase.getUserEmail();
    });
    this.userID = this.firebase.getUserId();
  }

  edit(){
    this.navCtrl.setRoot(EditUserProfilePage);
  }

  goToResetPassword(){
    this.firebase.resetPassword(this.firebase.afAuth.auth.currentUser.email)
    .then((user) => {
      let alert = this.alertCtrl.create({
        message: "We just sent you a reset link to your email",
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();
    }, (error) => {
      var errorMessage: string = error.message;
      let errorAlert = this.alertCtrl.create({
        message: errorMessage,
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      errorAlert.present();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
