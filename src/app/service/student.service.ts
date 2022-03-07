import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Model/student';

@Injectable({
  providedIn: "root",
})
export class StudentService {
  public apiURL = "http://localhost:3000/students";
  studentList = [];

  constructor(private http: HttpClient) {
    this.studentList.push(new Student(1, "haiTT", "9/12/1999", 9));
    this.studentList.push(new Student(2, "trungDP", "12/12/1999", 8));
    this.studentList.push(new Student(3, "trungDC", "12/12/1999", 7));
    this.studentList.push(new Student(4, "chienTM", "12/12/1999", 6));
  }

  createStudent(value: Student): Observable<any> {
    return this.http.post<any>(this.apiURL, value);
  }

  findAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiURL);
  }

  findById(id: number) {
    for (let studentObj of this.studentList) {
      if (studentObj.id == id) {
        return studentObj;
      }
    }
    return null;
  }

  searchStudent(value: any): Observable<any> {
    return this.http.get<any>(this.apiURL + "/" + value.id);
  }

  searchStudentId(id: any): Observable<any> {
    return this.http.get<any>(this.apiURL + "/" + id);
  }

  updateStudent(value: Student): Observable<Student> {
    return this.http.patch<Student>(this.apiURL + "/" + value.id,value);
  }

  deleteStudent(id: any): Observable<Student> {
    return this.http.delete<Student>(this.apiURL + "/" + id);
  }
}
