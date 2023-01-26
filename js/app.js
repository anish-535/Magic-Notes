//Display notes after the page is refreshed
shownotes();

//If user adds a note add it to the local storage
let addBtn = document.getElementById("addBtn")
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt")
    let addTitle = document.getElementById("addTitle")
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    myObj={
        title:addTitle.value,
        text:addTxt.value
    }
    notesObj.push(myObj)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value="";
    console.log(notesObj);
    shownotes();

})

//function to show notes by reading them from the local storage
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let html = "";
    notesObj.forEach(function (element, index) {

        html += `<div class=" noteCard card mx-2 my-2" style="width: 18rem;">

                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`
    })

    let notesElem = document.getElementById("notes")
    if(notesObj.length!=0){
        notesElem.innerHTML=html
    }
    else{
        notesElem.innerHTML=`Nothing to Show`
    }

}

//function to delete a note
function deleteNote(index){
    console.log('I am deleting', index)
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }

    notesObj.splice(index,1)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes()
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){
    
    let inputValue=search.value
    console.log("Input Event fired", inputValue)
    let noteCards = document.getElementsByClassName("noteCard")
    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        //console.log(cardTxt)
        if(cardTxt.includes(inputValue)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })

})