import { Component, OnInit } from '@angular/core';
import { CurrencyServiceService } from '../currency-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latestyArray:any=[]=[];
  base:string="EUR";
  popularCurrencies:string[]=[
    'INR','USD','GBP','JPY','AED','AFN','AMD','CAD','EUR', 'AUD'
  ];

  constructor( public currencyService:CurrencyServiceService) { 
    let data={
      base:'EUR',
      symbols:this.popularCurrencies.join(",")
    }

    // call to latest curreny for cards
    // this.getlatestData(data);     // uncomment to check

  }

  ngOnInit(): void {
  }

  getlatestData(data:any):any{
    this.currencyService.latestList(data).subscribe((res:any) => {
        if(res){
          this.latestyArray =res.rates;
          // console.log(this.currencyArray, 'this.currencyArray', typeof(this.currencyArray));
        }
    }); 
  }

}
