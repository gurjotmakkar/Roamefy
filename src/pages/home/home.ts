import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { EventMapPage } from '../event-map/event-map'
import { EventListPage } from '../event-list/event-list'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  mapView = EventMapPage;
  listView = EventListPage;

  constructor(public navCtrl: NavController) {
  
  }
}