import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Node } from '../../node';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-filetree',
  templateUrl: './filetree.component.html',
  styleUrls: ['./filetree.component.css']
})

export class FiletreeComponent implements OnInit {

  @Input() dirUrl: string;

  nodes : Node[];  
  selectedNode: Node;    

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    this.getNodes();    
  }

	onSelect(node: Node): void {
      this.selectedNode = node;
	}

  toogle(node: Node): void {
    node.isExpanded = !node.isExpanded;
    if (node.isExpanded) {
        this.getChildNodes(node);
      }
  }

  getNodes(): void {
    this.nodeService.getNodes(this.dirUrl)
      .subscribe(nodes => {         
         for (let n of nodes) {
           n.isExpanded = false;
          }
          this.nodes = nodes;
       });    
  }

  getChildNodes(node: Node): void {
    this.nodeService.getNodes(this.dirUrl)
      .subscribe(nodes => node.elements = nodes);    
  }
 
  previewFile (node: Node): void {          
    this.nodeService.announceFileToPreview(node.previewUrl);      
  }
}
