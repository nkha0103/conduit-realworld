import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  dataUrl = 'https://conduit.productionready.io/api/tags';

  constructor(private http: HttpClient) { }

  getTag() {
    return this.http.get(this.dataUrl);
  }
}