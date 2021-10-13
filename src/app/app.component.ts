import { Component, OnInit, VERSION } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  public data;
  public postList;
  public albumList;
  constructor(private _service: AppService) {}
  ngOnInit(): void {
    this._service.getUserList().subscribe((x: any) => {
      this.data = x;
      console.log(x);
    });
  }
  getData(user) {
    this._service
      .getUserInfo(user.username)
      .pipe(
        map((user) => {
          return user[0].id;
        }),
        mergeMap((id) => {
          const post = this._service.getPost(id);
          const album = this._service.getAlbum(id);
          return forkJoin([post, album]);
        })
      )
      .subscribe((response) => {
        this.postList = response[0];
        this.albumList = response[1];
      });
  }
}
