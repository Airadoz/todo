const modal_open = document.querySelector(".open_modal");
const modal_template = document.querySelector(".add_todo_template");
const modal_clone = modal_template.content.cloneNode(true);
const modal = modal_clone.querySelector("dialog");
const modal_close = modal.querySelector(".cancel_btn");
const modal_form = modal.querySelector("form");

const todos_wrapper = document.querySelector(".todos_wrapper");
const grid_view_wrapper = document.querySelector(".grid_view_wrapper");
const list_view_wrapper = document.querySelector(".list_view_wrapper");

const table_view_template = document.querySelector(".table_view_template");
const table_view_item_template = document.querySelector(
    ".table_view_item_template"
);

const set_grid_view = document.querySelector(".set_grid_view");
const set_table_view = document.querySelector(".set_table_view");

const todo_item_template = document.querySelector(".todo_item_template");

let grid_view = true;
let editing = false;
let currently_editing = 0;

let todos = [
    {
        title: "Your first todo!1",
        description: "Your first todo's description",
        status: "Haven't started yet",
    },
    {
        title: "Your first todo!2",
        description: "Your first todo's description",
        status: "Haven't started yet",
    },
    {
        title: "Your first todo!3",
        description: "Your first todo's description",
        status: "Haven't started yet",
    },
    {
        title: "Your first todo!4",
        description: "Your first todo's description",
        status: "Haven't started yet",
    },
    {
        title: "Your first todo!5",
        description: "Your first todo's description",
        status: "Haven't started yet",
    },
];

function todo_constructor(name, desc, status) {
    const title = name;
    const description = desc;
    // const status = status;

    return { title, description, status };
}
function get_todo_data(modal) {
    const todo_name = modal.querySelector("#title").value;
    const todo_desc = modal.querySelector("#description").value;
    const todo_status = modal.querySelector("#status").value;

    return todo_constructor(todo_name, todo_desc, todo_status);
}
function set_todo_data(modal, arr, id) {
    modal.querySelector("#title").value = arr[id].title;
    modal.querySelector("#description").value = arr[id].description;
    switch (arr[id].status) {
        case "Haven't started yet":
            modal.querySelector("#status").value = "not_started";
            break;
        case "In process":
            modal.querySelector("#status").value = "started";
            break;
        case "Finished":
            modal.querySelector("#status").value = "finished";
            break;
    }
    // return todo_constructor(todo_name, todo_desc, todo_status);
}

function delete_todo(arr, id) {
    if (Array.isArray(arr) && arr.length !== 0 && typeof id === "number") {
        arr.splice(id, 1);
        display_todos(arr);
        console.log("deleted");
    }
}
function edit_todo(arr, id) {
    if (Array.isArray(arr) && arr.length !== 0 && typeof id === "number") {
        let edit = get_todo_data(modal)
        arr[id].title = edit.title;
        arr[id].description = edit.description;
        // arr[id].status = edit.status;
        switch (edit.status) {
            case "not_started":
                arr[id].status = "Haven't started yet";
                break;
            case "started":
                arr[id].status = "In process";
                break;
            case "finished":
                arr[id].status = "Finished";
                break;
        }

        // let title = modal.querySelector("");
        editing = false;
        currently_editing = 0;
        display_todos(todos);
    }
}

function display_todos(arr) {
    grid_view_wrapper.innerHTML = "";
    list_view_wrapper.innerHTML = "";

    if (Array.isArray(arr) && arr.length !== 0) {
        const table_view_template_copy =
            table_view_template.content.cloneNode(true);
        const table_body = table_view_template_copy.querySelector("tbody");

        arr.forEach((todo, index) => {
            if (grid_view) {
                const todo_item_copy =
                    todo_item_template.content.cloneNode(true);
                let todo_item = todo_item_copy.querySelector(".todo_item");
                todo_item.querySelector(
                    ".title"
                ).innerHTML = `<b>Todo title</b>: ${todo.title}`;
                todo_item.querySelector(
                    ".description"
                ).innerHTML = `<b>Todo description</b>: ${todo.description}`;
                todo_item.querySelector(
                    ".status"
                ).innerHTML = `<b>Todo status</b>: ${todo.status}`;
                todo_item.setAttribute("data-id", index);
                const edit_btn = todo_item.querySelector(".edit");
                const delete_btn = todo_item.querySelector(".delete");

                edit_btn.addEventListener("click", () => {
                    editing = true;
                    currently_editing = index;
                    modal.showModal();
                    set_todo_data(modal, todos, index);

                    console.log("Edit");
                });
                delete_btn.addEventListener("click", () => {
                    delete_todo(todos, index);
                });
                grid_view_wrapper.append(todo_item);
            } else {
                const table_item_copy =
                    table_view_item_template.content.cloneNode(true);
                const table_item = table_item_copy.querySelector("tr");

                table_item.querySelector(".title").innerHTML = todo.title;
                table_item.querySelector(".description").innerHTML =
                    todo.description;
                table_item.querySelector(".status").innerHTML = todo.status;
                table_item.setAttribute("data-id", index);

                const edit_btn = table_item.querySelector(".edit");
                const delete_btn = table_item.querySelector(".delete");

                edit_btn.addEventListener("click", () => {
                    editing = true;
                    currently_editing = index;
                    set_todo_data(modal, todos, index);

                    modal.showModal();
                    console.log("Edit");
                });
                delete_btn.addEventListener("click", () => {
                    delete_todo(todos, index);
                });

                table_body.append(table_item);
                list_view_wrapper.append(table_view_template_copy);
            }
        });
    }
}

modal_open.addEventListener("click", () => {
    modal.showModal();
});
modal_close.addEventListener("click", () => {
    modal.close();
});
modal_form.addEventListener("submit", () => {
    if (!editing) {
        let new_todo = get_todo_data(modal);
        todos.push(new_todo);
        console.log(todos);
        display_todos(todos);
    } else {
        edit_todo(todos, currently_editing);
    }
    modal_form.reset();
});

set_grid_view.addEventListener("click", () => {
    grid_view = true;
    display_todos(todos);
});
set_table_view.addEventListener("click", () => {
    grid_view = false;
    display_todos(todos);
});

todos_wrapper.append(modal_clone);
display_todos(todos);
