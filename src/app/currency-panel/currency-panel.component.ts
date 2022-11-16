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
    public router: Router) { 

      // call to currency data api
    this.getCurrencyData();   // uncomment to check
    

    if(this.router.url === '/'){
      this.model = {
        'amount':1,
        'fromCurrency':'EUR',
        'toCurrency':'GBP',
       
      }
      this.title ='Currency Exchange';
      // in home page default result
      this.getResult(this.model);   // uncomment to check  

    }else{        
      this.route.paramMap.subscribe((params:ParamMap) =>{
        this.model = {
          'amount':1,
          'fromCurrency':params.get('from'),
          'toCurrency':params.get('to'),
          
        }
        // get complete name for title in details page
        this.getName(this.model.fromCurrency);
        
        // in non home page default result
        this.getResult(this.model);    // uncomment to check
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
        }
    }); 
  }


  getName(title:string){
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
        this.default =res.result ;  

      }
   }); 

  }

  backClicked(){
    // this._location.back();
    this.router.navigate(['/']);
  }

  swpap(from:any, to:any){
    this.model = {
      'amount':this.model.amount,
      'fromCurrency':to,
      'toCurrency':from,
      
    }
    this.default = this.getResult(this.model);
  }
}
