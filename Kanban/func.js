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
    const noteId = ev.dataTransfer.getData("text");
    const task = document.getElementById(noteId);


    let targetColumn = ev.target;
    while (targetColumn && !targetColumn.classList.contains('column')) {
        targetColumn = targetColumn.parentNode;
    }
    if (targetColumn) {
        const noneIndex = parseInt(noteId.split('-')[1]);
        const columnIndex = Array.from(columns ).indexOf(targetColumn);
        notes[noteIndex].columnIndex = columnIndex;
        saveNotes();
        displayNotes();
    }
}

//Função que salva as notas na memória!
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

//Função que limpa o formulário após salvar
function resetForm(){
    noteTitle.value = '';
    noteDescription.innerHTML = '';
    noteColor.value = '#2579e7e0';
    editIndex = -1;
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
        noteElement.style.backgroundColor = note.color

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
        columns[note.columnIndex || 0].appendChild(noteElement);
    });
}

//Função para notificar se o campo está vazio
function addNote() {
    if (noteTitle.value.trim() === '' || noteDescription.innerHTML.trim() === '') {
        alert('Por favor, preencha tanto o título quanto a descrição.');
        return;
    }
    
    const noteData = {
        title: noteTitle.value,
        description: noteDescription.innerHTML.trim(),
        color: noteColor.value,
        columnIndex: 0
    };
    
    if (editIndex === -1) {
        notes.push(noteData);
    } else {
        noteData.columnIndex = notes[editIndex].columnIndex;
        notes[editIndex] = noteData;
    }
    
    saveNotes();
    displayNotes();
   resetForm();
}

//Função para a edição da nota
function editNote(index) {
    const note = notes[index];
    noteTitle.value = note.title;
    noteDescription.innerHTML = note.description;
    noteColor.value = note.color;
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