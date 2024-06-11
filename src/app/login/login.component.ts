import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: String;
  password: String;

  constructor( 
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    localStorage.setItem("user1",JSON.stringify(""));
    localStorage.setItem("user2",JSON.stringify(""));
    throw new Error('Method not implemented.');


  }


  login(){
    console.log(this.userName);

      if(this.userName.length==5)
        {
          localStorage.setItem("user1",JSON.stringify(this.userName));
          this.router.navigate(['add-user']);
        }
        else{
          localStorage.setItem("user2",JSON.stringify(this.userName));

          this.router.navigate(['view-user']);

        }
  }

}

