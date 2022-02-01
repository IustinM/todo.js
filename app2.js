// declaring the variables
const inputTodo = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoContainer = document.querySelector('.todo-container');
const filterTodo = document.querySelector('.filter-todo')


// adding evenrs listeners


todoBtn.addEventListener('click',createTodo);
filterTodo.addEventListener('click' ,todoFilter);





// functions
function createTodo(e){
    e.preventDefault();
    const todo =  document.createElement('div');
    todo.classList.add('todo');
    todoList.appendChild(todo);
    const newTodo = document.createElement('li');
    newTodo.innerText = inputTodo.value;
    newTodo.classList.add('todo-item');
    todo.appendChild(newTodo);
    createButton(todo,'fa-check','complete-button')
    createButton(todo,'fa-trash','trash-button')
    inputTodo.value = ""
    
}

function createButton(todo,icon,Class){
    const button = document.createElement('button');
    button.innerHTML = `<i class="fas ${icon}"></i>`;
    button.classList.add(`${Class}`);
    todo.appendChild(button);
    button.addEventListener('click',deleteCheck);

}

function deleteCheck(e){
    const target = e.target;
    const todo = target.parentElement;
   
    if(target.classList[0] === 'complete-button'){
        todo.classList.toggle('completed')

    }else{
        todo.classList.toggle('fall');
        todo.addEventListener('transitionend' , function(){
            todo.remove();
        });
    }

}


function todoFilter(e){
    const todos = todoList.childNodes;
    console.log(todos)
    todos.forEach(todo =>{
         switch(e.target){
        case 'all':
            todo.style.display = "flex";
            break;
        case 'completed':
            if(todo.classList.contains('completed')){
                todo.style.display = "flex";
            }else{
                
                todo.style.display = "none";
            }
            break;
    }
    })
   
    
}