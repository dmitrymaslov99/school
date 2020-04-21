import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api/api.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  itemForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddStudentComponent>,
    public apiService: ApiService) { }

  ngOnInit(): void {
    this.initForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async addTeacher() {
    console.log(this.itemForm.value);
    let data = this.apiService.addStudent(this.itemForm.value);
    data = (isNullOrUndefined(await data)) ? [] : await data;
    this.dialogRef.close();
  }

  initForm() {
    this.itemForm = new FormGroup({
      login: new FormControl(null),
      password: new FormControl(null),
      fio: new FormControl(null),
      parents: new FormControl(null),
      phone: new FormControl(null),
      note: new FormControl(null)
    });
  }
}
