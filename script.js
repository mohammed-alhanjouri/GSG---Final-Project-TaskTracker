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

    // Create a new task card (to be in "To Do" column)
    const tasks = {
        // id: Date.now(),
        name: taskName,
        description: taskDescription,
        deadline: taskDeadline,
        status: 'To DO'
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