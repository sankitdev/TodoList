const todoList = document.querySelector("#todoList"); //ul
const todoInput = document.querySelector("#todoInput");
const addButton = document.querySelector("#addButton");

addButton.addEventListener("click", () => {
  const inputVal = todoInput.value.trim();
  if (inputVal) {
    createTaskElement(inputVal);
    todoInput.value = "";
  } else {
    alert("Enter Something");
  }
});

function createTaskElement(taskText) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("click", () => {
    li.classList.toggle("check");
    //Add logic of completed task and save to local Storage
  });

  li.appendChild(checkbox);
  li.appendChild(document.createTextNode(taskText));
  todoList.appendChild(li);
}

todoList.addEventListener("click", (event) => {
  if (event.target.nodeName === "LI") {
    event.target.remove();
  }
});
