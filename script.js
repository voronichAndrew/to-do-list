const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const searchInput = document.getElementById("search-input");

// 1. Добавление задачи
function addTask() {
    const text = inputBox.value.trim();
    if (text === '') {
        alert("Сначала напишите задачу!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = text;

    const span = document.createElement("span");
    span.innerHTML = '<i class="fas fa-trash"></i>';
    span.className = "delete-icon";
    li.appendChild(span);

    listContainer.appendChild(li);
    inputBox.value = "";
    
    saveData();
    updateUI();
}

// 2. Клик по списку (выполнить или удалить)
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
        updateUI();
    } 
    else if (e.target.classList.contains("delete-icon") || e.target.parentElement.classList.contains("delete-icon")) {
        e.target.closest("li").remove();
        saveData();
        updateUI();
    }
}, false);

// 3. ПОИСК (Исправленный)
function searchTasks() {
    const filter = searchInput.value.toLowerCase();
    const tasks = listContainer.querySelectorAll("li");

    tasks.forEach(task => {
        // Берем текст задачи, исключая текст иконки мусорки
        const text = task.firstChild.textContent.toLowerCase();
        if (text.includes(filter)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}

// Поиск при вводе (чтобы работал не только по кнопке)
searchInput.addEventListener("input", searchTasks);

// 4. ОБНОВЛЕНИЕ ВСЕГО ИНТЕРФЕЙСА (Счетчики и Прогресс)
function updateUI() {
    const allTasks = listContainer.querySelectorAll("li");
    const completedTasks = listContainer.querySelectorAll("li.checked");

    const total = allTasks.length;
    const done = completedTasks.length;
    const pending = total - done;

    // Считаем процент
    const percentage = total === 0 ? 0 : Math.round((done / total) * 100);

    // Обновляем цифры на экране
    document.getElementById("total-tasks").textContent = total;
    document.getElementById("done-count").textContent = done;
    document.getElementById("pending-count").textContent = pending;
    document.getElementById("percent-complete").textContent = percentage + "%";
    
    // Двигаем полосу прогресса
    document.getElementById("progress-bar").style.width = percentage + "%";
}

// 5. Очистка всего
function clearAll() {
    if (confirm("Вы уверены, что хотите удалить ВСЕ задачи?")) {
        listContainer.innerHTML = "";
        saveData();
        updateUI();
    }
}

// 6. Сохранение и Загрузка
function saveData() {
    localStorage.setItem("myProList", listContainer.innerHTML);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem("myProList") || "";
    // После загрузки ОБЯЗАТЕЛЬНО обновляем UI
    updateUI();
}

loadData();
