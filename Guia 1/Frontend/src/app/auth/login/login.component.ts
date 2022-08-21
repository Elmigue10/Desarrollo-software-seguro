import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/service/auth/authenticate.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  formGroup: FormGroup;
  title = 'appBootstrap';
  @ViewChild('mymodal') mymodal: ElementRef | undefined;
  closeResult = '';

  constructor(private modalService: NgbModal, 
        public form:FormBuilder,
        public router:Router,
        public service:AuthenticateService) {

          this.formGroup = this.form.group({
                  username:[''],
                  password:['']
                })
          
        }

  ngAfterViewInit(): void {
    this.open(this.mymodal);
  }

  ngOnInit(): void {}

  login():any{
        console.log(this.formGroup.value);
        this.service.authenticateUser(this.formGroup.value)
        .subscribe(
          data => {
            console.log(data);
            if(data){
              localStorage.setItem("username", this.formGroup.value.username);
              alert("Login user..."); 
              this.modalService.dismissAll();
              this.router.navigate(['home'])
            }
          }
        )
      }

  goBack():any{
    this.router.navigate([""]);
  }

  open(content: any) {
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
