import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIS, API_BASEURL } from 'src/app/constant/app.constant';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private apiUrl = `${API_BASEURL}${APIS.logs}`;

  constructor(private http: HttpClient) {}

  log(level: string, message: string) {
    const logEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
    };
    return this.http.post(this.apiUrl, logEntry).subscribe((response) => {
      console.log(response);
    });
  }

  info(message: string) {
    this.log('info', message);
  }

  warn(message: string) {
    this.log('warn', message);
  }

  error(message: string) {
    this.log('error', message);
  }
}
