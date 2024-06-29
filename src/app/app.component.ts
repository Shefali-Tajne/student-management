import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-management';
  students: any[] = [];
  editIndex: number | null = null;

  addStudent(student: any) {
    if (this.editIndex !== null) {
      this.students[this.editIndex] = student;
      this.editIndex = null;
    } else {
      this.students.push(student);
    }
  }

  editStudent(student: any) {
    this.editIndex = this.students.indexOf(student);
    // Populate the form with the student data
  }
}
