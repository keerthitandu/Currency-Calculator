import { Component, OnInit } from '@angular/core';
import { CurrencyServiceService } from './currency-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  constructor(public currencyService:CurrencyServiceService) {}
  
 

}
