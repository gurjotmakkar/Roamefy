import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

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
        joinDate: new Date().getDate(),
        Configured: false
      });
    }
  }

  getUserID(){
    return this.afd.app.auth().currentUser.uid;
  }

  getInterestList() {
    return this.afd.list('/Interests');
  }

  addInterest(itemKey) {
    var id = this.getUserID();
    const members = this.afd.app.database().ref(`Interests/${itemKey}/members`)
    members.child(id).set(true);
  }

  removeInterest(itemKey) {
    var id = this.getUserID();
    const member = this.afd.app.database().ref(`Interests/${itemKey}/members/${id}`)
    member.remove()
  }
  
  getObject(){
    var id = this.getUserID();
    return this.afd.object(`users/${id}/`);
  }

  updateDistance(value){
    var id = this.getUserID();
    const distance = this.afd.app.database().ref(`users/${id}/distance/`);
    distance.set(value);
  }

  updateTime(value){
    var id = this.getUserID();
    const time = this.afd.app.database().ref(`users/${id}/time/`);
    time.set(value);    
  }

}
