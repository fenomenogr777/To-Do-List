"use strict";
///////////////////// VARIABLES ///////////////////
const newTaskInputEL = document.querySelector(".new-task-input");
const newTaskBtn = document.querySelector(".new-task-submit");
const listContainer = document.querySelector(".lists");
const titleEL = document.querySelector(".title");
const footerYearEL = document.querySelector(".footer-year");
let titleHead = document.title;

///////////////////// CLASS ///////////////////
class AppCL {
  tasks = [];

  constructor() {
    ///////////////////// DYNAMIC YEAR TITTLE/FOOTER ///////////////////
    this.currentYear();

    ///////////////////// LOCALE STORAGE ///////////////////
    this.localStorage();

    ///////////////////// EVENT HANDLERS ///////////////////
    newTaskBtn.addEventListener("click", this.addNewTask.bind(this));
    listContainer.addEventListener("click", this.deleteTask.bind(this));
    listContainer.addEventListener("click", this.editTask.bind(this));
  }

  ///////////////////// ADD NEW TASK ///////////////////
  addNewTask(e) {
    e.preventDefault();
    const newTask = newTaskInputEL.value;
    if (!newTask) return;
    this.showTasks(this.tasks.length, newTask);
    newTaskInputEL.value = "";
    this.tasks.push(newTask);
    this.setLocaleStorage(this.tasks);
  }

  ///////////////////// DELETE TASK ///////////////////
  deleteTask(e) {
    const clicked = e.target;
    if (!clicked.classList.contains("delete")) return;
    const id = clicked.closest(".list").getAttribute("id");
    this.tasks.splice(id, 1);
    clicked.closest(".list").remove();
    this.setLocaleStorage(this.tasks);
  }

  ///////////////////// EDIT TASK ///////////////////
  editTask(e) {
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
      this.tasks[+id] = edit.value;
      this.setLocaleStorage(this.tasks);
    }
  }

  ///////////////////// LOCALE STORAGE GET ///////////////////
  localStorage() {
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    this.tasks = data;
    this.tasks.forEach((task, i) => {
      if (task == null) return;
      this.showTasks(i, task);
    });
  }

  ///////////////////// DYNAMIC YEAR TITTLE/FOOTER ///////////////////
  currentYear() {
    const currentYear = new Date().getFullYear();
    titleHead = `To Do List ${currentYear}`;
    titleEL.textContent = `To Do List ${currentYear}`;
    footerYearEL.textContent = `${currentYear}`;
  }

  showTasks(id, value) {
    const html = ` 
    <div class="list" id="${id}">
    <input type="text" class="text" value="${value}" readonly />
    <div class="actions">
    <button class="btn edit">Edit</button>
    <button class="btn delete">Delete</button>
    </div>
    </div>`;
    listContainer.insertAdjacentHTML("afterbegin", html);
  }
  setLocaleStorage(value) {
    localStorage.setItem("tasks", JSON.stringify(value));
  }
}

const app = new AppCL();
