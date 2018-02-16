import { Injectable } from '@angular/core';
import { Node } from '../node';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NodeService {

  constructor(private http: HttpClient) { }

  private nodesApiUrl = 'http://localhost:3000/dir';  // URL to web api

  getNodes(): Observable<Node[]> {
     return this.http.get<Node[]>(this.nodesApiUrl)
  }

  getHardCodedNodes(): Observable<Node[]> {
    return of([
      { path: "c:/AAAA/", name: "name.txt", type: "file", elements: [
        { path: "c:/AAAA/Hello/", name: "name.txt", type: "file" },
        { path: "c:/AAAA/Hello/", name: "familyName.txt", type: "file" }
      ] },
      { path: "c:/BBBB/Hello/", name: "familyName.txt", type: "file", elements: [
        { path: "c:/BBBB/Hello/", name: "name.txt", type: "file" },
        { path: "c:/BBBB/Hello/", name: "familyName.txt", type: "file" }
      ] }
      ]);
  }
}
