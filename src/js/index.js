const notesContainer = document.getElementById("app");
const inputContainer = document.getElementsByClassName("form-style");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("styckynotes-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("styckynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const element = document.createElement("form");
  element.classList.add("list-style");
  element.classList.add("lightBackground");

  const inputName = document.createElement("input");
  inputName.type = "text";
  inputName.name= "text";
  inputName.classList.add("input-style");

  const inputContent = document.createElement("input");
  inputContent.type = "text";
  inputContent.name= "text";
  inputContent.classList.add("input-style");

  const inputDates = document.createElement("input");
  inputDates.type = "text";
  inputDates.name= "text";
  inputDates.classList.add("input-style");

  const svgEdit =document.createElement("svg");
  svgEdit.classList.add("icon");
  svgEdit.classList.add("greyBackground"); 

  const useEdit = document.createElement("use");
  useEdit.setAttribute("htef", "../symbol-defs.svg#icon-cloud_download");
  useEdit.classList.add("icon");
  useEdit.classList.add("greyBackground");
  svgEdit.appendChild(useEdit);


  
  element.prepend(inputName, inputContent, inputDates, svgEdit);

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });
  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to deletethis stycky note?  "
    );
    if (doDelete) {
      deleteNote(id, element);
    }
  });
  return element;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id === id)[0];
  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id !== id);
  saveNotes(notes);
  notesContainer.removeChild(element);
}
