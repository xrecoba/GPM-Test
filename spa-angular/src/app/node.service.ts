import { Injectable } from '@angular/core';
import { Node } from '../node';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class NodeService {

  constructor() { }

  getNodes(): Observable<Node[]> {
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
