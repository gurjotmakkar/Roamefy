import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  constructor(public http: Http) {
    console.log('Hello HttpProvider Provider');
  }
  
/*
  http.get is used to fetch data from web service and map is used to manipulate data. 
  Json() is called on the response to return data.
*/
  getJsonData(){
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers});
    return this.http.get('http://app.toronto.ca/cc_sr_v1_app/data/edc_eventcal_APR?limit=500', options).map((res)=>res.json())
  }
}