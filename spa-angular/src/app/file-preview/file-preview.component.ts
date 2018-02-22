import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../../node';
import { NodeService } from '../node.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.css']
})
export class FilePreviewComponent implements OnInit {


  @Input() filePreviewUrl: string;
  filePreview: File;
  subscription: Subscription;

  constructor(private nodeService: NodeService) { 
   this.subscription = nodeService.fileToPreview$.subscribe(
      file => {                        
        this.getPreview(file);
    })
  }

  ngOnInit() {
    this.getPreview(this.filePreviewUrl);
  }

  getPreview(file :string): void {
    this.nodeService.getFilePreview(file)
      .subscribe(filePreview => {         
         this.filePreview = filePreview;
       });    
  }

  closePreview(): void{
    this.filePreview = null;
  }
}
