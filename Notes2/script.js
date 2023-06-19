const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    popupTitle = document.querySelector("header p"),

    closeIcon = popupBox.querySelector("header i"),
    titleTag = popupBox.querySelector("input"),
    descTag = popupBox.querySelector("textarea"),
    addBtn = popupBox.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const notes2 = JSON.parse(localStorage.getItem("notes2") || "[]");

let isUpdate=false,updateId;

addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value="";
    descTag.value="";
    addBtn.innerText="Add Note";
    popupTitle.innerText="Add a new Note";
    popupBox.classList.remove("show");
});


function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes2.forEach((note,index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index},'${note.title}','${note.description}')"><i class="uil uil-pen">Edit</i></li>
                                    <li onclick="deleteNote(${index})"><i class="uil uil-trash">Delete</i></li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend",liTag);
    });
}

showNotes();

function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click", (e)=>{
        if (e.target.tagName!= "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId){
    let confirmDel= confirm("Are you sure you want to delete this note?");
    if (!confirmDel) return;
    notes2.splice(noteId,1);
    localStorage.setItem("notes2", JSON.stringify(notes2));
    showNotes();
}

function updateNote(noteId,title,desc){
    isUpdate=true;
    updateId=noteId;
    addBox.click();
    titleTag.value=title;
    descTag.value=desc;
    addBtn.innerText="Update Note";
    popupTitle.innerText="Update a Note";
}




addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let noteTitle = titleTag.value,
        noteDesc = descTag.value;

    if (noteTitle || noteDesc) {
        let dateObj = new Date(),
            month = months[dateObj.getMonth()],
            day = dateObj.getDate(),
            year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }

        if (!isUpdate){
            notes2.push(noteInfo);
        }else{
            isUpdate=false;
            notes2[updateId]=noteInfo;
        }
        
        localStorage.setItem("notes2", JSON.stringify(notes2));
        closeIcon.click();
        showNotes();
    }
});