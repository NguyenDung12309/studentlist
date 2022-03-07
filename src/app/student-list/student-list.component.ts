import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Student } from '../Model/student';
import { StudentService } from '../service/student.service';

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.scss"],
})
export class StudentListComponent implements OnInit {
  studentList = [];
  searchForm: FormGroup;
  student: Student = new Student(1, "haiTT", "9/12/1999", 9);

  constructor(private studentService: StudentService, private router: Router) {
    //tương đương studentService = new StudentService //lấy giá trị từ service
    studentService.findAll().subscribe((next) => {
      this.studentList = next;
    });
    this.searchForm = new FormGroup({
      id: new FormControl(),
    });
  }

  ngOnInit(): void {}

  detailStudent(student: any) {
    this.router.navigate(["/student", student.id]);
    // this.student = student;
  }

  updateStudent(student: any) {
    this.router.navigate(["/student/update", student.id]);
    // this.student = student;
  }

  deleteStudent(student: any) {
    this.studentService.deleteStudent(student.id).subscribe(next => {
      this.studentService.findAll().subscribe((next) => {
        this.studentList = next;
      });
    })
    // this.student = student;
  }

  // createStudent(event: any) {
  //   this.studentService.createStudent(event)
  // }
  searchStudent() {
    this.studentService
      .searchStudent(this.searchForm.value)
      .subscribe((next) => {
        this.studentList = [];
        this.studentList.push(next);
      });
  }
}
