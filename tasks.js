// Get modal elements
const taskModal = document.getElementById("taskModal");
const addTaskButton = document.querySelector(".addTask");
const closeButton = document.querySelector(".close-button");
const taskForm = document.getElementById("taskForm");

// Show modal when "New Task" button is clicked
addTaskButton.addEventListener("click", () => {
    taskModal.style.display = "flex";
});

// Hide modal when "X" button is clicked
closeButton.addEventListener("click", () => {
    taskModal.style.display = "none";
});

// Hide modal when clicking outside of the modal content
// window.addEventListener("click", (event) => {
//     if (event.target == taskModal) {
//         taskModal.style.display = "none";
//     }
// });

// Handle form submission
taskForm.addEventListener("submit", (event) => {
    vent.preventDefault();

    // Capture form data
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDeadline = document.getElementById("taskDeadline").value;

    // Create a new task card (to be in "To Do" column)
    const newTaskCard = document.createElement("div");
    newTaskCard.classList.add("task-card");
    newTaskCard.innerHTML = `
        <h4>${taskName}</h4>
        <p>${taskDescription}</p>
        <small><i class="fa-regular fa-calendar-check"></i> Deadline: ${taskDeadline}</small>
        <div class="task-operations">
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

    // Append new task to "To Do" column
    document.querySelector(".tasks-column.to-do").appendChild(newTaskCard);

    // Reset form and hide modal
    taskForm.reset();
    taskModal.style.display = "none";
});
