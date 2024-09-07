import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL: string = environment.apiURL;

  constructor(private http: HttpClient, private router: Router) {}

  login(params: { emailAddress: string; password: string }) {
    return this.http.post<any>(`${this.apiURL}/api/account/login`, params);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
