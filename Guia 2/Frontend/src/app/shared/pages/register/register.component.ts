import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/home/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users:User[] = [];

  constructor(public router:Router, private service:UserService) { }

  ngOnInit(): void {
    this.service.findAllUsers()
    .subscribe( data => {
      this.users = data;
      console.log("Users: ", this.users);
      if(this.users.length == 0){
        alert("La tabla 'User' se encuentra vacia, por favor registre un usuario.")
        this.router.navigate(['signup']);
      }
    })
  }

  logIn():any{
    console.log("LogIn")
    this.router.navigate(['login']);
  }
  
  signUp():any{
    this.router.navigate(['signup']);
  }
}
