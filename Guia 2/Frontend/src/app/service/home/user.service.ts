import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http:HttpClient ) { }

  API:string = "http://localhost:8080/api/v1/user";

  findAllUsers(){
    return this.http.get<User[]>(this.API);
  }

  findAllUsersEncrypted(){
    return this.http.get<User[]>(this.API+"/encrypted");
  }

  findUserByUsername(username:string):Observable<any>{
    return this.http.get<User>(`${this.API}/${username}`);
  }

}
