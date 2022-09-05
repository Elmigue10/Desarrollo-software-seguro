import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/service/auth/authenticate.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/service/home/user.service';
import { HttpResponse } from '@angular/common/http';
import { first } from 'rxjs';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  formGroup: FormGroup;
  username = localStorage.getItem('username');
  user!: User;
  userLevel: any;

  constructor( 
    public form:FormBuilder,
    public router:Router,
    public service:AuthenticateService,
    public userService:UserService) {

      this.formGroup = this.form.group({
              document:[''],
              username:[''],
              email:[''],
              password:[''],
              level:[''] 
            })
      
    }

  ngOnInit(): void {
    if(this.username != null){
      this.userService.findUserByUsername(this.username)
      .subscribe(
        data => {
          this.user = data;
          this.userLevel = this.user.level;
        }
      );
    }
  }

  registerUser():any{
    console.log(this.formGroup.value);
    this.service.saveUser(this.formGroup.value)
    .pipe(first())
    .subscribe(
    (data: HttpResponse<any>) => {
        alert("Registered user...");
        this.formGroup.reset();
      }
    )
  }

}
