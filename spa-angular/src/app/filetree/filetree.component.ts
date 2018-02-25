import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../../node';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-filetree',
  templateUrl: './filetree.component.html',
  styleUrls: ['./filetree.component.css']
})

export class FiletreeComponent implements OnInit {

  @Input() path: string;
  nodes : Node[];  
  selectedNode: Node;

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    this.getNodes();
  }

	onSelect(node: Node): void {
      this.selectedNode = node;
      node.isExpanded = !node.isExpanded;

      if (node.isExpanded) {
        this.getChildNodes(node);
      }  		
	}

  getNodes(): void {
    this.nodeService.getNodes("dir")
      .subscribe(nodes => this.nodes = nodes);    
  }

  getChildNodes(node: Node): void {
    this.nodeService.getNodes("dir")
      .subscribe(nodes => node.elements = nodes);    
  }
}
