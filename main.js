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
const table_view_item_template = document.querySelector(".table_view_item_template");


const set_grid_view = document.querySelector(".set_grid_view");
const set_table_view = document.querySelector(".set_table_view");

const todo_item_template = document.querySelector(".todo_item_template");

let grid_view = true;

let todos = [
    {
        title: "Your first todo!",
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

function display_todos(arr) {
    grid_view_wrapper.innerHTML = "";
    list_view_wrapper.innerHTML = "";
    if (Array.isArray(arr) && arr.length !== 0) {
        arr.forEach((todo) => {
            const todo_item_copy = todo_item_template.content.cloneNode(true);
            let todo_item = todo_item_copy.querySelector(".todo_item");
            todo_item.querySelector(".title").innerHTML = todo.title;
            todo_item.querySelector(".description").innerHTML =
                todo.description;
            todo_item.querySelector(".status").innerHTML = todo.status;
            if (grid_view) {
                grid_view_wrapper.append(todo_item);
            } else {
                list_view_wrapper.append(todo_item);
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
    let new_todo = get_todo_data(modal);
    todos.push(new_todo);
    console.log(todos);
    display_todos(todos);
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
