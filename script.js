const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const searchInput = document.getElementById("search-input");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("Напишите что-нибудь!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        let span = document.createElement("span");
        span.innerHTML = '<i class="fas fa-trash"></i>';
        span.className = "delete-icon";
        li.appendChild(span);
        listContainer.appendChild(li);
        inputBox.value = "";
        saveData();
        updateUI();
    }
}

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

function searchTasks() {
    const filter = searchInput.value.toLowerCase();
    const tasks = listContainer.querySelectorAll("li");

    tasks.forEach(task => {
        const text = task.textContent.toLowerCase();
        task.style.display = text.includes(filter) ? "flex" : "none";
    });
}

function updateUI() {
    const allTasks = listContainer.querySelectorAll("li");
    const doneTasks = listContainer.querySelectorAll("li.checked");

    const total = allTasks.length;
    const done = doneTasks.length;
    const pending = total - done;
    const percentage = total === 0 ? 0 : Math.round((done / total) * 100);

    document.getElementById("total-tasks").textContent = total;
    document.getElementById("done-count").textContent = done;
    document.getElementById("pending-count").textContent = pending;
    document.getElementById("percent-complete").textContent = percentage + "%";
    document.getElementById("progress-bar").style.width = percentage + "%";
}

function clearAll() {
    if (confirm("Удалить всё?")) {
        listContainer.innerHTML = "";
        saveData();
        updateUI();
    }
}

function saveData() {
    localStorage.setItem("myTaskDataV3", listContainer.innerHTML);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem("myTaskDataV3") || "";
    updateUI();
}

loadData();
// Поиск при вводе текста
searchInput.addEventListener("input", searchTasks);

loadData();
