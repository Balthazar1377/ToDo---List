'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

if(localStorage.getItem("task")) {
    todoData = JSON.parse(localStorage.getItem('task'));
}

function render () {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    headerInput.value = '';

    todoData.forEach(function(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' +
        '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
        '</div>';

        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoCompleted = li.querySelector('.todo-complete');
        btnTodoCompleted.addEventListener('click', function() {
            if(item.completed === false) {
            item.completed = true;
            localStorage.setItem('task', JSON.stringify(todoData));
            } else {
            item.completed = !item.completed;
            localStorage.setItem('task', JSON.stringify(todoData));
            }
            render();
        });

        const todoRemove = li.querySelector('.todo-remove');
        todoRemove.addEventListener('click', function() {
            todoData.splice(item, 1);
            localStorage.setItem('task', JSON.stringify(todoData));
            render();
        });

    });
}
todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    const newTodo = {
        value: headerInput.value,
        completed:  false
    };
    if(newTodo.value !== '') {
        todoData.push(newTodo);
        localStorage.setItem('task', JSON.stringify(todoData)); 
    }
    render();
});

render();