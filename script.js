const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const searchInput = document.getElementById("search-input");

function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
        inputBox.classList.add("error");
        setTimeout(() => inputBox.classList.remove("error"), 300);
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = taskText;
    
    // Кнопка удаления
    let del = document.createElement("span");
    del.innerHTML = '<i class="fas fa-trash-alt"></i>';
    del.className = "delete-btn";
    li.appendChild(del);

    listContainer.appendChild(li);
    inputBox.value = "";
    
    updateAll();
}

// Слушатель кликов
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.parentElement.classList.contains("delete-btn")) {
        e.target.closest("li").remove();
    }
    updateAll();
}, false);

// Поиск
function searchTasks() {
    const term = searchInput.value.toLowerCase();
    const tasks = listContainer.getElementsByTagName("li");
    
    Array.from(tasks).forEach(task => {
        const text = task.textContent.toLowerCase();
        task.style.display = text.includes(term) ? "block" : "none";
    });
}

// Обновление всей статистики и прогресса
function updateAll() {
    const tasks = listContainer.querySelectorAll("li");
    const completed = listContainer.querySelectorAll("li.checked");
    
    const total = tasks.length;
    const done = completed.length;
    const pending = total - done;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    // Обновляем текст
    document.getElementById("total-tasks").textContent = total;
    document.getElementById("done-count").textContent = done;
    document.getElementById("pending-count").textContent = pending;
    document.getElementById("percent-complete").textContent = percent + "%";

    // Обновляем прогресс-бар
    document.getElementById("progress-bar").style.width = percent + "%";

    saveData();
}

function clearAll() {
    if (confirm("Удалить все задачи?")) {
        listContainer.innerHTML = "";
        updateAll();
    }
}

function saveData() {
    localStorage.setItem("myTasksData", listContainer.innerHTML);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem("myTasksData") || "";
    updateAll();
}

// Загрузка при старте
loadData();
