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
  
  getDistance(){
    var id = this.getUserID();
    var distance = 0;
    const db = this.afd.app.database().ref(`users/${id}/distance/`);
    db.on('value', function(snapshot) {
      if(snapshot.val()){
        distance = snapshot.val();
      }
    });
    return distance;
  }
  
  getTime(){
    var id = this.getUserID();
    var time = 0;
    const db = this.afd.app.database().ref(`users/${id}/time/`);
    db.on('value', function(snapshot) {
      if(snapshot.val()){
        time = snapshot.val();
      }
    });
    return time;  
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
