"use strict";

/////////////// DYNAMIC YEAR TITLE //////////////
const currentYear=new Date().getFullYear()
document.title=`To Do List ${currentYear}`
document.querySelector(".title").textContent=`To Do List ${currentYear}`
document.querySelector(".footer-year").textContent=`${currentYear}`



///////////////////// VARIABLES ///////////////////
const newTaskInputEL = document.querySelector(".new-task-input");
const newTaskBtn = document.querySelector(".new-task-submit");
const listContainer = document.querySelector(".lists");

///////////////////// ADD NEW TASK ///////////////////
const addNewTask = function (e) {
  e.preventDefault();
  const newTask = newTaskInputEL.value;
  if (!newTask) return;
  const html = ` <div class="list">
<input type="text" class="text" value="${newTask}" readonly />
<div class="actions">
  <button class="btn edit">Edit</button>
  <button class="btn delete">Delete</button>
</div>
</div>`;
  listContainer.insertAdjacentHTML("afterbegin", html);
  newTaskInputEL.value = "";
};

newTaskBtn.addEventListener("click", addNewTask);

//////////////////// DELETE TASK ///////////////////
const deleteTask = function (e) {
  const clicked = e.target;
  if (!clicked.classList.contains("delete")) return;
  clicked.closest(".list").remove();
};

listContainer.addEventListener("click", deleteTask);

//////////////////// EDIT TASK ///////////////////
const editTask = function (e) {
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
  }
};

listContainer.addEventListener("click", editTask);

//////////////////// EDIT TASK ///////////////////
