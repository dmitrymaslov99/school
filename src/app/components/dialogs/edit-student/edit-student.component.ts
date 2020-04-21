import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api/api.service';
import { isNullOrUndefined } from 'util';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Teacher } from '../../../models/teacher.model'
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {


  itemForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) { }


  ngOnInit() {
    this.initForm();
    console.log(this.data);
    this.initFormData();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editTeacher() {
    this.data = this.itemForm.value;
    this.dialogRef.close();
  }

  initFormData() {
    this.itemForm.patchValue({
      id: this.data.id,
      login: this.data.login,
      password: this.data.password,
      fio: this.data.fio,
      parents: this.data.parents,
      phone: this.data.phone,
      note: this.data.note,

    });
  }

  initForm() {
    this.itemForm = new FormGroup({
      id: new FormControl(null),
      login: new FormControl(null),
      password: new FormControl(null),
      fio: new FormControl(null),
      parents: new FormControl(null),
      phone: new FormControl(null),
      note: new FormControl(null)
    });
  }

}
