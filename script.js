const tasks =[];

const addTask = () => {
    const taskName = document.getElementById('taskName');
    const isDuplicate = tasks.some(task => task.taskName.toLowerCase() === taskName.toLowerCase());
    if (taskName.trim() === "") {
        alert("You have to write Task Title!");
    }
    else if (isDuplicate) {
        alert("This Task Title already exists!");
    }
    else {
        const newTask = {taskName , isCompleted: false};
        tasks.push(newTask);
    }
};