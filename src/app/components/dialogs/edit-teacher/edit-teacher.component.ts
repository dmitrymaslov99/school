import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api/api.service';
import { isNullOrUndefined } from 'util';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Teacher } from '../../../models/teacher.model'

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss']
})
export class EditTeacherComponent implements OnInit {

  itemForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Teacher
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
      items: this.data.items
    });
  }

  initForm() {
    this.itemForm = new FormGroup({
      id: new FormControl(null),
      login: new FormControl(null),
      password: new FormControl(null),
      fio: new FormControl(null),
      items: new FormControl(null)
    });
  }
}
