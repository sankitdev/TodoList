const DragHandlers = {
  dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.target.classList.add("dragging");
  },
  dragOver(event) {
    event.preventDefault();
    event.target.classList.add("drag-over");
  },
  dragEnter(event) {
    event.preventDefault();
  },
  dragLeave(event) {
    event.target.classList.remove("drag-over");
  },
  dragDrop(event) {
    event.preventDefault();
    const draggedItemId = event.dataTransfer.getData("text/plain");
    const draggedItem = document.getElementById(draggedItemId);
    const targetItem = event.target;

    if (targetItem.nodeName === "LI" && draggedItem !== targetItem) {
      const rect = targetItem.getBoundingClientRect();
      const offset = event.clientY - rect.top;
      if (offset < rect.height / 2) {
        todoList.insertBefore(draggedItem, targetItem);
      } else {
        todoList.insertBefore(draggedItem, targetItem.nextSibling);
      }
    }

    draggedItem.classList.remove("dragging");
    event.target.classList.remove("drag-over");
    saveTodos();
  },
  dragEnd(event) {
    event.target.classList.remove("dragging");
    todoList.querySelectorAll(".drag-over").forEach((item) => {
      item.classList.remove("drag-over");
    });
  },
};
