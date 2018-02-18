export class Node {
  path: string;  
  name: string;
  type: string;
  elements: Node[];
  isExpanded: boolean;

  constructor() {
        this.isExpanded = false;
  }
}