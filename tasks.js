// Get modal elements
const taskModal = document.getElementById("taskModal");
const addTaskButton = document.querySelector(".addTask");
const closeButton = document.querySelector(".close-button");
const taskForm = document.getElementById("taskForm");
const modalTitle = taskModal.querySelector("h2");
const submitButton = taskForm.querySelector("button");

// Elements for the edit modal
let isEditing = false;
let editingIndex = null;

// Show modal when "New Task" button is clicked
addTaskButton.addEventListener("click", () => {
    openTaskModal();
});

// Hide modal when "X" button is clicked
closeButton.addEventListener("click", () => {
    closeTaskModal();
});

// Handle form submission
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDeadline = document.getElementById("taskDeadline").value;

    if (isEditing) {
        updateTask(editingIndex, taskName, taskDescription, taskDeadline);
    } else {
        const task = {
            // id: ,
            name: taskName,
            description: taskDescription,
            deadline: taskDeadline,
            status: 'To DO'
        };
        saveTask(task);
    }

    taskForm.reset();
    closeTaskModal();
    displayTasks();
});

// Open the task modal (for both new and edit)
// function openTaskModal(task = null, index = null) {
//     taskModal.style.display = "flex";
//     isEditing = !!task;
//     editingIndex = index;
//     if (task) {
//         document.getElementById("taskName").value = task.name;
//         document.getElementById("taskDescription").value = task.description;
//         document.getElementById("taskDeadline").value = task.deadline;
//     }
// }
function openTaskModal(task = null, index = null) {
    taskModal.style.display = "flex";
    isEditing = !!task;
    editingIndex = index;

    // Update modal title and button text based on editing state
    if (task) {
        document.getElementById("taskName").value = task.name;
        document.getElementById("taskDescription").value = task.description;
        document.getElementById("taskDeadline").value = task.deadline;
        
        // New lines to change title and button text for edit mode
        modalTitle.textContent = "Edit Task"; // Set title to "Edit Task"
        submitButton.textContent = "Edit Task"; // Set button to "Edit Task"
    } else {
        // New lines to change title and button text for new task
        modalTitle.textContent = "New Task"; // Set title to "New Task"
        submitButton.textContent = "Add Task"; // Set button to "Add Task"
    }
}


// Close and reset the task modal
function closeTaskModal() {
    taskModal.style.display = "none";
    isEditing = false;
    editingIndex = null;
    taskForm.reset();
}

// Function to save a new task to localStorage
function saveTask(task) {
    const tasks = loadTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to get tasks from localStorage
function loadTasks() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : []; // Parse tasks if found, otherwise return an empty array
}

// Function to display tasks in respective columns
function displayTasks() {
    const tasks = loadTasks();
    const toDoColumn = document.querySelector('.tasks-column.to-do');
    const inProgressColumn = document.querySelector('.tasks-column.in-progress');
    const doneColumn = document.querySelector('.tasks-column.done');

    // Clear existing tasks
    toDoColumn.innerHTML = '<h3><i class="fas fa-clipboard-list"></i> To Do</h3>';
    inProgressColumn.innerHTML = '<h3><i class="fa-solid fa-spinner"></i> In Progress</h3>';
    doneColumn.innerHTML = '<h3><i class="fas fa-check-square"></i> Done</h3>';

    tasks.forEach((task, index) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");

        // Check if task is overdue
        const currentDate = new Date();
        const deadlineDate = new Date(task.deadline);
        if (deadlineDate < currentDate && task.status !== 'Completed') {
            taskCard.classList.add('overdue'); // Apply overdue styling
        }

        taskCard.innerHTML = `
            <h4>${task.name}</h4>
            <p>${task.description}</p>
            <small><i class="fa-regular fa-calendar-check"></i> Deadline: ${task.deadline}</small>
            <div class="task-operations">
                <button class="start-button" onclick="startTask(${index})"><i class="fa-solid fa-flag"></i></button>
                <button class="edit-button" onclick="openTaskModal(loadTasks()[${index}], ${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-button" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
                <button class="doneCheck" onclick="toggleComplete(${index})"><i class="fas fa-check-circle"></i></button>
            </div>
        `;

        if (task.status === 'To DO') {
            toDoColumn.appendChild(taskCard);
        } else if (task.status === 'InProgress') {
            inProgressColumn.appendChild(taskCard);
        } else if (task.status === 'Completed') {
            doneColumn.appendChild(taskCard);
        }
    });
}

// Function to start a task (move to InProgress)
function startTask(index) {
    const tasks = loadTasks();
    tasks[index].status = "InProgress";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Function to complete a task (move to Completed)
function toggleComplete(index) {
    const tasks = loadTasks();
    tasks[index].status = "Completed";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Function to edit a task (update in localStorage)
function updateTask(index, name, description, deadline) {
    const tasks = loadTasks();
    tasks[index].name = name;
    tasks[index].description = description;
    tasks[index].deadline = deadline;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to delete a task
function deleteTask(index) {
    const confirmDel = confirm("Are you sure you want to delete this task?");
    if (confirmDel) {
        const tasks = loadTasks();
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
        alert("Task deleted successfully.");
    }
}

// Call displayTasks on page load to initialize tasks display
window.onload = displayTasks;