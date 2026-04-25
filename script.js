const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const searchInput = document.getElementById("search-input");

// Добавление задачи
function addTask() {
    const text = inputBox.value.trim();
    if (text === '') {
        alert("Введите текст задачи!");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = text;

    const span = document.createElement("span");
    span.innerHTML = '<i class="fas fa-trash"></i>';
    span.className = "delete-btn";
    li.appendChild(span);

    listContainer.appendChild(li);
    inputBox.value = "";
    
    updateCounters();
    saveData();
}

// Обработка кликов (выполнение и удаление)
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
        updateCounters();
    } else if (e.target.classList.contains("delete-btn") || e.target.parentElement.classList.contains("delete-btn")) {
        const taskItem = e.target.closest("li");
        taskItem.remove();
        saveData();
        updateCounters();
    }
}, false);

// ПОИСК (Работает и кнопка, и ввод с клавиатуры)
function searchTasks() {
    const filter = searchInput.value.toLowerCase();
    const tasks = listContainer.getElementsByTagName("li");

    Array.from(tasks).forEach(task => {
        // Получаем только текст задачи (без иконки мусорки)
        const taskText = task.firstChild.textContent.toLowerCase();
        if (taskText.includes(filter)) {
            task.style.display = "";
        } else {
            task.style.display = "none";
        }
    });
}

// Поиск при нажатии Enter в поле поиска
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchTasks();
});

// ОБНОВЛЕНИЕ СЧЕТЧИКОВ
function updateCounters() {
    const allTasks = listContainer.querySelectorAll("li");
    const completedTasks = listContainer.querySelectorAll("li.checked");

    const total = allTasks.length;
    const done = completedTasks.length;
    const pending = total - done;

    // Расчет процента
    const percentage = total === 0 ? 0 : Math.round((done / total) * 100);

    // Обновление DOM элементов
    document.getElementById("total-tasks").innerHTML = total;
    document.getElementById("done-count").innerHTML = done;
    document.getElementById("pending-count").innerHTML = pending;
    document.getElementById("percent-complete").innerHTML = percentage + "%";
    
    // Полоса прогресса
    document.getElementById("progress-bar").style.width = percentage + "%";
}

function clearAll() {
    if (confirm("Удалить все задачи?")) {
        listContainer.innerHTML = "";
        saveData();
        updateCounters();
    }
}

function saveData() {
    localStorage.setItem("proTasksData", listContainer.innerHTML);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem("proTasksData") || "";
    updateCounters(); // Считаем данные сразу после загрузки
}

loadData();
