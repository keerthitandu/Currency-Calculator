import { Component, OnInit } from '@angular/core';
import { CurrencyServiceService } from '../currency-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latestyArray:any=[];
  base:string="EUR"
  constructor( public currencyService:CurrencyServiceService) { 
    let data={
      base:'EUR',
      symbols:'INR,USD,GBP,JPY,AED,AFN,ALL,AMD,CAD'
    }
    this.getlatestData(data);
  }

  ngOnInit(): void {
  }

  getlatestData(data:any){
    this.currencyService.latestList(data).subscribe((res:any) => {
        if(res){
          // this.latestyArray = Object.keys(res.rates);
          this.latestyArray =res.rates;
          // console.log(this.currencyArray, 'this.currencyArray', typeof(this.currencyArray));
        }
    }); 
  }

}
