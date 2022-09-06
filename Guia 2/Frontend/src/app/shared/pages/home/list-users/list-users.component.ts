import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/home/user.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  username = localStorage.getItem('username');
  user!: User;
  userLevel: any;
  users:User[] = [];

  constructor(
    private service:UserService
  ) { }

  ngOnInit(): void {
    if(this.username != null){
      this.service.findUserByUsername(this.username)
      .subscribe(
        data => {
          this.user = data;
          this.userLevel = this.user.level;
        }
      );
    }

    setTimeout(() => {
      if(this.user.level == 0){
        this.service.findAllUsers()
        .subscribe(
          data => {
          this.users=data;
          console.log("Users: ",data);
        })
      } else {
        this.service.findAllUsersEncrypted()
        .subscribe(
          data => {
          this.users=data;
          console.log("Users: ", data);
        })
      }
    }, 100);
  }

}
