import { Injectable } from '@angular/core';
import { Student } from './models';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  private students: Student[] = [];
  private idCounter = 1;
  private localStorageKey = 'students';

  constructor() {
    this.loadStudents();
  }

  private loadStudents() {
    const storedStudents = localStorage.getItem(this.localStorageKey);
    this.students = storedStudents ? JSON.parse(storedStudents) : [];
  }
  getStudents(): Student[] {
    return this.students;
  }

  addStudent(student: Student) {
    student.id = this.generateId();
    this.students.push(student);
    this.saveStudents();
  }
  saveStudents() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.students));
  }
  deleteStudent(id: number) {
    this.students = this.students.filter(student => student.id !== id);
    this.saveStudents();
  }

  editStudent(updatedStudent: Student) {
    const index = this.students.findIndex(student => student.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
      this.saveStudents();
    }
  }
  private generateId(): number {
    return this.students.length ? Math.max(...this.students.map(student => student.id)) + 1 : 1;
  }
}
