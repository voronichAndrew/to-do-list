const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Функция добавления задачи
function addTask() {
    if (inputBox.value.trim() === '') {
        alert("Напишите что-нибудь!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    updateStats();
    saveData();
}

// Клик по задаче или крестику
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        updateStats();
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        updateStats();
        saveData();
    }
}, false);

// Очистить всё
function clearAll() {
    if(confirm("Удалить все задачи?")) {
        listContainer.innerHTML = "";
        updateStats();
        saveData();
    }
}

// Фильтрация
function filterTasks(filter) {
    const tasks = listContainer.querySelectorAll("li");
    const btns = document.querySelectorAll(".filter-btn");
    
    btns.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    tasks.forEach(task => {
        switch(filter) {
            case 'all':
                task.style.display = "block";
                break;
            case 'active':
                task.style.display = !task.classList.contains("checked") ? "block" : "none";
                break;
            case 'completed':
                task.style.display = task.classList.contains("checked") ? "block" : "none";
                break;
        }
    });
}

// Обновление статистики
function updateStats() {
    const tasks = listContainer.querySelectorAll("li");
    const checkedTasks = listContainer.querySelectorAll("li.checked");
    document.getElementById("total-count").innerHTML = tasks.length;
    document.getElementById("done-count").innerHTML = checkedTasks.length;
}

// Работа с датой
function setDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    document.getElementById("current-date").innerHTML = today.toLocaleDateString("ru-RU", options);
}

// Локальное хранилище
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
    updateStats();
}

// Запуск при загрузке
setDate();
showTask();
