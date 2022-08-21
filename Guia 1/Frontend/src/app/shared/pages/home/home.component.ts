import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = localStorage.getItem('username');
  list:boolean = true;

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  listUsers():any{
    this.list = true;
  }
  
  registerUser():any{
    this.list = false;
  }

  exit():any{
    this.router.navigate([""]);
  }

}
