import { Injectable } from '@angular/core';
import { Node } from '../node';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class NodeService {

  constructor(private http: HttpClient) { }

  private fileToPreviewSource = new Subject<string>();
  fileToPreview$ = this.fileToPreviewSource.asObservable();

  announceFileToPreview(fileToPreview: string) {
    this.fileToPreviewSource.next(fileToPreview);
  }

  getNodes(dirUrl: string): Observable<Node[]> {
     return this.http.get<Node[]>(dirUrl)
  }  

  getFilePreview(url: string): Observable<File> {
     return this.http.get<File>(url)
  }
}
