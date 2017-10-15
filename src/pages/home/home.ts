import {Component, ViewChild} from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';
import { MyScore, PersonalScoresInterface } from "../../providers/my-score";
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  current_user:string = "3f77b0dae880ed8d87af21a2cbfa269083bd4be064bda7620a9050b93796e527";
  scores:Array<PersonalScoresInterface>;
  subscription:any;
  refresher: Refresher;

  currentScore: number;
  currentColor: number;
  currentColorCode: string;
  currentMessage: string;

  @ViewChild('lineCanvas') lineCanvas;

  lineChart: any;

  constructor(public navCtrl: NavController, private myScoreService: MyScore) {
    this.subscription = this.myScoreService.load(this.current_user)
      .subscribe(scores => {
        this.scores = scores;
        this.currentScore = this.scores[this.scores.length - 1].score;
        this.setCurrentColor();
        this.lineChart = this.getLineChart();
      });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.subscription = this.myScoreService.load(this.current_user)
        .subscribe(scores => {
          this.scores = scores;
          this.currentScore = this.scores[this.scores.length - 1].score;
          console.log(this.currentScore);
          this.setCurrentColor();
          this.lineChart = this.getLineChart();
        });
      refresher.complete();
    }, 2000);
  }
/*
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartJsPage');
    this.setCurrentColor();
    this.lineChart = this.getLineChart();
  }*/

  getChart(context, chartType, data) {
    return new Chart(context, {
      type: chartType,
      data: data,
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  getLineChart() {
    var data = {
      labels: Array.from(new Array(15),(val,index)=>{
        if (index%2 == 0)
          return index+1;
        else
          return "";
      }),
      datasets: [
        {
          legend: {display: 'false'},
          fill: false,
          lineTension: 0.1,
          borderColor: this.currentColorCode,
          pointBorderColor: this.currentColorCode,
          pointBackgroundColor: this.currentColorCode,
          pointRadius: 1,
          data: this.scores.map(function (a) {
            return a["score"]
          }),
          spanGaps: false,
        }
      ]
    };

    return this.getChart(this.lineCanvas.nativeElement, "line", data);
  }

  setCurrentColor(){
    if(this.currentScore < 20){
      this.currentColor = 1;
      this.currentColorCode = "#FFC09F";
      this.currentMessage = "Your planet needs you"
    }
    else if(this.currentScore < 40){
      this.currentColor = 2;
      this.currentColorCode = "#FFEE93";
      this.currentMessage = "You can always try a little harder"
      ;
    }
    else if(this.currentScore < 60){
      this.currentColor = 3;
      this.currentColorCode = "#FCF5C7";
      this.currentMessage = "Challenge your friends"
    }
    else if(this.currentScore < 80){
      this.currentColor = 4;
      this.currentColorCode = "#A0CED9";
      this.currentMessage = "Good Job"
    }
    else{
      this.currentColor = 5;
      this.currentColorCode = "#ADF7B6";
      this.currentMessage = "Life is good"
    }
  }

}
