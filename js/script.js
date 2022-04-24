{

    const tasks = [
        {
            content: "nagrać lekcje",
            done: false,
        },
        {
            content: "zjeść pierogi",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();

    }
    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }
    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render()
    }
    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });


        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }
    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item ${task.done? "list__item--done" : ""}"
            >
            <div class="taskWall">
            <button class="js-done taskDone--button"></button>
            <span class="text">${task.content}</span>
            <button class="js-remove taskRemove--button"></button>
            </li></div>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
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
