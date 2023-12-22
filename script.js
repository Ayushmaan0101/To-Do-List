let inputbox = document.getElementById("inputbox");
let addtask = document.getElementById("addtask");
let calender = document.getElementById("calender");
let parentcontainer = document.getElementById("Tasks");
let clearAllButton = document.createElement("button");

addtask.addEventListener("click", addingtask);

function addingtask() {
    let dateselected = calender.value;
    let taskselected = inputbox.value;

    let taskcontainer = document.createElement("div");
    taskcontainer.className = "task";
    taskcontainer.style.display = "flex";
    taskcontainer.style.justifyContent = "space-between";
    taskcontainer.style.marginLeft = "10px";
    taskcontainer.style.marginRight = "15px";

    let date = document.createElement("p");
    date.className = "date";
    taskcontainer.appendChild(date);
    date.innerHTML = dateselected;
    date.style.color = "white";

    let task = document.createElement("p");
    task.className = "task";
    taskcontainer.appendChild(task);
    task.innerHTML = taskselected;
    task.style.color = "white";

    let status = document.createElement("input");
    status.type = "checkbox";
    status.name = "checkbox";
    status.id = "checkbox";
    taskcontainer.appendChild(status);

    parentcontainer.appendChild(taskcontainer);

    // Save the task to local storage
    saveTaskToLocalStorage(dateselected, taskselected);

    inputbox.value = "";
    calender.value = "";

    status.addEventListener("change", function () {
        if (status.checked) {
            task.style.textDecoration = "line-through";
        } else {
            task.style.textDecoration = "none";
        }

        updateClearButtonVisibility();
    });

    task.addEventListener("dblclick", function () {
        parentcontainer.removeChild(taskcontainer);
        removeFromLocalStorage(dateselected, taskselected);
        updateClearButtonVisibility();
    });

    updateClearButtonVisibility();
}

function saveTaskToLocalStorage(date, task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ date, task });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeFromLocalStorage(date, task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => !(t.date === date && t.task === task));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateClearButtonVisibility() {
    if (clearAllButton.parentNode) {
        clearAllButton.remove();
    }

    if (parentcontainer.children.length > 0) {
        clearAllButton.style.backgroundColor = "#7296fa";
        clearAllButton.style.color = "white";
        clearAllButton.id = "clearAllButton";
        clearAllButton.innerHTML = "Clear all";
        clearAllButton.style.borderRadius = "5px";
        clearAllButton.style.border = "none";
        clearAllButton.style.padding = "5px 10px";
        clearAllButton.style.marginTop = "15px";
        clearAllButton.style.cursor = "pointer";
        clearAllButton.addEventListener("click", clearAllTasks);
        parentcontainer.appendChild(clearAllButton);
    }
}

function clearAllTasks() {
    parentcontainer.innerHTML = "";
    updateClearButtonVisibility();
}

document.addEventListener("DOMContentLoaded", function () {
    function showMessage() {
        var messageContainer = document.getElementById("message-container");
        messageContainer.textContent = "Double click the task to remove it.";
        messageContainer.style.left = "0";

        setTimeout(function () {
            messageContainer.style.left = "-100%";

            setTimeout(function () {
                showMessage();
            }, 5000);
        }, 2000);
    }

    showMessage();

    document.getElementById("message-container").addEventListener("dblclick", function () {
        this.style.left = "-100%";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Load tasks from local storage on page load
    loadTasksFromLocalStorage();

    addtask.addEventListener("click", addingtask);

    function loadTasksFromLocalStorage() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            let taskcontainer = document.createElement("div");
            taskcontainer.className = "task";
            taskcontainer.style.display = "flex";
            taskcontainer.style.justifyContent = "space-between";
            taskcontainer.style.marginLeft = "10px";
            taskcontainer.style.marginRight = "15px";

            let date = document.createElement("p");
            date.className = "date";
            taskcontainer.appendChild(date);
            date.innerHTML = task.date;
            date.style.color = "white";

            let taskElement = document.createElement("p");
            taskElement.className = "task";
            taskcontainer.appendChild(taskElement);
            taskElement.innerHTML = task.task;
            taskElement.style.color = "white";

            let status = document.createElement("input");
            status.type = "checkbox";
            status.name = "checkbox";
            status.id = "checkbox";
            taskcontainer.appendChild(status);

            parentcontainer.appendChild(taskcontainer);

            status.addEventListener("change", function () {
                if (status.checked) {
                    taskElement.style.textDecoration = "line-through";
                } else {
                    taskElement.style.textDecoration = "none";
                }

                updateClearButtonVisibility();
            });

            taskElement.addEventListener("dblclick", function () {
                parentcontainer.removeChild(taskcontainer);
                removeFromLocalStorage(task.date, task.task);
                updateClearButtonVisibility();
            });

            updateClearButtonVisibility();
        });
    }
});
