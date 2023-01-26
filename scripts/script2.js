"use strict"
const listsEL=document.querySelector(".lists")
const addTaskBtn=document.querySelector(".new-task-submit")
const inputNewTaskEL=document.querySelector(".new-task-input")

class AppCL{
 id;
 tasks=[]
  constructor(){
  
  addTaskBtn.addEventListener("click",this.addNewtask.bind(this))

  }
  
  addNewtask(e){
    e.preventDefault()
    this.id=Date.now()
    this.tasks=inputNewTaskEL.value
    const html =`<div class="list" id=${this.id}>
    <input type="text" class="text" value="${this.tasks}" readonly />
    <div class="actions">
      <button class="btn edit">Edit</button>
      <button class="btn delete">Delete</button>
    </div>
  </div>`
   
listsEL.insertAdjacentHTML("afterbegin",html)

  }






}






const app=new AppCL()

console.log(app)