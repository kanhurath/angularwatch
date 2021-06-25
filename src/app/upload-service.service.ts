import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {

  constructor(private http:HttpClient) { }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
 
    formdata.append('file', file);
 
    const req = new HttpRequest('POST', '/post', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }
}
