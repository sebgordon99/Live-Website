// --- Mock Server Setup (Simulating JSON Server persistence) ---

let tasks = []; // In-memory representation of the server's database

// A mock ID for creation (simulating server assignment)
let nextId = 1;

// --- DOM Elements ---
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const messageBox = document.getElementById("messageBox");
const loadingIndicator = document.getElementById("loadingIndicator");

// --- Helper Functions ---

/**
 * Saves the current tasks array to localStorage.
 */
function saveTasks() {}

/**
 * Shows a temporary success or error message (Bootstrap Alert).
 */
function showMessage(message, type) {
  alert(message);
}

/**
 * Creates and returns a new list item element for a task object.
 * @param {object} task - The task data {id, task, completed}
 */
function createTaskElement(task) {}

/**
 * READ: Renders the current state of the tasks array to the DOM.
 */

// retrieve the array of previous tasks
// for each task of tasks
// add task to the initial list of tasks, using the given values
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    if (task.completed) li.classList.add("completed");

    const text = document.createElement("span");
    text.textContent = task.name;

    const footer = document.createElement("div");
    footer.classList.add("task-footer");

    const timestamp = document.createElement("span");
    timestamp.classList.add("timestamp");
    timestamp.textContent = new Date(task.createAt).toLocaleString();

    const btn = document.createElement("button");
    btn.classList.add("complete-btn");
    btn.textContent = "Complete";

    btn.addEventListener("click", () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    text.addEventListener("dblclick", () => {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    footer.appendChild(timestamp);
    footer.appendChild(btn);
    li.appendChild(text);
    li.appendChild(footer);
    taskList.appendChild(li);
  });
}

/**
 * READ: Loads tasks from localStorage (Mock GET /todos).
 */

async function getTasks() {
  const url = "http://localhost:3000/tasks";
  try {
    const response = await fetch(url);
      await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
    return [];
  }
}


function fetchAndRenderTasks() {
  //load tasks from local storage
  // tasks = JSON.parse(localStorage.getItem("tasks"));

getTasks().then((result) => {

  tasks = result;
  renderTasks();
  document.getElementsByClassName("hidden")[0].classList.add('d-none');

});

  
 
}

// --- Mock CRUD Operations ---

/**
 * CREATE: Adds a new task to the array (Mock POST /todos).
 */
function addTask() {
  addTaskBtn.className = addTaskBtn.className.replace(
    "btn-primary",
    "btn-success"
  );
  setTimeout(() => {
    addTaskBtn.className = addTaskBtn.className.replace(
      "btn-success",
      "btn-primary"
    );
  }, 5000);

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    showMessage("Task cannot be empty.", "danger");
    return;
  }
  console.log(taskText);

  const li = document.createElement("li");
  li.classList.add("task-item", "highlight");

  const textSpan = document.createElement("span");
  textSpan.textContent = taskText;

  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const timestamp = document.createElement("span");
  timestamp.classList.add("timestamp");
  timestamp.textContent = ` (${timeString})`;

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.classList.add("complete-btn");

  completeBtn.addEventListener("click", () => {
    li.remove();
  });

  const footer = document.createElement("div");
  footer.classList.add("task-footer");
  footer.appendChild(timestamp);
  footer.appendChild(completeBtn);

  li.appendChild(textSpan);
  li.appendChild(footer);

  taskList.prepend(li);

  const task = {
    name: taskText,
    createAt: new Date(),
    completed: false,
  };

  tasks.unshift(task);
  // localStorage.setItem("tasks", JSON.stringify(tasks));
  fetch("http://localhost:3000/tasks"), {
    method: "POST",
    body: JSON.stringify(task),
  }

  taskInput.value = "";
}

/**
 * UPDATE: Toggles the completion status (Mock PATCH /todos/:id).
 */
function toggleTaskCompletion(id, isCompleted, taskName) {}

/**
 * DELETE: Removes a task from the array (Mock DELETE /todos/:id).
 */
function deleteTask(id, taskName) {}

// --- Event Listeners (DOM API) ---

// Attach the main event listener to the 'Add Task' button
addTaskBtn.addEventListener("click", addTask);
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
taskList.addEventListener("dblclick", function (event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("tempFinish");
  }
});
// Initial data load
fetchAndRenderTasks();
