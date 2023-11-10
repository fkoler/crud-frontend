import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  API_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  get(url: string) {
    return this.httpClient.get(`${this.API_URL}/${url}`);
  }

  post(url: string, data: Object) {
    return this.httpClient.post(`${this.API_URL}/${url}`, data);
  }

  put(url: string, data: Object) {
    return this.httpClient.put(`${this.API_URL}/${url}`, data);
  }

  delete(url: string) {
    return this.httpClient.delete(`${this.API_URL}/${url}`);
  }
}
