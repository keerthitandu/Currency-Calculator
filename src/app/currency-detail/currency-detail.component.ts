import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CurrencyServiceService } from '../currency-service.service';


import Chart from 'chart.js/auto';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.css']
})
export class CurrencyDetailComponent implements OnInit {
  fromC!:any;
  ToC!:any;
  mapArray:any=[];
  public chart: any;
  currentYear:any;
  currentMonth:any;
  currentDate:any;

  lastYearDate:any;
  currentYearDate:any;

  xAxisArray:any=[];
  yAxisArray:any=[];

  
  constructor(public currencyService:CurrencyServiceService, public route:ActivatedRoute,
    public router: Router) {
    this.route.paramMap.subscribe((params:ParamMap) =>{

      this.ToC = params.get('to');
      this.fromC = params.get('from');
      this.currentYear = new Date().getFullYear();
      this.currentMonth = new Date().getMonth() + 1;

      this.currentDate = new Date().getDate();

      this.lastYearDate = this.lastYearDateCall();
      this.currentYearDate = this.currentYear + '-' + this.currentMonth + '-' + this.currentDate;
      
    });
  }

  ngOnInit():void {
    this.last_day_of_month();
    // this.getGraph(this.lastYearDate, this.currentYearDate);      // call timeseries graph api    
  }


  lastYearDateCall():any{
    var d = new Date();
    var pastYear = d.getFullYear() - 1;
    d.setFullYear(pastYear);
    // console.log(d.toISOString().slice(0, 10));
    return d.toISOString().slice(0, 10);
  }

  createChart(data:any):any{
      this.xAxisArray.forEach((element:any) => {
        if(this.mapArray[element]){
          this.yAxisArray.push(this.mapArray[element][this.ToC])
        }                
    });

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.xAxisArray, 
	       datasets: [
          {
            label: this.ToC,
            data: this.yAxisArray,
            backgroundColor: 'blue'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }


  getGraph(startdate:any, endDate:any):any{
    let data = {
      'start_date':startdate,
      'end_date':endDate,
      'base':this.fromC,
      'symbols':this.ToC

    }
    this.currencyService.getMapData(data).subscribe((res:any) => {
      console.log(res)
      if(res){        
        this.mapArray =  res.rates;        
        // console.log(this.mapArray, 'this.mapArray');   

        // call chart after rates data
        this.createChart(this.mapArray);
      }
  }); 

  }


  

  last_day_of_month():any {  
    var monthCounter = this.currentMonth;
    var yearCounter = this.currentYear;
    var i = 0
    var x = []
    while (i < 12) {
      if (monthCounter == 0) {
        monthCounter = 12;
        yearCounter = yearCounter - 1;
      }
      
      if(JSON.stringify(monthCounter).length == 1){
        monthCounter = ("0" + JSON.stringify(monthCounter)).slice(-2);       
        x.push(yearCounter+ "-" + monthCounter + "-"+ this.lastday(yearCounter,monthCounter))
      }else{
        x.push(yearCounter+ "-" +monthCounter+ "-"+ this.lastday(yearCounter,monthCounter))
      }
      
      monthCounter--;
      i++;
    }

    this.xAxisArray = x;
  }


  lastday(y:any,m:any):any{
    return  new Date(y, m , 0).getDate();
  }


}
