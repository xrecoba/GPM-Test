export class Node {  
  name: string;
  directory: boolean;
  elements: Node[];
  isExpanded: boolean;
  previewUrl: string;
  dirUrl: string;

  constructor() {
        this.isExpanded = false;
  }
}