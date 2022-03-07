import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from './../service/student.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Student } from '../Model/student';

@Component({
  selector: "app-student-update",
  templateUrl: "./student-update.component.html",
  styleUrls: ["./student-update.component.scss"],
})
export class StudentUpdateComponent implements OnInit {
  student: Student;
  updateForm: FormGroup;
  id: string;
  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe(
      (next) => {
        this.id = next.get("id");
        studentService.searchStudentId(this.id).subscribe((next) => {
          this.student = next;
          this.updateForm = new FormGroup({
            id: new FormControl(this.student.id),
            name: new FormControl(this.student.name),
            dateOfBirth: new FormControl(this.student.dateOfBirth),
            point: new FormControl(this.student.point),
          });
        });
      },
      (error) => {}
    );
  }

  ngOnInit(): void {}

  updateStudent() {
    this.studentService.updateStudent(this.updateForm.value).subscribe(
      (next) => {
        console.log(next);
        this.router.navigate([""]);
      },
      (error) => {
        console.log("co loi");
      }
    );
  }
}
