import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { UserEvent } from '../../models/event/userevent.model';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Subscription } from 'rxjs/Subscription';
import { UserEventsPage } from '../user-events/user-events';
import { AutocompletePage } from '../autocomplete/autocomplete';

@IonicPage(
  {
    name: 'AddEventPage'
  }
)
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
    event: UserEvent = {
      name: null,
      description: null,
      price: 0,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      address: null, // change to Address object TODO: need to add a geocoder to get lat/lon AND auto-complete
      latitude: null,
      longitude: null,
      website: null,
      phone: null,
      host: null,
      categories: []
    };

  interest: any[] = [];
  categories: any[] = [];
  subscription: Subscription;
  userID: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: FirebaseProvider,
      public alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.subscription = this.firebase.getInterestList().subscribe(x => {
      this.interest = x;
    });
    this.userID = this.firebase.getUserId();  
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  addEvent(event: UserEvent, categories) {
    if(this.categories.length > 5){
      //this.navCtrl.setRoot(AddEventPage);
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
      event.host = this.userID;
      this.firebase.addEvent(event);
      this.navCtrl.setRoot(UserEventsPage);               
    }
    
  }
  
  showAddressModal (){
    let modal = this.modalCtrl.create(AutocompletePage);
    //let me = this;
    modal.onDidDismiss(data => {
      this.event.address = data;
    });
    modal.present();
  }
  

  cancel(){
    this.navCtrl.setRoot(UserEventsPage);
  }

  ngOnDestroy() {
    this.interest = [];
    this.subscription.unsubscribe();
  }
}
