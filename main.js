let input = document.querySelector(".input")
let addBtn =document.querySelector(".add")
let tasksDiv = document.querySelector(".tasks")
let deleteAllBtn = document.querySelector("button")

let arrOfTasks = [];
// add tasks from local storage to array of task 
getDataFromLocalStorage()

addBtn.onclick = () => {
    // check if the input is not empty
    if (input.value != ""){
        // add tasks to array of tasks
        addTasksToArr(input.value)
        //clear input bar
        input.value = ""
    }
}

// delete btn from page and localS
tasksDiv.addEventListener("click", (e)=>{
    // delete button 
    if(e.target.classList.contains("del")){
        // delete task from the page
        e.target.parentElement.remove()
        // delete task from local storage
        deleteTaskFromLocalStorageWithId(e.target.parentElement.getAttribute("data-id"))
    }
    // toggle task status
    if (e.target.classList.contains("task")){
        toggleTaskStatus(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done")
    }
})

deleteAllBtn.onclick=()=>{
    if(tasksDiv.length != 0){
        tasksDiv.innerHTML = ""
        arrOfTasks = []; 
        addTasksToLocalStorageFrom(arrOfTasks)
    }
}

// FUNCTIONS

function addTasksToArr(inputValue){
    let task = {
        id: Date.now(),
        title: inputValue,
        completed: false ,
    }
    arrOfTasks.push(task)
    // add tasks from array of tasks to page 
    addTasksToPage(arrOfTasks)
    // add tasks from array of tasks to Local Storage 
    addTasksToLocalStorageFrom(arrOfTasks)

}

function addTasksToPage(arrOfTasks){
    tasksDiv.innerHTML = ""
    arrOfTasks.forEach((task)=>{
        // add task from arroftasks to page
        let div = document.createElement("div")
        div.className = "task"
        // Check If Task is Done
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id)
        div.appendChild(document.createTextNode(task.title))
        // add delete button 
        let deleteBtn = document.createElement("span")
        deleteBtn.appendChild(document.createTextNode("delete"))
        deleteBtn.classList.add("del")
    
        div.appendChild(deleteBtn)
        tasksDiv.appendChild(div)
    })

}

function addTasksToLocalStorageFrom(arrOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrOfTasks))
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks")

    if (data){
        arrOfTasks = JSON.parse(data)
    }
    addTasksToPage(arrOfTasks)
}

function deleteTaskFromLocalStorageWithId(taskId){
    arrOfTasks = arrOfTasks.filter((task)=> task.id != taskId)
    addTasksToLocalStorageFrom(arrOfTasks)
}

function toggleTaskStatus(taskId){
    for(let i = 0; i<arrOfTasks.length ; i++){
        if(arrOfTasks[i].id == taskId){
            arrOfTasks[i].completed == false ? (arrOfTasks[i].completed = true) : (arrOfTasks[i].completed = false)
        }
    }
    addTasksToLocalStorageFrom(arrOfTasks)
}