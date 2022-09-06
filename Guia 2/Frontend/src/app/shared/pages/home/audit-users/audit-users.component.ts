import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/home/user.service';
import { User } from 'src/app/shared/model/user';
import { AuditUser } from 'src/app/shared/model/audit-user';
import { AuditUserService } from 'src/app/service/home/audit-user.service';

@Component({
  selector: 'app-audit-users',
  templateUrl: './audit-users.component.html',
  styleUrls: ['./audit-users.component.css']
})
export class AuditUsersComponent implements OnInit {

  username = localStorage.getItem('username');
  user!: User;
  userLevel: any;
  auditUsers: AuditUser [] = [];

  constructor(
    private userservice:UserService,
    private auditUserService:AuditUserService
  ) { }

  ngOnInit(): void {

    if(this.username != null){
      this.userservice.findUserByUsername(this.username)
      .subscribe(
        data => {
          this.user = data;
          this.userLevel = this.user.level;
        }
      );
    }

    setTimeout(() => {
      this.auditUserService.findAllAuditUsers()
      .subscribe(
        data => {
        this.auditUsers = data;
        console.log("Audit Users: ",data);
      })
    }, 100);

  }

}
