import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentTableComponent } from './student-table/student-table.component';

const routes: Routes = [
  { path: 'form', component: StudentFormComponent },
  { path: 'student-list', component: StudentTableComponent },
  { path: '', redirectTo: '/form', pathMatch: 'full' },
  { path: '', redirectTo: '/student-list', pathMatch: 'full' }, // Default path redirecting to 'form'
  { path: '**', redirectTo: '/student-list' } // 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
