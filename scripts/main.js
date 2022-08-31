let form = document.querySelector('#form');
let textInput = document.querySelector('#textInput');
let msg = document.querySelector('#msg');
let tasks = document.querySelector('#tasks');
let textarea = document.querySelector('#textarea');
let dateInput = document.querySelector('#dateInput');
let add = document.querySelector('#add');

/// forma validation

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === '') {
        msg.innerHTML = 'Tasks cannot be blank'
        console.log('Failure');
    } else {
        console.log('Success');
        msg.innerHTML = '';
        acceptData();

        add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
    }
};

/// accept data 

let data = [];

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });
    localStorage.setItem('data', JSON.stringify(data));
    console.log(data);
    createTasks();
};

/// create tasks

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
      return (tasks.innerHTML += `
      <div id=${y} class="py-2 px-1 mb-3 animate__animated animate__bounce ">
            <span class="fw-bold">${x.text}</span>
            <span class="small"><em>${x.date}</em></span>
            <p>${x.description}</p>
    
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
  
    resetForm();
  };

  let resetForm = () => {
    textInput.value = '';
    dateInput.value = '';
    textarea.value = '';
  };

  ///// delete data

  let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
  
    data.splice(e.parentElement.parentElement.id, 1);
  
    localStorage.setItem("data", JSON.stringify(data));
  
    console.log(data);
  };

  ///edit data

  let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
  
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
  
    deleteTask(e);
  };

  // keep data in local storage

  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
  })();