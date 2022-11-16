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

  
  constructor(private http: HttpClient ) {
    
    
   }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey':'T9hVLt6PVxHyMxaeUKOYYS4i6JnVPl4m'
    }),
  };

  // HttpClient API get() method => Fetch currency list
  getCurrencyList(): Observable<any[]> {
    return this.http
      .get<any[]>(this.apiURL + '/symbols', {headers:this.httpOptions.headers})
      .pipe(map((res: any) => {       
        return res;
      }), catchError(this.handleError));
  }

 

  getConvertedData(req:any): Observable<any[]> {
    return this.http
      .get<any[]>(this.apiURL + '/convert?to=' + req.to + '&from=' + req.from + '&amount=' + req.amount,
       {headers:this.httpOptions.headers})
      .pipe( catchError(this.handleError));
  }


  latestList(req:any): Observable<any[]> {
    return this.http
      .get<any[]>(this.apiURL + '/latest?symbols='+ req.symbols +'&base='+req.base ,
       {headers:this.httpOptions.headers})
      .pipe(shareReplay(), catchError(this.handleError));
  }


  getMapData(req:any): Observable<any[]> {
    // console.log(req,'reqreq')
    return this.http.get<any[]>(this.apiURL + '/timeseries?start_date='+ req.start_date +'&end_date='+ req.end_date +'&symbols='+ req.symbols +'&base='+req.base, 
    {headers:this.httpOptions.headers})
    .pipe(shareReplay(), catchError(this.handleError));
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
