import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuditUser } from 'src/app/shared/model/audit-user';

@Injectable({
  providedIn: 'root'
})
export class AuditUserService {

  constructor( private http:HttpClient ) { }

  API:string = "http://localhost:8080/api/v1/user-audit";

  findAllAuditUsers(){
    return this.http.get<AuditUser[]>(this.API);
  }
}
