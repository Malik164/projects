/* make a function that will execute when user fill up text area and its data will be stored in local storage
addNoteBtn is that button of text area on which user click and add value of textarea
inputNoteTxt is the value of textarea
clientNotes is name of local storage key that have a value of an array named notesObj whoso value is equal to the value of text area 
*/
showNotesfunc();
// this function is firstly executed that will be show the values of locla storage even refreshing web pages

let addNoteBtn = document.getElementById('addNoteBtn');
addNoteBtn.addEventListener('click', function (e) {
    let inputNoteTxt = document.getElementById('inputNoteTxt');
    let clientNotes = localStorage.getItem('clientNotes');
    if (clientNotes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(clientNotes);
    }
    notesObj.push(inputNoteTxt.value);
    localStorage.setItem('clientNotes', JSON.stringify(notesObj));
    inputNoteTxt.value = "";
    console.log(notesObj);
    showNotesfunc();
});
// write a function that will be show the notes of client
function showNotesfunc() {
    let inputNoteTxt = document.getElementById('inputNoteTxt');
    let clientNotes = localStorage.getItem('clientNotes');
    if (clientNotes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(clientNotes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
    <div class="card my-2 mx-2 note-card chngBG" style="width: 18rem;" id="chngBG">
        <div class="card-body" 
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text"><div style="color:red, outline:none" class="mx-3 my-3" ><span class="chkChngTxt">Mark as Important!</span> 
          <input  type="checkbox" id="${index}" class="box" onclick="markfunc(this.id)" >
          </div> ${element}</p>
          <button href="#" id="${index}" onclick="delNote(this.id)" class="btn btn-primary">Delete this Note</button>
        </div>
      </div>`;
    });
    let writtenNotes = document.getElementById('writtenNotes');
    if (notesObj.length != 0) {
        writtenNotes.innerHTML = html;
    }
    else {
        writtenNotes.innerHTML = `Nothing to showup here because you have not added any notes yet`;
    }
};
// function to delet written notes
function delNote(index) {
    let inputNoteTxt = document.getElementById('inputNoteTxt');
    let clientNotes = localStorage.getItem('clientNotes');
    if (clientNotes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(clientNotes);
    };
    notesObj.splice(index, 1);
    localStorage.setItem('clientNotes', JSON.stringify(notesObj));
    showNotesfunc();
}
// function for search notes including value
let inputSearch = document.getElementById('inputSearch');
let searchBtn = document.getElementById('searchBtn');
inputSearch.addEventListener("input", function () {
    let inputVal = inputSearch.value.toLowerCase();
    let noteCard = document.getElementsByClassName('note-card');
    Array.from(noteCard).forEach(function (element) {
        let noteTxt = document.getElementsByTagName('p')[0].innerHTML;
        if (noteTxt.includes(inputVal)) {
            element.style.display = 'block';

        } else {

            element.style.display = 'none';
        }

    });
    console.log(inputVal);
});

                    // fuction of mark as important
function markfunc(index) {
    console.log('cheked at', index);
    let box= document.getElementsByClassName('box')[index];
    console.log(box);
    if (box.checked) {
        let chngBG= document.getElementsByClassName('chngBG')[index];
        chngBG.style.backgroundColor='#ffcccb';
        let chkChngTxt= document.getElementsByClassName('chkChngTxt')[index];
        chkChngTxt.innerHTML="Marked as important";
        chkChngTxt.style.color="darkorange";
    } else {
        let chngBG= document.getElementsByClassName('chngBG')[index];
        chngBG.style.backgroundColor='white';
        let chkChngTxt= document.getElementsByClassName('chkChngTxt')[index];
        chkChngTxt.innerHTML="Mark as important";
        chkChngTxt.style.color="black";

    }

};