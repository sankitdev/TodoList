const saveTaskBtn = document.querySelector("#saveTask");
const loadTaskBtn = document.querySelector("#loadTask");
const clearTaskBtn = document.querySelector("#clearTasks");

let tasks = [];
let count = 1;
function getCount() {
  count++;
  return count;
}
saveTaskBtn.addEventListener("click", () => {
  const listItems = document.querySelectorAll("#todoList li");
  tasks = [];
  listItems.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const taskText = item.textContent.trim();
    const completed = checkbox.checked;
    tasks.push({
      id: getCount(),
      title: taskText,
      completed: completed,
    });
  });
  console.log(`Tasks to Save:${tasks}`);
  saveTasks();
});

function saveTasks() {
  let tasksJSON = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksJSON);
  console.log(`Saved Data:- ${tasksJSON}`);
}

//Function to render Task in UI

function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    li.appendChild(checkbox);
    const tasktitle = document.createTextNode(task.title);
    li.appendChild(tasktitle);
    todoList.appendChild(li);
  });
}

function loadTasks() {
  //   alert("I am clicked");
  let tasksJSON = localStorage.getItem("tasks");
  console.log(tasksJSON);
  if (tasksJSON) {
    tasks = JSON.parse(tasksJSON);
  } else {
    tasks = [];
  }
  renderTasks();
}
loadTaskBtn.addEventListener("click", loadTasks);

function clearTasks() {
  clearTaskBtn.addEventListener("click", () => {
    localStorage.clear();
  });
}

clearTasks();
