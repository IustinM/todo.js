const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const userValue = document.querySelector('.username');
const userName = prompt('What is your name?');

console.log(userName.valueOf());
userValue.innerText = userName.valueOf();


todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

document.addEventListener('DOMContentLoaded', getTodos)
function addTodo(event) {
    // prevent form from submitting
    event.preventDefault();
    // creating our todo 
    // todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // add to do to local  storage
    saveLocalTodos(todoInput.value);
    // create buttons
    // check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-button')
    todoDiv.appendChild(completedButton);
    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-button')
    todoDiv.appendChild(trashButton);
    // tododiv append to child
    todoList.appendChild(todoDiv);
    todoInput.value = '';

}

function deleteCheck(event) {
    const item = event.target;
    //    delete button
    if (item.classList[0] === 'trash-button') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    if (item.classList[0] === 'complete-button') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }




}

function filterTodo(e) {

    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {

                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'none';
                } else {

                    todo.style.display = 'flex';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        // prevent form from submitting
        event.preventDefault();
        // creating our todo 
        // todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // add to do to local  storage
        // create buttons
        // check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-button')
        todoDiv.appendChild(completedButton);
        // trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-button')
        todoDiv.appendChild(trashButton);
        // tododiv append to child
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
