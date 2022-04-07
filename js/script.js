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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li
            ${task.done ? " style=\"text-decoration: line-through\"" : ""}>

            ${task.content}
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };
    const addNewTask = () => {
        tasks.puch({
            content: newTaskContent,
        });

        render();
    }
    const init = () => {
        render();
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();
            console.log(newTaskContent)

            if (newTaskContent === "") {
                return;
            }

        });
    };
    init()
}
