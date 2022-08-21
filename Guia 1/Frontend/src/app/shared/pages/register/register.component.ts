import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  logIn():any{
    console.log("LogIn")
    this.router.navigate(['login']);
  }
  
  signUp():any{
    this.router.navigate(['signup']);
  }
}
