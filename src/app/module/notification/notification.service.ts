import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Project, ProjectStatus} from "../../../shared/model/project";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private readonly httpClient: HttpClient) {
  }

  markAsReceived() {
    return this.httpClient.put<string>(`${environment.url}/notifications/mark-as-received`, {})
  }

  markAsRead(id?: string) {
    console.log(id)
    if (id) {
      return this.httpClient.put<string>(`${environment.url}/notifications/mark-as-read/${id}`, {})
    }
    return this.markAsReadAll()
  }

  markAsReadAll() {
    return this.httpClient.put<string>(`${environment.url}/notifications/mark-as-read`, {})
  }

  deleteNotification(id: string) {
    return this.httpClient.delete<string>(`${environment.url}/notifications/${id}`)
  }

}
