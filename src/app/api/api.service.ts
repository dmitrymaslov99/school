import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends RestService {
  options: HttpHeaders;

  constructor(public http: HttpClient) {
    super(http);
    this.options = new HttpHeaders();
    this.options = this.options.set('Content-Type', 'application/json');
  }


  // Авторизация
  async autorizationAdmin() {
    return this.get('admin', this.options).toPromise();
  }

  async autorizationTeacher(data) {
    return this.post('teacher', data, this.options).toPromise();
  }

  async autorizationStudent(data) {
    return this.post('student', data, this.options).toPromise();
  }

  // Данные GET
  async getTeachers() {
    return this.get('teachers', this.options).toPromise();
  }

  async getStudents() {
    return this.get('students', this.options).toPromise();
  }

  // Данные POST
  async addTeacher(data) {
    return this.post('add/teacher', data, this.options).toPromise();
  }

  async addStudent(data) {
    return this.post('add/student', data, this.options).toPromise();
  }

  async editTeacher(data) {
    return this.post('edit/teacher', data, this.options).toPromise();
  }

  async editStudent(data) {
    return this.post('edit/student', data, this.options).toPromise();
  }

  async deleteTeacher(data) {
    return this.post('delete/teacher', data, this.options).toPromise();
  }

  async deleteStudent(data) {
    return this.post('delete/student', data, this.options).toPromise();
  }

}
