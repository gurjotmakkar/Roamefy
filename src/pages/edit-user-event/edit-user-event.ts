import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserEvent } from '../../models/event/userevent.model';
import { FirebaseProvider } from '../../providers/firebase/firebase'

/**
 * Generated class for the EditUserEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-user-event',
  templateUrl: 'edit-user-event.html',
})
export class EditUserEventPage {

  event: UserEvent;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private firebase: FirebaseProvider) {
  }

  ionViewWillLoad() {
    this.event = this.navParams.get('event');
  }
/*
  saveEvent(event: UserEvent) {
    this.events.editEvent(event).then(() => {
      this.toast.show(`${event.name} saved!`);
      this.navCtrl.setRoot('HomePage');
    });
  }

  removeEvent(event: UserEvent) {
    this.events.removeEvent(event)
      .then(() => {
        this.toast.show(`${event.name} deleted!`);
        this.navCtrl.setRoot('HomePage');
      });
  }
*/
}
