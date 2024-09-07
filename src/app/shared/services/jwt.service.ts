import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  tokenGetter(): string {
    return localStorage.getItem('access_token') || '';
  }
}
