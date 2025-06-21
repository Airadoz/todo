const modal_open = document.querySelector(".open_modal");
const modal_template = document.querySelector(".add_todo_template");
const modal_clone = modal_template.content.cloneNode(true);
const modal = modal_clone.querySelector("dialog");
const modal_close = modal.querySelector(".cancel_btn");
const modal_form = modal.querySelector("form");

const todos_wrapper = document.querySelector(".todos_wrapper");

let todos = [
    {
        title: "Your first todo!",
        description: "Your first todo's description",
        status: "Haven't started yet",
    },
];

function todo_constructor(name, desc, status) {
    const todo_name = name;
    const todo_desc = desc;
    const todo_status = status;

    return { todo_name, todo_desc, todo_status };
}
function get_todo_data(modal) {
    const todo_name = modal.querySelector("#title").value;
    const todo_desc = modal.querySelector("#description").value;
    const todo_status = modal.querySelector("#status").value;

    return todo_constructor(todo_name, todo_desc, todo_status);
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
});

todos_wrapper.append(modal_clone);
