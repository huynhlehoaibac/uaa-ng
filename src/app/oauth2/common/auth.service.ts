import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookie: CookieService) {}

  login(data: any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });


    return this.http.post(`${environment.apiUrl}/auth/login`, formData, {
      observe: 'response',
      withCredentials: true,
    });
  }

  abc(): Observable<any> {
    return this.http.get('/api/auth/login');
  }
}
