// Get task modal elements
const taskModal = document.getElementById("taskModal");
const addTaskButton = document.querySelector(".addTask");
const closeButton = document.querySelector(".close-button");
const taskForm = document.getElementById("taskForm");
const modalTitle = taskModal.querySelector("h2");
const submitButton = taskForm.querySelector("button");

// Get search modal elements
const searchModal = document.getElementById("searchModal");
const searchResults = document.getElementById("searchResults");
const closeSearchButton = document.querySelector(".close-search-button");
const searchBar = document.getElementById("search-bar");
const searchButton = document.querySelector(".searchButton");

// Call search function when search button is clicked
searchButton.addEventListener("click", () => {
    searchTasks(); // Call searchTasks to perform the search and display results
});

// Hide search modal when "X" button is clicked
closeSearchButton.addEventListener("click", () => {
    closeSearchModal();
});

// Show search modal function
const openSearchModal = () => {
    searchModal.style.display = "flex";
};

// Hide search modal function
const closeSearchModal = () => {
    searchModal.style.display = "none";
    searchResults.innerHTML = ""; // Clear previous results
};

// Function to search for tasks by keyword
const searchTasks = () => {
    const tasks = loadTasks(); // Load tasks from localStorage
    const searchKeyword = searchBar.value.trim(); // Get search term from the search bar

    if (searchKeyword === "") {
        alert("Please enter a keyword to search."); // Alert if the search keyword is empty
        return;
    }

    // Filter tasks based on the keyword
    const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(searchKeyword.toLowerCase()));

    // Display results in the modal
    if (filteredTasks.length > 0) {
        filteredTasks.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p>${task.description}</p>
            <small><i class="fa-regular fa-calendar-check"></i> Deadline: ${task.deadline}</small>
            `;
            searchResults.appendChild(taskElement);
        });
    } else {
        const noResults = document.createElement("p");
        noResults.textContent = "No tasks found!";
        searchResults.appendChild(noResults);
    }

    openSearchModal(); // Open the modal to display results
};

// Elements for the edit modal
let isEditing = false; // Flag to track if we're editing an existing task or adding a new one
let editingIndex = null; // Index of the task being edited (if any)

// Show task modal when "New Task" button is clicked
addTaskButton.addEventListener("click", () => {
    openTaskModal();
});

// Hide task modal when "X" button is clicked
closeButton.addEventListener("click", () => {
    closeTaskModal();
});

// Handle form submission
taskForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    
    // Capture form data
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDeadline = document.getElementById("taskDeadline").value;

    if (isEditing) {
        // Update an existing task if we're editing
        updateTask(editingIndex, taskName, taskDescription, taskDeadline);
    } else {
        // Create a new task object
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = {
            id: tasks.length+1,
            name: taskName,
            description: taskDescription,
            deadline: taskDeadline,
            status: 'To DO' // Default status for new tasks
        };
        saveTasks(task);
    }

    taskForm.reset();
    closeTaskModal();
    displayTasks();
});

// Function to open the task modal (for both new and edit)
const openTaskModal = (task = null, index = null) => {
    taskModal.style.display = "flex";
    isEditing = !!task;
    editingIndex = index;

    // Update modal title and button text based on (new or edit)
    if (task) {
        // If editing, to fill the form with the task's current details
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
const closeTaskModal = () => {
    taskModal.style.display = "none";
    isEditing = false;
    editingIndex = null;
    taskForm.reset();
}

// Function to save a new task to localStorage
const saveTasks = (task) => {
    const tasks = loadTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    alert('Task added successfully!');
}

// Function to get tasks from localStorage
const loadTasks = () => {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : []; // Parse tasks if found, otherwise return an empty array
}

// Function to display tasks in specific columns
const displayTasks = () => {
    const tasks = loadTasks();
    const toDoColumn = document.querySelector('.tasks-column.to-do');
    const inProgressColumn = document.querySelector('.tasks-column.in-progress');
    const doneColumn = document.querySelector('.tasks-column.done');

    // Clear existing tasks
    toDoColumn.innerHTML = '<h3><i class="fas fa-clipboard-list"></i> To Do</h3>';
    inProgressColumn.innerHTML = '<h3><i class="fa-solid fa-spinner"></i> In Progress</h3>';
    doneColumn.innerHTML = '<h3><i class="fas fa-check-square"></i> Done</h3>';

    // Loop through each task and display it in the correct column
    tasks.forEach((task, index) => {
        const taskCard = document.createElement("div"); // Create a div for each task card
        taskCard.classList.add("task-card"); // Add styling class for task cards

        // Check if task is overdue
        const currentDate = new Date();
        const deadlineDate = new Date(task.deadline);
        if (deadlineDate < currentDate && task.status !== 'Completed') {
            taskCard.classList.add('overdue'); // Add overdue styling if the task deadline has passed
        }

        taskCard.innerHTML = `
            <h4>${task.name}</h4>
            <p>${task.description}</p>
            <small><i class="fa-regular fa-calendar-check"></i> Deadline: ${task.deadline}</small>
            <div class="task-operations">
                <button class="start-button" onclick="startTask(${index})"><i class="fa-solid fa-flag"></i></button>
                <button class="edit-button" onclick="openTaskModal(loadTasks()[${index}], ${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-button" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
                <button class="doneCheck" onclick="completeTask(${index})"><i class="fas fa-check-circle"></i></button>
            </div>
        `;

        // Append the task to the right column based on its status
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
const startTask = (index) => {
    const tasks = loadTasks();
    tasks[index].status = "InProgress"; // Change status to "InProgress"
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the update
    displayTasks();
    alert(`Task "${tasks[index].name}" is now In Progress.`);
}

// Function to complete a task (move to Completed)
const completeTask = (index) => {
    const tasks = loadTasks();
    tasks[index].status = "Completed"; // Change status to "Completed"
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the update
    displayTasks();
    alert(`Task "${tasks[index].name}" is Done!`);
}

// Function to edit a task (update in localStorage)
const updateTask = (index, name, description, deadline) => {
    const tasks = loadTasks();
    tasks[index].name = name;
    tasks[index].description = description;
    tasks[index].deadline = deadline;
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the update
    alert(`Task "${tasks[index].name}" updated successfully.`);
}

// Function to delete a task
const deleteTask = (index) => {
    const confirmDel = confirm("Are you sure you want to delete this task?");
    if (confirmDel) {
        const tasks = loadTasks();
        tasks.splice(index, 1); // Remove the task at the given index
        localStorage.setItem("tasks", JSON.stringify(tasks)); 
        displayTasks();
        alert(`Task deleted successfully.`);
    }
}

// Display tasks when the page loads
window.onload = displayTasks;