"use strict";

///////////////////// VARIABLES ///////////////////
const newTaskInputEL = document.querySelector(".new-task-input");
const newTaskBtn = document.querySelector(".new-task-submit");
const listContainer = document.querySelector(".lists");
const titleEL = document.querySelector(".title");
const footerYearEL = document.querySelector(".footer-year");
let titleHead = document.title;

///////////// DYNAMIC YEAR TITLE/FOOTER ///////////
const currentYear = new Date().getFullYear();
titleHead = `To Do List ${currentYear}`;
titleEL.textContent = `To Do List ${currentYear}`;
footerYearEL.textContent = `${currentYear}`;

///////////////////// ADD NEW TASK ///////////////////

class AppCL {
  tasks = [];

  constructor() {
    this.localStorage();
    newTaskBtn.addEventListener("click", this.addNewTask.bind(this));
    listContainer.addEventListener("click", this.deleteTask.bind(this));
    listContainer.addEventListener("click", this.editTask.bind(this));
  }

  addNewTask(e) {
    e.preventDefault();
    const newTask = newTaskInputEL.value;
    if (!newTask) return;

    const html = ` <div class="list" id="${this.tasks.length}">
  <input type="text" class="text" value="${newTask}" readonly />
  <div class="actions">
    <button class="btn edit">Edit</button>
    <button class="btn delete">Delete</button>
  </div>
  </div>`;
    listContainer.insertAdjacentHTML("afterbegin", html);
    newTaskInputEL.value = "";
    this.tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  deleteTask(e) {
    const clicked = e.target;
    if (!clicked.classList.contains("delete")) return;
    const id = clicked.closest(".list").getAttribute("id");
    this.tasks.splice(id, 1);
    clicked.closest(".list").remove();
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  editTask(e) {
    let newText = document.querySelector(".text").value;
    const clicked = e.target;
    if (!clicked.classList.contains("edit")) return;

    if (clicked.innerText.toLowerCase() === "edit") {
      const edit = clicked.closest(".list").firstElementChild;
      edit.removeAttribute("readonly");
      edit.focus();
      clicked.innerText = "Save";
      clicked.style.background = "#be4bdb";
      edit.style.color = "rgba(33, 37, 41, 0.8)";
    } else if (clicked.innerText.toLowerCase() === "save") {
      const edit = clicked.closest(".list").firstElementChild;
      edit.setAttribute("readonly", true);
      clicked.innerText = "Edit";
      edit.style.color = " #212529";
      clicked.style.background = "#4c6ef5";
      const id = clicked.closest(".list").getAttribute("id");
      clicked.closest(".list").firstElementChild.setAttribute("value", newText);
      
    }
  }

  localStorage() {
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(data);
    this.tasks = data;
    this.tasks.forEach((task, i) => {
      if (task == null) return;
      const html = ` <div class="list" id="${i}">
      <input type="text" class="text" value="${task}" readonly />
      <div class="actions">
      <button class="btn edit">Edit</button>
      <button class="btn delete">Delete</button>
      </div>
      </div>`;
      listContainer.insertAdjacentHTML("afterbegin", html);
    });
  }
}

const app = new AppCL();