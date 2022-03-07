import { StudentInfoComponent } from './student-info/student-info.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentUpdateComponent } from './student-update/student-update.component';


const routes: Routes = [
  {path: "", component: StudentListComponent},
  {path: "student/create", component: StudentCreateComponent},
  {path: "student/:id", component: StudentInfoComponent},
  {path: "student/update/:id", component: StudentUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
