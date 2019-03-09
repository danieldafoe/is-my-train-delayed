import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoApiResponse } from '../models/GoApiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  constructor(private http: HttpClient) { }

  getServiceUpdate(): Observable<GoApiResponse> {
    const SERVICE_UPDATES_URL = 'https://api.gotransit.com/Api/ServiceUpdate/en/all';
    return this.http.get(SERVICE_UPDATES_URL) as Observable<GoApiResponse>;
  }
}
