import { StudentService } from './../service/student.service';
import { Student } from './../Model/student';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-student-info",
  templateUrl: "./student-info.component.html",
  styleUrls: ["./student-info.component.scss"],
})
export class StudentInfoComponent implements OnInit {
  @Input() student: any;

  constructor(private activatedRoute: ActivatedRoute, StudentService: StudentService) {
    this.activatedRoute.paramMap.subscribe(
      next => {
        const id = next.get("id");
        this.student = StudentService.findById(Number(id));
      }, error => {}
    )
  }

  ngOnInit(): void {}

  changeNameStudent(event: any) {
    this.student.name = event.target.value;
  }
}
