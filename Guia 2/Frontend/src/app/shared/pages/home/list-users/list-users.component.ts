import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/home/user.service';
import { User } from 'src/app/shared/model/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  username = localStorage.getItem('username');
  user!: User;
  userToUpdate!: User;
  userLevel: any;
  users:User[] = [];
  title = 'appBootstrap';
  @ViewChild('mymodal') mymodal: ElementRef | undefined;
  closeResult = '';
  formGroup: FormGroup;

  constructor(
    private service:UserService,
    private modalService: NgbModal,
    public form:FormBuilder,
    private router:Router
  ) { 
    this.formGroup = this.form.group({
      userId:[''],
      document:[''],
      username:[''],
      email:['']
    })
  }

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

  updateUser(user:User){
    this.service.updateUser(user)
    .subscribe( () => {
      alert("Updated user...");
      window.location.reload();
    });
  }

  deleteUser(user:User){
    this.service.deleteUser(user)
    .subscribe( () => {
      alert("Deleted user...");
      this.users = this.users.filter( u => u !== user);
    });
  }

  open(content: any, user:User) {
    this.service.findUserByUsername(user.username)
    .subscribe(data => this.userToUpdate = data);

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
