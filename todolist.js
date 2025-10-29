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
function renderTasks() {
  // DOM Manipulation: Clear the existing list
  taskList.innerHTML = "";
}

/**
 * READ: Loads tasks from localStorage (Mock GET /todos).
 */
function fetchAndRenderTasks() {}

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
  second: "2-digit" 
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

// Initial data load
fetchAndRenderTasks();
