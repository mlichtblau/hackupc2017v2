import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GroupInterface, GroupRank, UserInterface} from "../../providers/group-rank";
import {first} from "rxjs/operator/first";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  current_user:string = "3f77b0dae880ed8d87af21a2cbfa269083bd4be064bda7620a9050b93796e527";
  group:any;
  groups:Array<GroupInterface> = [];
  group_keys:any;
  subscription:any;

  constructor(public navCtrl: NavController, private groupService:GroupRank) {
    this.subscription = this.groupService.load(this.current_user)
      .subscribe(groups => {
        this.groups = groups;
        this.group_keys = Object.keys(this.groups);
        this.group = this.group_keys[0];
        console.log(this.groups[this.group]);
      });
  }

  setColor(score){
    if(score < 20){
      return 1;
    }
    else if(score < 40){
      return 2;
      ;
    }
    else if(score < 60){
      return 3;
    }
    else if(score < 80){
      return 4;
    }
    else{
      return 5;
    }
  }
}
