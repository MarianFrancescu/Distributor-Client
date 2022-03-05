import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'http://localhost:8080/';

  private userID: string = '';
  private token: string = '';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const url = `${this.apiURL}login`;
    const loginObservable = this.http.post(url, {
      email,
      password
    });
    return loginObservable;
  }

  register(email: string, firstName: string, lastName: string, password: string){
    const url = `${this.apiURL}registerUser`;
    return this.http.post(url, {
      email,
      firstName,
      lastName,
      password
    });
  }

  getUser(userID) {
    const url = `${this.apiURL}user/${userID}`;
    return this.http.get(url, {})
  }
}