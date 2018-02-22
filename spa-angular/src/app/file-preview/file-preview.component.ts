import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../../node';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.css']
})
export class FilePreviewComponent implements OnInit {

  @Input() filePreviewUrl: string;
  filePreview: File;

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    this.getPreview();
  }

  getPreview(): void {
    this.nodeService.getFilePreview(this.filePreviewUrl)
      .subscribe(filePreview => {         
         this.filePreview = filePreview;
       });    
  }

  closePreview(): void{
    this.filePreview = null;
  }
}
