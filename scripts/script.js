'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = [];

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
            item.completed = !item.completed;
            render();
        });

        const todoRemove = li.querySelector('.todo-remove');
        todoRemove.addEventListener('click', function() {
            // localStorage.removeItem('task');
            todoData.splice(item, 1);
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

if (localStorage.getItem('task')) {
    todoData.push(JSON.parse(localStorage.getItem('task')));
    }

render();