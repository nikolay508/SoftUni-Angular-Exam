import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from './types/activity';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getSingleCourse(id: string) {
    return this.http.get<Activity>(`/api/courses/${id}`);
  }

  getCourses() {
    return this.http.get<Activity[]>(`/api/courses`);
  }

  createCourse(
    title: string,
    startDate: string,
    price: string,
    imageUrl: string,
    description: string
  ) {
    const payload = { title, startDate, price, imageUrl, description };
    return this.http.post<Activity>(`/api/create`, payload);
  }

  editCourse(
    id: string,
    title: string,
    startDate: string,
    price: string,
    imageUrl: string,
    description: string
  ) {
    const payload = { title, startDate, price, imageUrl, description };
    return this.http.put<Activity>(`/api/courses/${id}`, payload);
  }

  deleteCourse(id: string) {
    return this.http.delete(`/api/courses/${id}/delete`);
  }

  signOutCourse(courseId: string, userId: string | null) {
    const payload = { userId };
    return this.http.put(`/api/courses/${courseId}/sign`, payload);
  }
}
