import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AccountlookupService {
  constructor(private http: HttpClient) {}

  accountLookup(username: string): Observable<string> {
    return this.http.post<string>(
      `${environment.apiUrl}/lookup/accountlookup`,
      {
        username,
      }
    );
  }
}
