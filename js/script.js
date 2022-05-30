{

    let tasks = [];
    let hideDoneTasks = false;



    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, }
        ]
        console.log(tasks)
        render();

    }
    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.splice(0, taskIndex),
            ...tasks.splice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };
    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task, 
            done: true,
        }));

        render();
    };
    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;

        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };
    const bindToggelDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };



    const renderTasks = () => {
        const taskToHTML = task => `
        <li 
         class="tasks__display ${task.done && hideDoneTasks ? "tasks__display--hidden" : ""} js-tasks">
         <button class="js-done task__done--button">${task.done ? "✔" : ""}</button>
         <span class="list__item ${task.done ? "list__item--done" : ""}">${task.content}</span>
         <button class="js-remove task__remove--button">🗑</button>
        
        </li>
        `;

        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    };


    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        };

        buttonsElement.innerHTML = `
        <button class="buttons__button js-toggleHideDoneTasks">
           ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </buttons>
        <button class="buttons__button js-markAllDone"
          ${tasks.every(({ done }) => done) ? "disabled" : ""}>
        Ukończ Wszystkie
        </button>
        `;
    };

    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTasksDone);
        };

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        };
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindButtonsEvents();
        bindToggelDoneEvents();
        bindRemoveEvents();
    };
    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        console.log(newTaskContent);

        const newTaskInput = document.querySelector(".js-newTask");
        newTaskInput.focus();

        const cleanTaskInput = document.querySelector(".js-newTask")
        cleanTaskInput.value = null;

        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);


    };
    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };
    init()

}
