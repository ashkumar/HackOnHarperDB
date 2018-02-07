import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class HarperDbService {

  resURL : any;
  result : string;

  constructor(private http: Http) { }

  public getInitialFormValue (id : string) : Observable<any> {
    let resIdUrl = this.resURL + '&p_p_resource_id=%2Fpangong%2Freadharper';
     return this.http.post(resIdUrl, id)
         .map(this.extractData)
		     .catch(this.handleErrorObservable);
  }

  public getResult(): any {
    return this.result
  }

  public saveForm(val: string, valid: boolean) : Observable<any>{
     let resIdUrl = this.resURL + '&p_p_resource_id=%2Fpangong%2FharperForm';
    return this.http.post(resIdUrl, val)
         .map(this.extractData)
		     .catch(this.handleErrorObservable);
  }

  public setResourceURL(url: string){
    this.resURL = url;
  }

  private extractData(res: Response) {
     	let body = res.json();
    	return body;
  } 

  private handleErrorObservable (error: Response | any) {
    	console.error(error.message || error);
    	return Observable.throw(error.message || error);
  } 
}
