const todoList = document.querySelector("#todoList"); //ul
const todoInput = document.querySelector("#todoInput");
const addButton = document.querySelector("#addButton");
const earsebtn = document.querySelector(".ri-eraser-line");

addButton.addEventListener("click", () => {
  const inputVal = todoInput.value.trim();
  if (inputVal) {
    createTaskElement(inputVal);
    todoInput.value = "";
  } else {
    alert("Enter Something");
  }
});

function createTaskElement(inputVal, isComplete = false) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isComplete; // by default false
  checkbox.addEventListener("click", () => {
    li.classList.toggle("check");
  });
  li.appendChild(checkbox);
  const taskSpan = document.createElement("span");
  taskSpan.textContent = inputVal;
  li.appendChild(taskSpan);

  // li.appendChild(document.createTextNode(taskText));
  if (isComplete) {
    li.classList.add("check");
  }
  todoList.appendChild(li);
  ellipsisIcon(li, taskSpan);
}

function ellipsisIcon(li, taskSpan) {
  const threedot = document.createElement("span");
  threedot.classList.add("menu");
  threedot.style.userSelect = "none";
  threedot.innerHTML = "&#xEF78";
  li.appendChild(threedot);
  const limenu = taskMenu(li, taskSpan);
  showMenu(threedot, limenu);
}

function taskMenu(limenu, taskSpan) {
  const menu = document.createElement("div");
  menu.style.transition = " opacity 0.4s ease";
  menu.style.userSelect = "none";
  menu.style.display = "none";
  menu.classList.add("actions", "flex");
  menu.innerHTML = ` <button class="edit-btn menu-btn btn">Edit</button> <button class="delete-btn btn menu-btn">Delete</button>`;
  limenu.appendChild(menu);
  buttonInteract(limenu, menu, taskSpan);
  return menu;
}

function buttonInteract(limenu, menu, taskSpan) {
  const editBtn = menu.querySelector(".edit-btn");
  const deleteBtn = menu.querySelector(".delete-btn");

  editBtn.addEventListener("click", () => {
    editTask(taskSpan);
  });

  deleteBtn.addEventListener("click", () => {
    limenu.remove();
  });
}

function editTask(taskSpan) {
  const currentText = taskSpan.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.style.width = "100px";

  taskSpan.replaceWith(input);

  input.addEventListener("blur", () => {
    taskSpan.textContent = input.value;
    input.replaceWith(taskSpan);
  });

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      taskSpan.textContent = input.value;
      input.replaceWith(taskSpan);
    }
  });
  input.focus();
}

function showMenu(threedot, menu) {
  let hideTimeout;

  // Function to show the menu
  function show() {
    clearTimeout(hideTimeout);
    menu.style.display = "block";
  }

  // Function to hide the menu
  function hide() {
    hideTimeout = setTimeout(() => {
      if (!menu.matches(":hover") && !threedot.matches(":hover")) {
        menu.style.display = "none";
      }
    }, 500);
  }

  // Use pointer events for showing the menu
  threedot.addEventListener("pointerenter", show); // Show menu on hover
  threedot.addEventListener("click", show); // Show menu on click (for mobile)

  // Use touch events for hiding the menu on touch devices
  document.addEventListener("touchstart", (event) => {
    const isClickOutside =
      !menu.contains(event.target) && !threedot.contains(event.target);

    if (isClickOutside) {
      menu.style.display = "none";
    }
  });

  // Hide menu on leave events
  threedot.addEventListener("pointerleave", hide);
  menu.addEventListener("pointerleave", hide);
}

function erase() {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
}
earsebtn.addEventListener("click", erase);
export { createTaskElement };
// todoList.addEventListener("click", (event) => {
//   if (event.target.nodeName === "LI") {
//     event.target.remove();
//   }
// });
