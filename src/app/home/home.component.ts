import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyServiceService } from '../currency-service.service';
import { IModel } from '../shared/modelDto';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latestyArray:any=[]=[];
  base!:string;
  amount!:string;
  toC!:string;
  popularCurrencies:string[]=[
    'INR','USD','GBP','JPY','AED','AMD','CAD','EUR', 'AUD'
  ];
  
  constructor( public currencyService:CurrencyServiceService,  public router: Router) { }

  ngOnInit(): void {
  }

  onBookAdded(eventData: any) {
    this.base = eventData.model.fromCurrency;
    this.amount = eventData.model.amount;
    this.toC = eventData.model.toCurrency;

    if(this.router.url === '/'){
      let data={
        base:this.base,
        symbols:this.popularCurrencies.join(",")
      }
  
      // call to latest curreny for cards
      this.getlatestData(data);     // uncomment to check
    }
    
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
