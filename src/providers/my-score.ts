import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


let url:string = "http://localhost:3000";
/*
  Generated class for the MyScore provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface PersonalScoresInterface {
  id:number;
  score:number;
  created_at:Date;
}

@Injectable()
export class MyScore {

  constructor(public http: Http) {
    console.log('Hello MyScore Provider');
  }

  load(user) {
      let test = this.http.get(url + '/score/index?user='+user+'&last_updated=2017-10-14%2012%3A00%3A00').map(response => response.json());
      return test
  }
}
