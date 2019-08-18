import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { MainService } from '../share/main.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

declare var ts2js_fileinput: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  showERROR: boolean;
  errorStr: string;
  showSucces: boolean;
  succesStr: string;
  constructor(private mainService: MainService, public router: Router) {
  }
  senduser() {
    this.mainService.login(this.user, (err, user) => {
      console.log(user);
      if (!err) {
        console.log(user);
        this.showERROR = false;
        this.showSucces = true;
        this.succesStr = 'Login Successed.';
        window.location.reload();
      }
      else {
        this.showERROR = true;
        this.showSucces = false;
        this.errorStr = err.message;
        console.log(err.error);
      }
    })
  }
  ngOnInit() {
    if (this.mainService.isLogin()) {
      if (this.mainService.getUserType())
        this.router.navigate(['professor']);
      else
        this.router.navigate(['student']);
    }
    this.user = { name: '', lastname: '', email: '', password: '', userStatus: true };
    new ts2js_fileinput("fileinput", { 'required': true, 'showCancel': false });
  }
}


