import { Component, OnInit } from '@angular/core';
import { Node } from '../node';

@Component({
  selector: 'app-filetree',
  templateUrl: './filetree.component.html',
  styleUrls: ['./filetree.component.css']
})
export class FiletreeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
	
  selectedNode: Node;

	onSelect(node: Node): void {
  		this.selectedNode = node;
	}


  node: Node = {
  	path: "c:/Test/",
  	name: "file.txt",
  	type: "file",
  	elements: [
  		{ path: "c:/Test/Hello/", name: "name.txt", type: "file" }
  		{ path: "c:/Test/Hello/", name: "familyName.txt", type: "file" }
  		];
  }

}
