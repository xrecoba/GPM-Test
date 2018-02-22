export class Node {
  path: string;  
  name: string;
  directory: boolean;
  elements: Node[];
  isExpanded: boolean;
  previewUrl: string;

  constructor() {
        this.isExpanded = false;
  }
}