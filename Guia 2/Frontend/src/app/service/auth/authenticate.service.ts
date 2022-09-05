import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/model/user';
import { UserLogin } from 'src/app/shared/model/user-login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor( private http:HttpClient ) { }

  API:string = "http://localhost:8080/api/v1/user";

  saveUser(user:User):Observable<any>{
    return this.http.post<User>(this.API, user);
  }

  authenticateUser(userLogin:UserLogin):Observable<any>{
    return this.http.post<UserLogin>(this.API+"/authenticate", userLogin);
  }
}
