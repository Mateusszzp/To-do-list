{

    let tasks = [];
    let hideDoneTasks = false;



    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent},
        ];

        render();

    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
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
        </button>
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

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        };
        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };
    
    init();

}
