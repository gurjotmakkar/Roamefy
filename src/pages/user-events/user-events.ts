import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { Subscription } from 'rxjs/Subscription'
import { AddEventPage } from '../add-event/add-event'
import { EditUserEventPage } from '../edit-user-event/edit-user-event'

@IonicPage()
@Component({
  selector: 'page-user-events',
  templateUrl: 'user-events.html',
})
export class UserEventsPage {

  userEvents: any[] = [];
  subscription: Subscription;
  userID: string;
  
  constructor(public navCtrl: NavController, private firebase: FirebaseProvider) {
    this.userID = this.firebase.getUserId();
    this.userEvents = [];
    this.subscription = this.firebase.getUserEvents().subscribe(x => {
      this.userEvents = x;
    });
  }

  getCategories(events){
    var categories: string;
    if(events){
      events.forEach( x => {
        if(categories)
          categories += ", " + this.firebase.getInterestName(x);
        else
          categories = this.firebase.getInterestName(x);
      });
      return categories;
    } else {
      return null;
    }
  }  

  addEventPage(){
    this.navCtrl.setRoot(AddEventPage)
  }

  editUserEventPage(key){
    this.navCtrl.setRoot(EditUserEventPage, {id: key})
  }

  ngOnDestroy() {
    this.userEvents = [];
    this.subscription.unsubscribe();
  }

}
