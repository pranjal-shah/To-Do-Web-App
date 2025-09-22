const inputTask = document.querySelector('#inputFieldId');
const addButton = document.querySelector('#addButton');
const deleteAll = document.querySelector('#deleteAll');
const itemCount = document.querySelector('#count');
const taskText = document.querySelector('.text');
const todoTaskList = document.querySelector('.todoTaskList');
let taskList = localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : [];


window.addEventListener('DOMContentLoaded', () => {
    displayTasks();
    addButton.addEventListener('click', addTask);
    inputTask.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    })
    deleteAll.addEventListener('click', deleteAllTasks);
})


function displayTasks() {
    if (taskList.length === 0) {
        itemCount.textContent = '0';
        todoTaskList.innerHTML = '';
        const p = document.createElement('p');
        p.className = 'defaultText';
        p.textContent = 'No tasks available';
        todoTaskList.appendChild(p);
    }
    else {
        itemCount.textContent = taskList.length;
        todoTaskList.innerHTML = '';
        taskList.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'todoTask';
            li.innerHTML = `
            <input type="checkbox" id="checkBoxId${index}" class="checkbox" ${task.completed ? 'checked' : ''}>
            <label for="checkBoxId${index}">${task.completed ? `<i class="fa-solid fa-check"></i>` : ''}</label>
            <p class="${task.completed ? 'checkedText' : 'text'}">${task.text}</p>
            <button class="deleteButton" data-index="${index}"><i class="fa-solid fa-xmark"></i></button>
            `;
            todoTaskList.appendChild(li);
        })
    }
};


function addTask() {
    const inputTaskValue = inputTask.value.trim();
    inputTask.value = '';
    if (inputTaskValue !== '') {
        const Task = {
            text: inputTaskValue.toUpperCase(),
            completed: false
        };
        taskList.push(Task);
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }
    displayTasks();
};


todoTaskList.addEventListener('change', (event) => {
    if (event.target.className === 'checkbox') {
        const index = event.target.id.replace('checkBoxId', '');
        taskList[index].completed = event.target.checked;
        localStorage.setItem('taskList', JSON.stringify(taskList));
        displayTasks();
    };
});


todoTaskList.addEventListener('click', (event) => {
    const deleteBtn = event.target.closest('.deleteButton');
    if (deleteBtn) {
        const index = deleteBtn.dataset.index;
        taskList.splice(index, 1);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        displayTasks();
    };
});

function deleteAllTasks() {
    taskList = [];
    localStorage.removeItem('taskList');
    displayTasks();
};