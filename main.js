const madal_open = document.querySelector(".open_modal");
const modal_template = document.querySelector(".add_todo");
const modal_clone = modal_template.content.cloneNode(true);
const modal_dialog = modal_clone.querySelector("dialog");

let todos = [
    {
        title: "Your first todo!",
        description: "Your first todo's description",
        status: "Haven't started yet",
    },
];
