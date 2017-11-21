import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserEvent } from '../../models/event/userevent.model';
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { Subscription } from 'rxjs/Subscription'
import { UserEventsPage } from '../user-events/user-events'

@IonicPage()
@Component({
  selector: 'page-edit-user-event',
  templateUrl: 'edit-user-event.html',
})
export class EditUserEventPage {
  eventKey: string;
  event: UserEvent;
  subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: FirebaseProvider) {
    this.eventKey = this.navParams.get('id');
    this.subscription = this.firebase.getSpecifiedUserEvents(this.eventKey).subscribe(x => {
      this.event = x;
    })
    console.log(this.eventKey)
  }

  updateEvent(event: UserEvent) {
    this.firebase.updateEvent(this.eventKey, event);
    this.navCtrl.setRoot(UserEventsPage)
  }

  removeEvent(event: UserEvent) {
    this.firebase.removeEvent(this.eventKey);
    this.navCtrl.setRoot(UserEventsPage)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
