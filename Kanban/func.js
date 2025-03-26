console.log("func.js carregando");

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editIndex = -1;
const noteTitle = document.querySelector('#note-title');
const noteDescription = document.querySelector('#note-description');
const addNoteBtn = document.querySelector('#add-note-btn');
const columns = document.querySelectorAll('.column');

//Função para soltar as notas
function allowDrop(ev) {
    ev.preventDefault();
}

//Função para o arrasto das notas
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

//Função para soltar as notas e atualizar a posição
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var task = document.getElementById(data);
    var targetColumn = ev.target;
    while (targetColumn && !targetColumn.classList.contains('column')) {
        targetColumn = targetColumn.parentNode;
    }
    if (targetColumn) {
        targetColumn.appendChild(task);
        saveNotes();
    }
}

//Função que salva as notas na memória!
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

//Função que exibe as notas  e mntem na posição escolhida
function displayNotes() {
    columns.forEach(column => column.innerHTML = column.querySelector('h3').outerHTML);
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('task');
        noteElement.id = `note-${index}`;
        noteElement.draggable = true;
        noteElement.ondragstart = drag;
        noteElement.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.description}</p>
        `;
        
        //Botão de editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', (e) => {
            e.stopPropagation();
            editNote(index);
        });
        
        //Botão de excluir
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteNote(index);
        });
        
        noteElement.appendChild(editButton);
        noteElement.appendChild(deleteButton);
        columns[0].appendChild(noteElement);
    });
}

//Função para notificar se o campo está vazio
function addNote() {
    if (noteTitle.value.trim() === '' || noteDescription.innerHTML.trim() === '') {
        alert('Por favor, preencha tanto o título quanto a descrição.');
        return;
    }
    
    const note = {
        title: noteTitle.value,
        description: noteDescription.innerHTML.trim(),
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
    noteDescription.innerHTML = '';
}

//Função para a edição da nota
function editNote(index) {
    const note = notes[index];
    noteTitle.value = note.title;
    noteDescription.innerHTML = note.description;
    editIndex = index;
}

//Função para deletar a nota
function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    displayNotes();
}

addNoteBtn.addEventListener('click', addNote);
displayNotes();