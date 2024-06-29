import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models';
import { StudentServiceService } from '../student-service.service';
import { StudentFormComponent } from '../student-form/student-form.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent {
  displayedColumns: string[] = ['id', 'name', 'age', 'gender', 'course', 'actions'];
  students: Student[] = [];
  dataSource = new MatTableDataSource<Student>();
  editingStudent: Student | null = null;
  editForm: FormGroup ;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(
    private studentService: StudentServiceService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {

    this.editForm = this.fb.group({
      id: new FormControl(),
      name: new FormControl(),
      age: new FormControl(),
      gender: new FormControl(),
      course: new FormControl()
    });
  }

  ngOnInit() {
    this.refreshTable();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  refreshTable() {
    this.students = this.studentService.getStudents();
    this.dataSource.data = this.students;
  }

  openStudentForm() {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshTable(); // Refresh the table data after form is closed
        this.cdr.detectChanges(); // Manually trigger change detection
      }
    });
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id);
    this.refreshTable();
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  startEdit(student: Student) {
    this.editingStudent = { ...student };
    this.editForm.setValue({
      id: student.id,
      name: student.name,
      age: student.age,
      gender: student.gender,
      course: student.course
    });
  }

  saveEdit() {
    if (this.editForm.valid) {
      this.studentService.editStudent(this.editForm.value);
      this.editingStudent = null;
      this.refreshTable();
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }

  cancelEdit() {
    this.editingStudent = null;
  }
  get name(): FormControl {
    return this.editForm.get('name') as FormControl;
  }

  get age(): FormControl {
    return this.editForm.get('age') as FormControl;
  }

  get gender(): FormControl {
    return this.editForm.get('gender') as FormControl;
  }

  get course(): FormControl {
    return this.editForm.get('course') as FormControl;
  }
  }

