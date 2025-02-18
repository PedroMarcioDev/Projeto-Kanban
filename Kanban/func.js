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
        saveNotes();
    }
}

function saveNotes(){
    localStorage.setItem('notes', JSON.stringify(notes));
}

function displayNotes() {
    columns.forEach(column => column.innerHTML = column.querySelector('h3').outerHTML);
    notes.forEach((note, index) =>{
        const noteElement = document.createElement('div');
        noteElement.classList.add('task');
        noteElement.id = `note-${index}`;
        noteElement.draggable = true;
        noteElement.ondragstart = drag;
        noteElement.innerHTML = `
        <h2>${note.title}</h2>
        <p>${note.description}</p>
        `;
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', (e) =>{
            e.stopPropagation();
            deleteNote(index);
        });

        noteElement.appendChild(editButton);
        noteElement.appendChild(deleteButton);
        columns[0].appendChild(noteElement);

    });
}

//Função para notificação
function add(){
    if (noteTitle.value.trim() === '' || noteDescription.value.trim() === '' ) {
        alert ('Verifique o titulo ou a anatoção se está em branco.');
        return;
    }
    const note = {
        title: noteTitle.value,
        description: noteDescription.value,
    };

    if (editIndex === -1) {
        notes.push(note);
    } else {
        notes[editIndex] = note;
        editIndex = -1;
    }

    saveNotes();
    displayNotes();
    noteTitle.value = '';
    noteDescription.value = '';

}
