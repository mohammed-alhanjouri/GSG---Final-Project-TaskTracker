// // Get modal elements
// const taskModal = document.getElementById("taskModal"); // Get the task modal element for adding/editing tasks
// const addTaskButton = document.querySelector(".addTask"); // Get the button that opens the "New Task" modal
// const closeButton = document.querySelector(".close-button"); // Get the button that closes the modal
// const taskForm = document.getElementById("taskForm"); // Get the task form inside the modal
// const modalTitle = taskModal.querySelector("h2"); // Get the modal title element to update its text
// const submitButton = taskForm.querySelector("button"); // Get the submit button in the form to change its text

// // Variables for edit functionality
// let isEditing = false; // Flag to track if we're editing an existing task or adding a new one
// let editingIndex = null; // Index of the task being edited (if any)

// // Show modal when "New Task" button is clicked
// addTaskButton.addEventListener("click", () => {
//     openTaskModal(); // Call function to open the modal for adding a new task
// });

// // Hide modal when "X" button is clicked
// closeButton.addEventListener("click", () => {
//     closeTaskModal(); // Call function to close and reset the modal
// });

// // Handle form submission
// taskForm.addEventListener("submit", (event) => {
//     event.preventDefault(); // Prevent the form from submitting and refreshing the page

//     // Retrieve input values from the form
//     const taskName = document.getElementById("taskName").value;
//     const taskDescription = document.getElementById("taskDescription").value;
//     const taskDeadline = document.getElementById("taskDeadline").value;

//     if (isEditing) {
//         // Update an existing task if editing
//         updateTask(editingIndex, taskName, taskDescription, taskDeadline);
//     } else {
//         // Create a new task object
//         const task = {
//             name: taskName,
//             description: taskDescription,
//             deadline: taskDeadline,
//             status: 'To DO' // Default status for new tasks
//         };
//         saveTask(task); // Save the new task to localStorage
//     }

//     taskForm.reset(); // Clear the form fields
//     closeTaskModal(); // Close the modal
//     displayTasks(); // Refresh the task list display
// });

// // Function to open the task modal (for both new and edit tasks)
// function openTaskModal(task = null, index = null) {
//     taskModal.style.display = "flex"; // Display the modal
//     isEditing = !!task; // Set editing mode if a task is passed
//     editingIndex = index; // Store the index of the task being edited (if any)

//     // Update modal title and button text based on editing state
//     if (task) {
//         // If editing, populate the form with the task's current details
//         document.getElementById("taskName").value = task.name;
//         document.getElementById("taskDescription").value = task.description;
//         document.getElementById("taskDeadline").value = task.deadline;
        
//         modalTitle.textContent = "Edit Task"; // Set modal title to "Edit Task"
//         submitButton.textContent = "Edit Task"; // Set button text to "Edit Task"
//     } else {
//         modalTitle.textContent = "New Task"; // Set modal title to "New Task" for adding a task
//         submitButton.textContent = "Add Task"; // Set button text to "Add Task"
//     }
// }

// // Function to close and reset the task modal
// function closeTaskModal() {
//     taskModal.style.display = "none"; // Hide the modal
//     isEditing = false; // Reset editing mode
//     editingIndex = null; // Clear the index of the task being edited
//     taskForm.reset(); // Reset form fields
// }

// // Function to save a new task to localStorage
// function saveTask(task) {
//     const tasks = loadTasks(); // Load existing tasks from localStorage
//     tasks.push(task); // Add the new task to the list
//     localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks back to localStorage
// }

// // Function to load tasks from localStorage
// function loadTasks() {
//     return JSON.parse(localStorage.getItem("tasks")) || []; // Parse and return tasks array, or an empty array if none exist
// }

// // Function to display tasks in their respective columns
// function displayTasks() {
//     const tasks = loadTasks(); // Load tasks from localStorage
//     const toDoColumn = document.querySelector('.tasks-column.to-do'); // Column for "To Do" tasks
//     const inProgressColumn = document.querySelector('.tasks-column.in-progress'); // Column for "In Progress" tasks
//     const doneColumn = document.querySelector('.tasks-column.done'); // Column for "Done" tasks

//     // Clear existing task cards in each column
//     toDoColumn.innerHTML = '<h3><i class="fas fa-clipboard-list"></i> To Do</h3>';
//     inProgressColumn.innerHTML = '<h3><i class="fa-solid fa-spinner"></i> In Progress</h3>';
//     doneColumn.innerHTML = '<h3><i class="fas fa-check-square"></i> Done</h3>';

//     // Loop through each task and display it in the correct column
//     tasks.forEach((task, index) => {
//         const taskCard = document.createElement("div"); // Create a div for each task card
//         taskCard.classList.add("task-card"); // Add styling class for task cards

//         // Check if task is overdue
//         const currentDate = new Date();
//         const deadlineDate = new Date(task.deadline);
//         if (deadlineDate < currentDate && task.status !== 'Completed') {
//             taskCard.classList.add('overdue'); // Add overdue styling if deadline has passed
//         }

//         // Set the task card's inner HTML
//         taskCard.innerHTML = `
//             <h4>${task.name}</h4>
//             <p>${task.description}</p>
//             <small><i class="fa-regular fa-calendar-check"></i> Deadline: ${task.deadline}</small>
//             <div class="task-operations">
//                 <button class="start-button" onclick="startTask(${index})"><i class="fa-solid fa-flag"></i></button>
//                 <button class="edit-button" onclick="openTaskModal(loadTasks()[${index}], ${index})"><i class="fa-solid fa-pen-to-square"></i></button>
//                 <button class="delete-button" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
//                 <button class="doneCheck" onclick="toggleComplete(${index})"><i class="fas fa-check-circle"></i></button>
//             </div>
//         `;

//         // Append the task to the appropriate column based on its status
//         if (task.status === 'To DO') {
//             toDoColumn.appendChild(taskCard);
//         } else if (task.status === 'InProgress') {
//             inProgressColumn.appendChild(taskCard);
//         } else if (task.status === 'Completed') {
//             doneColumn.appendChild(taskCard);
//         }
//     });
// }

// // Function to start a task (move it to "In Progress")
// function startTask(index) {
//     const tasks = loadTasks();
//     tasks[index].status = "InProgress"; // Change status to "InProgress"
//     localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks
//     displayTasks(); // Refresh task display
// }

// // Function to complete a task (move it to "Completed")
// function toggleComplete(index) {
//     const tasks = loadTasks();
//     tasks[index].status = "Completed"; // Change status to "Completed"
//     localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks
//     displayTasks(); // Refresh task display
// }

// // Function to edit a task (update its details in localStorage)
// function updateTask(index, name, description, deadline) {
//     const tasks = loadTasks();
//     tasks[index].name = name; // Update name
//     tasks[index].description = description; // Update description
//     tasks[index].deadline = deadline; // Update deadline
//     localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks
// }

// // Function to delete a task
// function deleteTask(index) {
//     const confirmDel = confirm("Are you sure you want to delete this task?"); // Ask for confirmation before deleting
//     if (confirmDel) {
//         const tasks = loadTasks();
//         tasks.splice(index, 1); // Remove the task at the given index
//         localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks
//         displayTasks(); // Refresh task display
//         alert("Task deleted successfully.");
//     }
// }

// // Display tasks when the page loads
// window.onload = displayTasks;

// Get modal elements
const taskModal = document.getElementById("taskModal");
const addTaskButton = document.querySelector(".addTask");
const closeButton = document.querySelector(".close-button");
const taskForm = document.getElementById("taskForm");

// Elements for the edit modal
let isEditing = false; // check if we're adding or editing a task
let editingIndex = null;

// Show modal when "New Task" button is clicked
addTaskButton.addEventListener("click", () => {
    // function for open modal
});

// Hide modal when "X" button is clicked
closeButton.addEventListener("click", () => {
    // function to close modal
});

// Handle form submission
taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Capture form data
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDeadline = document.getElementById("taskDeadline").value;

    // Create a new task card
    const tasks = {
        // id: Date.now(),
        name: taskName,
        description: taskDescription,
        deadline: taskDeadline,
        status: 'To DO' // Default status for new tasks
    }
    saveTask(tasks);

})

// Open the task modal (for both new and edit)

// Close and reset the task modal

// Function to save a new task to localStorage

// Function to get tasks from localStorage

// Function to display tasks in respective columns

// Function to start a task (move to InProgress)

// Function to complete a task (move to Completed)

// Function to edit a task (update in localStorage)

// Function to delete a task
const deleteTask = (index) => {
    const confirmDel = confirm("Are you sure you want to delete this task?");
    if (confirmDel) {
        const tasks = loadTasks();
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
        alert("Task deleted successfully.");
    }
}