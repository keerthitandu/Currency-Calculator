import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CurrencyServiceService } from '../currency-service.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-currency-panel',
  templateUrl: './currency-panel.component.html',
  styleUrls: ['./currency-panel.component.css']
})
export class CurrencyPanelComponent implements OnInit {
  currencyArray:any=[];
  model: any = {};
  result:any;
  default:any;

  title!:any;
  constructor(public currencyService:CurrencyServiceService, public route:ActivatedRoute,
    public router: Router, private _location: Location) { 
    // this.getCurrencyData();
    

    if(this.router.url === '/'){
      this.model = {
        'amount':1,
        'fromCurrency':'EUR',
        'toCurrency':'GBP',
       
      }
      this.title ='Currency Exchange';
      // console.log('home');
      // this.default = this.getResult(this.model);
    }else{
      // console.log('not   home');
     

      this.route.paramMap.subscribe((params:ParamMap) =>{
        this.model = {
          'amount':1,
          'fromCurrency':params.get('from'),
          'toCurrency':params.get('to'),
          
        }
        console.log(this.model.fromCurrency, 'this.modelthis.model');
        this.getName(this.model.fromCurrency);
        
        // this.default = this.getResult(this.model);
      });
    }
    
  }

  ngOnInit(): void {
  }
  getCurrencyData(){
    this.currencyService.getCurrencyList().subscribe((res:any) => {
        if(res){
          let data = res.symbols;
          this.currencyArray = data;
          // this.currencyArray = Object.keys(data);
          // console.log(this.currencyArray, 'this.currencyArray');
        }
    }); 
  }


  getName(title:string){
    // console.log(title, typeof(title));
    this.title = this.currencyArray[title];
    // console.log(this.title, 'this.titlethis.title ')
  }

  onSubmit(){
  // console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
    this.result = this.getResult(this.model);
  }


  getResult(form:any){
    // return 10;
    let data = {
      to:form.toCurrency,
      from:form.fromCurrency,
      amount:form.amount
    }
    this.currencyService.getConvertedData(data).subscribe((res:any) => {
      if(res){       
        return res.result;
      }
   }); 

  }

  backClicked(){
    this._location.back();
  }
}
