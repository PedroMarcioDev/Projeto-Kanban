//Função para as notas
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editIndex = -1;
const noteTitle = document.querySelector('#note-title');
const addNoteBtn = document.querySelector('#add-note-btn');
const columns = document.querySelectorAll('.column');

//Função para o arrasto das notas
function allowDrop(ev) {
    ev.preventDefault();    
}

function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var task = document.getElementById(data);
    var targetColumn = ev.target;
    while (targetColumn && !targetColumn.classList.contains('column')){}

    if (targetColumn) {
        targetColumn.appendChild(task);
    }
}

