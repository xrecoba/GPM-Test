export class Node {
  path: string;  
  name: string;
  directory: boolean;
  elements: Node[];
  isExpanded: boolean;

  constructor() {
        this.isExpanded = false;
  }
}