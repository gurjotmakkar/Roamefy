import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  interest: any[] = [];
  subscription2: Subscription;
  categories: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: FirebaseProvider,
    public alertCtrl: AlertController) {
    this.eventKey = this.navParams.get('id');
    this.subscription = this.firebase.getSpecifiedEvent(this.eventKey).subscribe(x => {
      this.event = x;
    })
    this.categories = this.event.categories;
    this.subscription2 = this.firebase.getInterestList().subscribe(x => {
      this.interest = x;
    });
  }

  checkornot(interestKey){
    if(this.categories != null){
      this.categories.forEach( x => {
        if (x == interestKey){
          return true;
        }
      })
    }
    return false;
  }

  updateEvent(event: UserEvent, categories) {
    if(this.categories.length > 5){
      //this.navCtrl.setRoot(EditUserEventPage);
      let alert = this.alertCtrl.create({
      message: "Sorry, you can't select more than 5 categories",
      buttons: [
        {
          text: "Ok",
          role: 'cancel'
        }
      ]
    });
    alert.present();
    } else {
    event.categories = categories;
    this.firebase.updateEvent(this.eventKey, event);
    this.navCtrl.setRoot(UserEventsPage)
    }
  }

  removeEvent(event: UserEvent) {
    this.firebase.removeEvent(this.eventKey);
    this.navCtrl.setRoot(UserEventsPage)
  }
  
  cancel(){
    this.navCtrl.setRoot(UserEventsPage)
  }

  ngOnDestroy(){
    this.interest = [];
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
