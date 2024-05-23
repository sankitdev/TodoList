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
  });
  li.appendChild(checkbox);
  li.appendChild(document.createTextNode(taskText));
  todoList.appendChild(li);
  ellipsisIcon(li);
}

function ellipsisIcon(li) {
  const threedot = document.createElement("span");
  threedot.classList.add("menu");
  threedot.style.userSelect = "none";
  threedot.innerHTML = "&#xEF78";
  li.appendChild(threedot);
  const limenu = taskMenu(li);
  showMenu(threedot, limenu);
}

function taskMenu(limenu) {
  const menu = document.createElement("div");
  menu.style.transition = " opacity 0.4s ease";
  menu.style.userSelect = "none";
  menu.style.display = "none";
  menu.classList.add("actions", "flex");
  menu.innerHTML = ` <button class="edit-btn menu-btn btn">Edit</button> <button class="delete-btn btn menu-btn">Delete</button>`;
  limenu.appendChild(menu);
  return menu;
}

function showMenu(threedot, menu) {
  function show() {
    menu.style.display = "block";
  }

  function hide() {
    if (!menu.matches(":hover")) {
      // Only hide if NOT hovering over the menu
      menu.style.display = "none";
    }
  }
  threedot.addEventListener("mouseover", show);
  threedot.addEventListener("mouseleave", hide);
  menu.addEventListener("mouseleave", hide);
}

// todoList.addEventListener("click", (event) => {
//   if (event.target.nodeName === "LI") {
//     event.target.remove();
//   }
// });
