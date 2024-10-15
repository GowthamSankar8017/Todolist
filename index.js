const taskinput = document.getElementById("taskinput");
const addbtn = document.getElementById("addbtn");
const todolist = document.getElementById("todolist");

document.addEventListener("DOMContentLoaded", () => {
  loadtask();
});
//adding function to addbtn
addbtn.addEventListener("click", addtask);

function addtask() {
  const task = taskinput.value.trim();

  if (task !== "") {
    createElement(task);
    taskinput.value = "";

    savetask();
  } else {
    alert("enter a task");
  }
}

function createElement(task) {
  const listitem = document.createElement("li");

  listitem.textContent = task;

  todolist.appendChild(listitem);

  //
  const deletebtn = document.createElement("button");

  deletebtn.textContent = "Delete";
  deletebtn.className = "deletebtn";

  listitem.appendChild(deletebtn);

  deletebtn.addEventListener("click", () => {
    todolist.removeChild(listitem);
    savetask();
  });

  listitem.addEventListener("click", () => {
    listitem.classList.toggle("strike");
  });
}

todolist.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addtask();
  }
});

//local storage

function savetask() {
  let tasks = [];
  todolist.querySelectorAll("li").forEach((item) => {
    tasks.push(item.textContent.replace("Delete", "").trim());
  });

  localStorage.setItem("hobby", JSON.stringify(tasks));
}

function loadtask() {
  const storedval = JSON.parse(localStorage.getItem("hobby")) || [];
  storedval.forEach(createElement);
}
