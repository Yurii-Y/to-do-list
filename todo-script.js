
const addTaskInput = document.getElementById('add-input');
const addTaskBtn = document.getElementById('add-task');
const tasksBox = document.querySelector('.task-list');
const claerAll = document.querySelector('.clear-btn');

//main container get item
let todos;
localStorage.todos ? todos = JSON.parse(localStorage.getItem('todos')) : todos = [];

//addition variables to edit
let editId;
let isEditedTask = false;

//Create constructor
function Task(frominput) {
  this.frominput = frominput;
  this.isDone = false;
};

//Events listener
addTaskBtn.addEventListener('click', addTodo);
claerAll.addEventListener('click', deleteAll);


//I don't know how to get the knots from tasksBox without using the method appendChild при створенні createTemplate();

// const filterOption = document.querySelector(".filter-todo");
// filterOption.addEventListener("click", filterTodo);
// function filterTodo(e) {
//     let i = Array.from(tasksBox.children)
//     const todo = i.childNodes;
//     console.log(todo)
//     console.log(todo)
//     todo.forEach(function (t) {
//       switch (e.target.value) {
//         case "all":
//           t.style.display = "flex";
//           console.log(t)
//           break;
//         case "completed":
//             console.log(t)
//           if (t.classList.contains("completed")) {
//             t.style.display = "flex";
//             console.log(t)
//           } else {
//             t.style.display = "none";
//           }
//           break;
//         case "incomplete":
//           if (!t.classList.contains("completed")) {
//             t.style.display = "flex";
//           } else {
//             t.style.display = "none";
//           }
//           break;
//       }
//     });
//   }

//Main function
function addTodo() {
  if(isEditedTask) {
    isEditedTask = false;
    todos[editId].frominput = addTaskInput.value;
  } else {
    todos.push(new Task(addTaskInput.value));
  }

    pushLocStorage();
    tasksShow();
    addTaskInput.value = '';
};

function tasksShow(filter) {
    let li = '';
    if(todos) {
        todos.forEach((item, index) => {
          li += createTemplate(item, index);
        });
    }
    tasksBox.innerHTML = li || `<span>You don't have any task heare yet</span>`;    
};
tasksShow();

//set item into localstorage
function pushLocStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
};

//show label whith edit delete
function showMenu(selectTask) {
    let taskMenu = selectTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectTask) {
            taskMenu.classList.remove("show"); 
        }
    });
};

//delete all createTemplate
function deleteAll() {
    todos.splice(0, todos.length);
    pushLocStorage();
    tasksShow();
};

//function insert in tasksShow
function createTemplate(task, index) {
    return `
        <li class="description-task">
            <label for="${index}">
                <input onclick="updateStatus(this)" type="checkbox" id="${index}" ${task.isDone ? 'checked' : ''}>
                <p class="${task.isDone ? 'checked' : ''}">${task.frominput}</p>
            </label>
            <div class="settings">
                <i onclick="showMenu(this)" class="fas fa-ellipsis-h"></i>
                <ul class="ul-menu">
                    <li onclick="editTask(${index}, '${task.frominput}')"><i class="fas fa-pencil-alt"></i>Edit</li>
                    <li onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i>Delete</li>
                </ul>
            </div>
        </li>
    `
};

// additional function to createTemplate
function updateStatus(selectTask) {
    let textFromInput = selectTask.parentElement.lastElementChild;
    if(selectTask.checked) {
        textFromInput.classList.add('checked');
        todos[selectTask.id].isDone = true;
    } else {
        textFromInput.classList.remove('checked');
        todos[selectTask.id].isDone = false;
    }
    pushLocStorage();
};

function editTask(taskId, taskFromInput) {
    editId = taskId;
    isEditedTask = true;
    addTaskInput.value = taskFromInput;
};

function deleteTask(deleteId) {
  todos.splice(deleteId, 1);
  pushLocStorage();
  tasksShow(); 
}
//new


