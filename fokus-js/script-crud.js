const taskListContainer = document.querySelector(".app__section-task-list");

const formTask = document.querySelector(".app__form-add-task");
const toggleFormTaskBtn = document.querySelector(".app__button--add-task");
const formLabel = document.querySelector(".app__form-label");

const textArea = document.querySelector(".app__form-textarea");

const cancelBtn = document.querySelector(".app__form-footer__button--cancel");

const taskActiveDescription = document.querySelector(".app__section-active-task-description");

const localStorageTasks = localStorage.getItem("tasks");
let tasks = localStorageTasks ? JSON.parse(localStorageTasks) : [];

const taskIconSvg = `
<svg class="app_section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
<path
    d = "M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L19 16.17192"
    fill="#01080E" />
</svg>
`;

let selectedTask = null;
let selectedTaskItem = null;

const selectTask = (task, li) => {
    taskActiveDescription.innerHTML = task.description;

    li.classList.add("app__section-task-list-item-active");

    tasks.forEach((task) => {
        if (task.description != taskActiveDescription) {
            li.classList.remove("app__section-task-list-item-active");
        }
    });
};

const resetFormValue = () => {
    textArea.value = "";
    formTask.classList.toggle("hidden");
};

function createTask(task) {
    const li = document.createElement("li");
    li.classList.add("app__section-task-list-item");

    const svgIcon = document.createElement("svg");
    svgIcon.innerHTML = taskIconSvg;

    const paragraph = document.createElement("p");
    paragraph.classList.add("app__section-task-list-item-description");

    paragraph.textContent = task.description;

    li.onclick = () => {
        selectTask(task, li);
    };

    li.appendChild(svgIcon);
    li.appendChild(paragraph);

    return li;
}

tasks.forEach((task) => {
    const taskItem = createTask(task);
    taskListContainer.appendChild(taskItem);
});

toggleFormTaskBtn.addEventListener("click", () => {
    formTask.classList.toggle("hidden");
});

const updateLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

formTask.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = {
        description: textArea.value,
        conclusion: false,
    };

    tasks.push(task);
    const taskItem = createTask(task);
    taskListContainer.appendChild(taskItem);

    updateLocalStorage();
    resetFormValue();
});

cancelBtn.addEventListener("click", () => {
    resetFormValue();
});
