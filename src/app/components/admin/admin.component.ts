import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/api/api.service';
import { isNullOrUndefined } from 'util';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddTeacherComponent } from '../dialogs/add-teacher/add-teacher.component'

// models
import { Teacher } from '../../models/teacher.model';
import { Student } from '../../models/student.model';
import { EditTeacherComponent } from '../dialogs/edit-teacher/edit-teacher.component';

import { SelectionModel } from '@angular/cdk/collections';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { AddStudentComponent } from '../dialogs/add-student/add-student.component';
import { EditStudentComponent } from '../dialogs/edit-student/edit-student.component';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  faUserEdit = faUserEdit;
  // Пагинация
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // Настройка таблицы
  displayedColumnsTeachers: string[] = ['select', 'id', 'login', 'password', 'fio', 'items', 'edit'];
  displayedColumnsStudents: string[] = ['select', 'id', 'login', 'password', 'parents', 'phone', 'note', 'edit'];


  // Массивы
  public dataTeachers: Teacher[];
  public dataStudents: Student[];


  // Данные таблицы
  dataSourceTeachers = new MatTableDataSource<Teacher>(this.dataTeachers);
  dataSourceStudents = new MatTableDataSource<Student>(this.dataStudents);

  // checkbox
  selectionTeachers = new SelectionModel<Teacher>(true, []);
  selectionStudents = new SelectionModel<Student>(true, []);

  // Состояния кнопки "удалить выбранные"
  flagDeleteTeacher = true;
  flagDeleteStudent = true;

  constructor(
    public apiService: ApiService,
    public dialog: MatDialog) {
    this.selectionTeachers = new SelectionModel<Teacher>(true, []);
    this.selectionStudents = new SelectionModel<Student>(true, []);

  }

  // Загрузка данных с сервера
  async loadData() {
    // Учителя
    try {
      let data = this.apiService.getTeachers();
      this.dataTeachers = (isNullOrUndefined(await data)) ? [] : await data;
      console.log(this.dataTeachers);
      this.dataSourceTeachers = new MatTableDataSource<Teacher>(this.dataTeachers);

    }
    catch (err) {
      console.log(err);
    }
    // Ученики
    try {
      let data = this.apiService.getStudents();
      this.dataStudents = (isNullOrUndefined(await data)) ? [] : await data;
      console.log(this.dataStudents);
      this.dataSourceStudents = new MatTableDataSource<Student>(this.dataStudents);
    }
    catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {
    // Загрузка данных
    this.loadData();
    // Пагинация
    this.dataSourceTeachers.paginator = this.paginator;
    this.dataSourceTeachers.sort = this.sort;

    this.dataSourceStudents.paginator = this.paginator;
    this.dataSourceStudents.sort = this.sort;
  }

  // Переключение страницы
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTeachers.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTeachers.paginator) {
      this.dataSourceTeachers.paginator.firstPage();
    }
  }

  // Добавить учителя
  addTeacher(): void {
    const dialogRef = this.dialog.open(AddTeacherComponent);

    dialogRef.afterClosed().subscribe(result => {
      // Обновляем данные
      this.loadData();
    });
  }

  // Редактировать учителя
  editTeacher(row) {

    console.log(this.selectionTeachers.selected);
    const dialogRef = this.dialog.open(EditTeacherComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      // Редактирование учителя
      console.log('sds')
      // result.id = row.id;
      this.asyncEditTeacher(result);
    });
  }

  async asyncEditTeacher(result) {
    console.log(result);
    let data = this.apiService.editTeacher(result);
    data = (isNullOrUndefined(await data)) ? [] : await data;
    this.loadData();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selectionTeachers.selected.length;
    const numRows = this.dataSourceTeachers.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selectionTeachers.clear();
      this.flagDeleteTeacher = true;

    } else {
      this.flagDeleteTeacher = false;

      this.dataSourceTeachers.data.forEach(row => this.selectionTeachers.select(row));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Teacher): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selectionTeachers.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  changeCheckBox(event) {
    if (this.selectionTeachers.selected.length !== 0) {
      this.flagDeleteTeacher = false;
    } else {
      this.flagDeleteTeacher = true;
    }
  }

  // Удалить выбранных учителей
  async deleteTeacher() {
    let id = [];
    console.log(this.selectionTeachers.selected);
    for (let i = 0; i < this.selectionTeachers.selected.length; i++) {
      id.push(this.selectionTeachers.selected[i].id);
    }
    console.log(id.join(','));
    let data = this.apiService.deleteTeacher(id);
    data = (isNullOrUndefined(await data)) ? [] : await data;

    this.loadData();
  }

  // Добавить ученика
  addStudent(): void {
    const dialogRef = this.dialog.open(AddStudentComponent);

    dialogRef.afterClosed().subscribe(result => {
      // Обновляем данные
      this.loadData();
    });
  }

  // Редактировать ученика
  editStudent(row) {

    console.log(this.selectionStudents.selected);
    const dialogRef = this.dialog.open(EditStudentComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      // Редактирование учителя
      console.log('sds')
      // result.id = row.id;
      this.asyncEditStudent(result);
    });
  }

  async asyncEditStudent(result) {
    console.log(result);
    let data = this.apiService.editStudent(result);
    data = (isNullOrUndefined(await data)) ? [] : await data;
    this.loadData();
  }


  changeCheckBox2(event) {
    if (this.selectionStudents.selected.length !== 0) {
      this.flagDeleteStudent = false;
    } else {
      this.flagDeleteStudent = true;
    }
  }

  // Удалить выбранных учеников
  async deleteStudent() {
    let id = [];
    console.log(this.selectionStudents.selected);
    for (let i = 0; i < this.selectionStudents.selected.length; i++) {
      id.push(this.selectionStudents.selected[i].id);
    }
    console.log(id.join(','));
    let data = this.apiService.deleteStudent(id);
    data = (isNullOrUndefined(await data)) ? [] : await data;

    this.loadData();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected2() {
    const numSelected = this.selectionStudents.selected.length;
    const numRows = this.dataSourceStudents.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle2() {
    if (this.isAllSelected2()) {
      this.selectionStudents.clear();
      this.flagDeleteStudent = true;

    } else {
      this.flagDeleteStudent = false;

      this.dataSourceStudents.data.forEach(row => this.selectionStudents.select(row));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel2(row?: Student): string {
    if (!row) {
      return `${this.isAllSelected2() ? 'select' : 'deselect'} all`;
    }
    return `${this.selectionStudents.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
