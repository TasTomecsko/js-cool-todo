var createButton = document.getElementById("createBtn");
var newTodo = document.getElementById("todoText");
var inputField = document.getElementById("input");

var i = 0;
var todos = [];

for (let j = 0; j < localStorage.length; j++) {
    todos.push(localStorage.getItem(j));
}

for (let j = 0; j < todos.length; j++) {
    inputField.insertAdjacentHTML('afterend', 
        '<div class="todo-item"><div class="todo-elements"><h2 class="todo-text" name="' + j + '">' + JSON.parse(todos[j]).text + 
        '</h2><div class="btn-holder"><button id="' + j + '" class="todo-del-btn" type="button" onClick="del(this.id)">Delete</button></div>' + 
        '<div class="btn-holder"><button id="' + j + '" class="todo-done-btn" type="button" onClick="done(this.id)">Done</button></div></div></div>'
    );
}

checkForAllDone();

createButton.onclick = function() {
    i = localStorage.length;
    if(newTodo.value == "" || newTodo.value == null) {
        alert("Todo field is empty! Write something to create a todo element.");
        return;
    }
    inputField.insertAdjacentHTML('afterend', 
        '<div class="todo-item"><div class="todo-elements"><h2 class="todo-text" name="' + i + '">' + newTodo.value + 
        '</h2><div class="btn-holder"><button id="' + i + '" class="todo-del-btn" type="button" onClick="del(this.id)">Delete</button></div>' + 
        '<div class="btn-holder"><button id="' + i + '" class="todo-done-btn" type="button" onClick="done(this.id)">Done</button></div></div></div>'
    );

    var data = {
        text: newTodo.value,
        isDone: false
    };

    localStorage.setItem(i, JSON.stringify(data));
    newTodo.value = "";
    i++;
};

function done(clicked_id) {
    var oldData = JSON.parse(localStorage.getItem(clicked_id));
    
    var text = document.getElementsByName(clicked_id)[0];
    if (JSON.parse(oldData.isDone == false)) {
        text.classList.add('done');
        var newData = {
            text: oldData.text,
            isDone: true
        }
        localStorage.setItem(clicked_id, JSON.stringify(newData));
    }
    if (JSON.parse(oldData.isDone == true)) {
        text.classList.remove('done');
        var newData = {
            text: oldData.text,
            isDone: false
        }
        localStorage.setItem(clicked_id, JSON.stringify(newData));
    }
}

function del(clicked_id) {
    var lostId = clicked_id;
    var allTodos = [];
    var newTodos = [];

    for (let j = 0; j < localStorage.length; j++) {
        allTodos.push(localStorage.getItem(j));
    }

    localStorage.clear();

    for (let j = 0; j < allTodos.length; j++) {
        if (j != lostId) {
            var element = JSON.parse(allTodos[j]);
            var newElement = {
                text: element.text,
                isDone: element.isDone
            }
            newTodos.push(newElement)
        }
    }

    for (let j = 0; j < newTodos.length; j++) {
        localStorage.setItem(j, JSON.stringify(newTodos[j]));
    }
    location.reload();
    checkForAllDone();
}

function checkForAllDone() {
    for (let j = 0; j < localStorage.length; j++) {

        var storedData = JSON.parse(localStorage.getItem(j));
        var text = document.getElementsByName(j)[0];

        if (JSON.parse(storedData.isDone == true)) {
            text.classList.add('done');
        }
    }
}