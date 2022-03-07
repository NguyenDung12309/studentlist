import { StudentService } from './../service/student.service';
import { Student } from './../Model/student';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: "app-student-create",
  templateUrl: "./student-create.component.html",
  styleUrls: ["./student-create.component.scss"],
})
export class StudentCreateComponent implements OnInit {
  student: Student = new Student(0, "linhDN", "1999-12-4", 3);
  // @Output() submitCreate = new EventEmitter();
  studentForm: FormGroup;

  constructor(private studentService: StudentService, private router: Router) {
    this.studentForm = new FormGroup({
      id: new FormControl("", [Validators.required]), //tham số đầu tiên là giá trị mặc định
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
      dateOfBirth: new FormControl(),
      point: new FormControl("", this.validateCustomPoint), //custom validate
    });
  }

  validateCustomPoint(point: AbstractControl) {
    let value = point.value;
    if (value <= 0) {
      return {
        invalid0: true,
      };
    } else {
      return null;
    }
  }

  ngOnInit(): void {}

  // createStudent(registerForm:NgForm) {
  //   console.log(registerForm)
  //   if(registerForm.valid) {
  //     this.submitCreate.emit(registerForm.value);
  //     // this.student = new Student(0, "linhDN", "1999-12-4", 3);
  //   }
  // }

  // createStudent(){
  //   console.log(this.studentForm.value);
  //   this.submitCreate.emit(this.studentForm.value)
  // }

  createStudent() {
    this.studentService.createStudent(this.studentForm.value).subscribe(next => {
          this.router.navigate([""]);
    });
  }
}
