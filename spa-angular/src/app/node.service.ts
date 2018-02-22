import { Injectable } from '@angular/core';
import { Node } from '../node';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class NodeService {

  constructor(private http: HttpClient) { }

  private nodesApiUrl = 'http://localhost:3000/';  // URL to web api

  private fileToPreviewSource = new Subject<string>();
  fileToPreview$ = this.fileToPreviewSource.asObservable();

  announceFileToPreview(fileToPreview: string) {
    this.fileToPreviewSource.next(fileToPreview);
  }

  getNodes(path: string): Observable<Node[]> {
     return this.http.get<Node[]>(this.nodesApiUrl + "dir?path=" + path)
  }

  getNodeChilds(path: string): Observable<Node[]> {
     return this.http.get<Node[]>(this.nodesApiUrl + path)
  }

  getFilePreview(url: string): Observable<File> {
     return this.http.get<File>(url)
  }
}
