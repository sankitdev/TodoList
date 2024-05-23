const saveTaskBtn = document.querySelector("#saveTask");
const loadTaskBtn = document.querySelector("#loadTask");
const clearTaskBtn = document.querySelector("#clearTasks");
import { createTaskElement } from "./script.js";

let tasks = [];
let count = 1;
function getCount() {
  count++;
  return count;
}
saveTaskBtn.addEventListener("click", handleSaveTasks);
function handleSaveTasks() {
  const listItems = document.querySelectorAll("#todoList li");
  const tasksToSave = extractTasksFromList(listItems);

  if (tasksToSave.length > 0) {
    console.log(`Tasks to Save:`, tasksToSave);
    saveTasks(tasksToSave);
  } else {
    console.log("No Tasks to save");
  }
}

function extractTasksFromList(listItems) {
  tasks = [];
  listItems.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const inputText = item
      .querySelector("input")
      .nextSibling.textContent.trim();
    const completed = checkbox.checked;
    if (inputText) {
      tasks.push({
        id: getCount(),
        title: inputText,
        completed: completed,
      });
    }
  });
  return tasks;
}

function saveTasks(tasks) {
  let tasksJSON = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksJSON);
  console.log(`Saved Data:- ${tasksJSON}`);
}

//Function to render Task in UI

function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach((task) => {
    createTaskElement(task.title, task.completed);
  });
}

function loadTasks() {
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
