import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../constants/app-constants';

@Injectable({
  providedIn: 'root'
})
export class PdfViewService {

  constructor(private http: HttpClient) { }

  public showPdfFile(variantNumber: string) {
    return this.http.post(API_URLS.PDF_SHOW_URL, { variantNumber }).pipe(
      // tap((data) => console.log(data)),
      // map((data: any[]) => {

      // }),
      // tap((data) => console.log(data))
      
    );
  }
  public showVideoFile(variantNumber: string) {
    return this.http.post(API_URLS.VIDEO_SHOW_URL, { variantNumber }).pipe(
      
    );
  }

}
