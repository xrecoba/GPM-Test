import {Todo} from './todo';
import {File} from './file';

    export class App {
      heading = "Todos";
      fileHeading = "Files";
      todos: Todo[] = [];
      todoDescription = '';

      addTodo() {
        if (this.todoDescription) {
          this.todos.push(new Todo(this.todoDescription));
          this.todoDescription = '';
        }
      }

      removeTodo(todo) {
        let index = this.todos.indexOf(todo);
        if (index !== -1) {
          this.todos.splice(index, 1);
        }
      }
    }