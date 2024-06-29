import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentServiceService } from '../student-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {
  studentForm: FormGroup;
  submitted : boolean = false;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private studentService: StudentServiceService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<StudentFormComponent>
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      course: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.studentForm.valid) {
      this.isLoading = true;

      setTimeout(() => {
        this.studentService.addStudent(this.studentForm.value);
      this.snackBar.open('Student added successfully', 'Close', {
        duration: 2000,
      });
       this.isLoading = false;
      this.dialogRef.close(true); // Return true to indicate successful submission
      }, 2000);
      
    }
  }

  onClose() {
    this.dialogRef.close(false); // Return false to indicate cancellation
  }
}


