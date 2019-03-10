import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoApiResponse } from '../models/GoApiResponse';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  constructor(private http: HttpClient) { }

  getServiceUpdate(): Observable<GoApiResponse> {
    const SERVICE_UPDATES_URL = environment.apiBase + '/Api/ServiceUpdate/en/all';
    return this.http.get(SERVICE_UPDATES_URL) as Observable<GoApiResponse>;
  }
}
