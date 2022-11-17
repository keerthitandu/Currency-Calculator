import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CurrencyServiceService } from '../currency-service.service';
import { IModel } from '../shared/modelDto';

@Component({
  selector: 'app-currency-panel',
  templateUrl: './currency-panel.component.html',
  styleUrls: ['./currency-panel.component.css']
})
export class CurrencyPanelComponent  {
  currencyArray:string[]=[];
  result!:string;
  default!:any;

  title!:string;

  @Output() modelDataCreated = new EventEmitter<{ model: IModel }>();
  model!: IModel;

  constructor(public currencyService:CurrencyServiceService, public route:ActivatedRoute,
    public router: Router) { 

    // call to currency data api
    this.getCurrencyData();   // uncomment to check
    
    if(this.router.url === '/'){
      this.model = {
        'amount':1,
        'fromCurrency':'EUR',
        'toCurrency':'USD',       
      }
      this.title ='Currency Exchange';

      // in home page default result
      this.getResult(this.model);   // uncomment to check  

    }else{        
      this.route.paramMap.subscribe((params:any) =>{
        this.model = {
          'amount':params.get('amount'),
          'fromCurrency':params.get('from'),
          'toCurrency':params.get('to'),          
        }
       
        // in non home page default result
        this.getResult(this.model);    // uncomment to check
      });
    }
    
  }

  

  onModelUpdate() {
    this.modelDataCreated.emit({ model: this.model });
  }
  
  getCurrencyData():any{
    this.currencyService.getCurrencyList().subscribe((res:any) => {
        if(res){
          let data = res.symbols;
          this.currencyArray = data;

           // get complete name for title in details page
          if(this.router.url !== '/'){
            this.getName(this.model.fromCurrency);
          }
        }
    }); 
  }


  getName(title:any):any{
    this.title = this.currencyArray[title];
  }

  onSubmit():any{
    this.getResult(this.model);
  }

  onChange(event:any):any{
    if(event){
      this.default = 0;
    }
  }
  getResult(form:IModel):any{
    // return 10;
    let data = {
      to:form.toCurrency,
      from:form.fromCurrency,
      amount:form.amount
    }
    this.currencyService.getConvertedData(data).subscribe((res:any) => {
      if(res){  
        this.default =res.result ;          
        this.onModelUpdate();
      }
   }); 
   

  }

  backClicked():any{
    // this._location.back();
    this.router.navigate(['/']);
  }

  swpap(from:any, to:any):any{
    this.model = {
      'amount':this.model.amount,
      'fromCurrency':to,
      'toCurrency':from,
      
    }
     this.getResult(this.model);
  }
}
