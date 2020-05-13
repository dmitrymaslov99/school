import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

Injectable({
  providedIn: 'root'
})

export interface Teachers {
  id: number;
  login: string;
  password: string;
  fio: string;
  items: string;
}


export class RestService {

  private baseUrl = 'http://localhost:3000/';
  private popupDialog = new ReplaySubject<{ popupEvent: string, component?, options?: {} }>();

  public popupDialog$ = this.popupDialog.asObservable();

  open(component, options?: {}) {
    this.popupDialog.next({ popupEvent: 'open', component: component, options: options });
  }

  close() {
    this.popupDialog.next({ popupEvent: 'close' });
  }
  constructor(public http: HttpClient) {
  }

  private getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }

  public get(url: string = '', header: HttpHeaders): Observable<any> {
    let requestOptions = {
      headers: header
    };
    return this.http.get(this.getUrl(url), requestOptions);
  }


  public post(url: string = '', data, header: HttpHeaders): Observable<any> {
    let requestOptions = {
      headers: header
    };
    return this.http.post(this.getUrl(url), data, requestOptions);
  }

  public put(url: string = '', data: any = {}, header: HttpHeaders): Observable<any> {
    let requestOptions = {
      headers: header
    };
    return this.http.put(this.getUrl(url), data, requestOptions);
  }

  public delete(url: string = '', header: HttpHeaders): Observable<any> {
    let requestOptions = {
      headers: header
    };
    return this.http.delete(this.getUrl(url), requestOptions);
  }

}
