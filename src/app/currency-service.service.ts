import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { catchError, map, Observable, throwError } from 'rxjs';

import { shareReplay } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CurrencyServiceService {
   // Define API
   apiURL = 'https://api.apilayer.com/fixer';
  
  constructor(private http: HttpClient ) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey':'T9hVLt6PVxHyMxaeUKOYYS4i6JnVPl4m'
    }),
  };

  // generic get Method
  getMethod(url:string): Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + url, 
    {headers:this.httpOptions.headers})
    .pipe(shareReplay(), catchError(this.handleError));
  }


  // HttpClient API get() method => Fetch currency list
  getCurrencyList(): Observable<any[]> {
    return this.getMethod('/symbols');
  }
 
  getConvertedData(req:any): Observable<any[]> {
    return this.getMethod('/convert?to=' + req.to + '&from=' + req.from + '&amount=' + req.amount);
  }

  latestList(req:any): Observable<any[]>  {    
    return this.getMethod('/latest?symbols='+ req.symbols +'&base='+req.base);
  }

  getMapData(req:any): Observable<any[]> { 
    return this.getMethod('/timeseries?start_date='+ req.start_date +'&end_date='+ req.end_date +'&symbols='+ req.symbols +'&base='+req.base);
  }
  
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
