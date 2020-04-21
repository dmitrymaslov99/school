import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autorization',
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.scss']
})
export class AutorizationComponent implements OnInit {

  public login: string;
  public password;
  public loginType = "admin";

  constructor(
    public apiService: ApiService,
    public router: Router) { }

  ngOnInit(): void {
    // this.loginType = "Администратор";
  }

  async autorizationAdmin() {
    try {
      let data = this.apiService.autorizationAdmin();
      data = (isNullOrUndefined(await data)) ? [] : await data;
      data = data[0];
      if (this.login == data["login"] && this.password == data["password"]) {
        console.log("accept)");
        return true;
      }
      else {
        alert("Неправильный логин или пароль")
      }
    } catch (err) {
      console.log(err);
    }
  }

  async autorizationTeacher() {
    try {
      let req = {
        login: this.login,
        password: this.password
      }
      let data = this.apiService.autorizationTeacher(req);
      data = (isNullOrUndefined(await data)) ? [] : await data;
      console.log(data);
      if (data["res"]) {
        console.log("accept)");
      }
      else {
        alert("Неправильный логин или пароль")
      }
    } catch (err) {
      console.log(err);
    }
  }

  async autorizationStudent() {
    try {
      let req = {
        login: this.login,
        password: this.password
      }
      let data = this.apiService.autorizationStudent(req);
      data = (isNullOrUndefined(await data)) ? [] : await data;
      console.log(data);
      if (data["res"]) {
        console.log("accept)");

      }
      else {
        alert("Неправильный логин или пароль")
      }
    } catch (err) {
      console.log(err);
    }
  }

  async autorization() {
    console.log(this.login);
    console.log(this.password);
    console.log(this.loginType);

    // Авторизация администратора
    if (this.loginType == "admin") {
      if (this.autorizationAdmin()) {
        this.router.navigate(['/admin']);
      }
    }

    // Авторизация учителя
    if (this.loginType == "teacher") {
      this.autorizationTeacher();
    }

    // Авторизация ученика
    if (this.loginType == "student") {
      this.autorizationStudent();
    }
  }
}
