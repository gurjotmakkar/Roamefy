import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth, public firebaseProvider: FirebaseProvider) {}
  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
   }

   resetPassword(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
   }

   logoutUser(): Promise<any> {
    return this.afAuth.auth.signOut();
   }

   signupUser(newEmail: string, newPassword: string, newFirstName: string, newLastName: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword)
    .then(() => {
      if(this.afAuth.auth.currentUser)
        this.firebaseProvider.addNewUserProfile(this.afAuth.auth.currentUser.uid, newFirstName, newLastName);
      else
          return this.afAuth.authState;
    });
  }
}