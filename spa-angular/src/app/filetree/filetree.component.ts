import { Component, OnInit } from '@angular/core';
import { Node } from '../node';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-filetree',
  templateUrl: './filetree.component.html',
  styleUrls: ['./filetree.component.css']
})
export class FiletreeComponent implements OnInit {

  nodes : Node[];  
  selectedNode: Node;

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    this.getNodes();
  }

	onSelect(node: Node): void {
  		this.selectedNode = node;
	}

  getNodes(): void {
    this.nodes = this.nodeService.getNodes();
  }
}
