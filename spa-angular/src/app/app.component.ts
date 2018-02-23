import { Component, OnInit, Input} from '@angular/core';
import { NodeService } from './node.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {  
  previewFile: string;  
  rootUrl: string;
  subscription: Subscription;
  @Input() rootNode: string;
  rootNodeIsSet: boolean;

  constructor(private nodeService: NodeService) {
    this.rootNode = "c:/"    
    this.subscription = nodeService.fileToPreview$.subscribe(
      file => {        
        this.previewFile = file;           
    });
  }  

  ngOnInit() {    
    this.rootNodeIsSet = false;
  }

  setRootNode()
  {        
    this.rootUrl = "http://localhost:3000/dir?path=" + this.rootNode;
    this.rootNodeIsSet = true;
  } 
}
