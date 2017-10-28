import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth, public firebaseProvider: FirebaseProvider, public alertCtrl: AlertController) {}

  loginUser(newEmail: string, newPassword: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
   }

   resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
   }

   logoutUser() {
    return this.afAuth.auth.signOut();
   }

   signupUser(newEmail: string, newPassword: string, newFirstName: string, newLastName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword)
    .then(() => {
        this.afAuth.auth.currentUser.sendEmailVerification()
        .then(() => {
          console.log('verification email sent');
        });
        this.firebaseProvider.addNewUserProfile(this.afAuth.auth.currentUser.uid, newFirstName, newLastName);
        //this.logoutUser();
    });
  }
}