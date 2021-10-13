import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  constructor(private _http: HttpClient) {}

  getUserList() {
    return this._http.get('https://jsonplaceholder.typicode.com/users');
  }
  getUserInfo(name) {
    return this._http.get(
      `https://jsonplaceholder.typicode.com/users?username=${name}`
    );
  }
  getPost(id) {
    return this._http.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    );
  }
  getAlbum(id) {
    return this._http.get(
      `https://jsonplaceholder.typicode.com/albums?userId=${id}`
    );
  }
}
