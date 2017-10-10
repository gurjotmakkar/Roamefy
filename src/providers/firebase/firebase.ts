import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) {}

  //user information while registration
  addNewUserProfile(newId, newFirstName, newLastName) {
    var user = this.afd.app.auth().currentUser;
    var usersRef = this.afd.app.database().ref("users");
    if (user) {
      usersRef.child(user.uid).set({ 
        firstName: newFirstName,
        lastName: newLastName,
        joinDate: new Date().toDateString()
      });
    }
  }
}
