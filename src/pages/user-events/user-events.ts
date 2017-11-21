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
  subscription2: Subscription;
  
  constructor(public navCtrl: NavController, private firebase: FirebaseProvider) {
    this.subscription2 = this.firebase.getObject().subscribe(x => {
      this.userID = x.$key;
    });
    this.userEvents = [];
    this.subscription = this.firebase.getUserEvents().subscribe(x => {
      x.forEach(i => {
        if(i.host == this.userID)
          this.userEvents.push(i)
      });
    });
  }

  addEventPage(){
    this.navCtrl.setRoot(AddEventPage)
  }

  editUserEventPage(key){
    this.navCtrl.setRoot(EditUserEventPage, {id: key})
  }

  ngOnDestroy() {
    this.userEvents = [];
    this.subscription2.unsubscribe();
    this.subscription.unsubscribe();
  }

}
