import { Injectable } from '@angular/core';
import { Node } from '../node';

@Injectable()
export class NodeService {

  constructor() { }

  getNodes(): Node[] {
    return [
      { path: "c:/AAAA/", name: "name.txt", type: "file", elements: [
        { path: "c:/AAAA/Hello/", name: "name.txt", type: "file" },
        { path: "c:/AAAA/Hello/", name: "familyName.txt", type: "file" }
      ] },
      { path: "c:/BBBB/Hello/", name: "familyName.txt", type: "file", elements: [
        { path: "c:/BBBB/Hello/", name: "name.txt", type: "file" },
        { path: "c:/BBBB/Hello/", name: "familyName.txt", type: "file" }
      ] }
      ];
  }
}
