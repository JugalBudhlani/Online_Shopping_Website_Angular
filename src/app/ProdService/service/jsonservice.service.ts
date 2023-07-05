import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonserviceService {
  base_URL='http://localhost:3000/shirts';

  constructor(private http:HttpClient) { }

  getallUser()
  {
    return this.http.get(`${this.base_URL}`);
  }
}
