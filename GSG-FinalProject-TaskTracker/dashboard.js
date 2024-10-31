 // Function to count tasks by status from localStorage
 function countTasksByStatus() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const counts = { toDo: 0, inProgress: 0, completed: 0 };

    tasks.forEach(task => {
        if (task.status === "To DO") {
            counts.toDo += 1;
        } else if (task.status === "InProgress") {
            counts.inProgress += 1;
        } else if (task.status === "Completed") {
            counts.completed += 1;
        }
    });

    return counts;
}

// Function to display task counts in respective colored boxes
function displayTaskCounts() {
    const counts = countTasksByStatus();
    
    document.getElementById("toDoCount").textContent = counts.toDo;
    document.getElementById("inProgressCount").textContent = counts.inProgress;
    document.getElementById("completedCount").textContent = counts.completed;
}
// Call displayTaskCounts to show the counts on load
displayTaskCounts();
/*---------------------------------------------------------------------------*/
/* data displayed as percentage */  

function displayTaskStatusPercentages() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Count tasks by status
  const totalTasks = tasks.length;
  const statusCounts = { todo: 0, inProgress: 0, done: 0 };

  tasks.forEach(task => {
    if (task.status === 'To DO') statusCounts.todo++;
    else if (task.status === 'InProgress') statusCounts.inProgress++;
    else if (task.status === 'Completed') statusCounts.done++;
  });

  // Calculate percentages
  const todoPercentage = totalTasks ? (statusCounts.todo / totalTasks * 100).toFixed(1) : 0;
  const inProgressPercentage = totalTasks ? (statusCounts.inProgress / totalTasks * 100).toFixed(1) : 0;
  const donePercentage = totalTasks ? (statusCounts.done / totalTasks * 100).toFixed(1) : 0;

  // Update the circular progress bars
  updateCircularProgress(document.querySelector('#todo-status .circular-progress'), todoPercentage);
  updateCircularProgress(document.querySelector('#inprogress-status .circular-progress'), inProgressPercentage);
  updateCircularProgress(document.querySelector('#done-status .circular-progress'), donePercentage);
}

function updateCircularProgress(element, percentage) {
  const angle = (percentage / 100) * 360;
  element.style.background = `conic-gradient(#4caf50 ${angle}deg, #ccc ${angle}deg)`;
  element.querySelector('.inner-circle').textContent = `${percentage}%`;
}

// Call the function to display percentages on load
displayTaskStatusPercentages();





/* calculate data percentage */
function calculateTaskPercentages() {
  // Fetch tasks from local storage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const totalTasks = tasks.length;

  // Calculate counts and percentages for each status
  const completedCount = tasks.filter(task => task.status === "Completed").length;
  const inProgressCount = tasks.filter(task => task.status === "InProgress").length;
  const pendingCount = tasks.filter(task => task.status === "To DO").length;

  const completedPercent = (completedCount / totalTasks) * 100;
  const inProgressPercent = (inProgressCount / totalTasks) * 100;
  const pendingPercent = (pendingCount / totalTasks) * 100;

  // Draw the concentric circle chart
  drawConcentricCircles(completedPercent, inProgressPercent, pendingPercent);
}

function drawConcentricCircles(completedPercent, inProgressPercent, pendingPercent) {
  const canvas = document.getElementById("taskChart");
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Define radii and colors for each status circle
  const radii = [80, 60, 40];
  const colors = {
    completed: "#4caf50",    // Green
    inProgress: "#ff9800",   // Orange
    pending: "#f44336"       // Red
  };

  // Draw each circle with calculated percentages
  drawArcSegment(ctx, centerX, centerY, radii[0], completedPercent, colors.completed);
  drawArcSegment(ctx, centerX, centerY, radii[1], inProgressPercent, colors.inProgress);
  drawArcSegment(ctx, centerX, centerY, radii[2], pendingPercent, colors.pending);
}

// Helper function to draw an arc segment for each status
function drawArcSegment(ctx, x, y, radius, percent, color) {
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (percent / 100) * 2 * Math.PI;

  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle);
  ctx.lineWidth = 15;
  ctx.strokeStyle = color;
  ctx.stroke();
}

// Initialize the chart
calculateTaskPercentages();
 