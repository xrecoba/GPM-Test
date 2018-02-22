import { Component } from '@angular/core';
import { NodeService } from './node.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GMT file explorer';
  previewFile: string;  
  subscription: Subscription;

  constructor(private nodeService: NodeService) {
    this.subscription = nodeService.fileToPreview$.subscribe(
      file => {
        this.previewFile = file;           
    });
  }  
}
