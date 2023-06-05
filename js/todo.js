const todoForm = document.getElementById("todo-form");
// todo-form의 id를 #로 표현
// const todoInput = document.querySelector("#todo-form input");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
let toDos = [];
let ClickedDate;

function TodoList(date) {
    this.date = date;
    this.todos = [];
}

const todoLists = [];


function saveToDos() {
    // localStorage.setItem("todos", toDos);
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
    // console.log("save" +  JSON.stringify(toDos));
    localStorage.setItem("todoLists",JSON.stringify(todoLists));
}

function deleteToDo(event) {

    //event는 버튼 클릭하면 받는 default param이고 event.target은 버튼이 된다.
    //target.parentElement는 li로 우리가 없애고자 하는 list니까
    //const li로 받아서 remove해주면 행이 사라진다.
    const li = event.target.parentElement;

    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));

    console.log(toDos);

    li.remove();
    saveToDos();
}


function paintToDo(newTodo) {
    const todo_cur_li = document.createElement("li");
    todo_cur_li.id = newTodo.id;
    const todo_cur_span = document.createElement("span");
    todo_cur_span.innerText = newTodo.text;

    const todo_cur_remove_btn = document.createElement("button");

    todo_cur_remove_btn.innerText = "X";
    todo_cur_remove_btn.addEventListener("click", deleteToDo);

    todo_cur_li.appendChild(todo_cur_span);
    todo_cur_li.appendChild(todo_cur_remove_btn);
    todoList.appendChild(todo_cur_li);

}

// 새로운 Todo 추가 함수
function addNewTodo(date, newTodo) {
    // 해당 날짜의 TodoList 찾기
    let curTodoList = todoLists.find(list => list.date === date);

    // 날짜별 TodoList가 없는 경우 새로 생성
    if (!curTodoList) {
        curTodoList = new TodoList(date);
        todoLists.push(curTodoList);
    }

    // TodoList에 Todo 추가
    curTodoList.todos.push(newTodo);
}


function handleToDoSummit(event) {
    event.preventDefault();

    const newTodo = todoInput.value;
    // todo input을 reset함
    todoInput.value = "";

    const newTodoObj = {
        id: Date.now(),
        text: newTodo,
    };

    toDos.push(newTodoObj);
    addNewTodo(ClickedDate,newTodoObj);

    paintToDo(newTodoObj);
    saveToDos();
}

todoForm.addEventListener("submit", handleToDoSummit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    console.log(savedToDos);

    const parsedToDos = JSON.parse(savedToDos);
    // console.log(parsedToDos);

    //화면이 refresh될떄마다 맨위에 줄에서 toDos가 []로 초기화 된다.
    //toDos는 누적되서 계속 todo를가지고 있는 array여서 기존에 있던 todo를
    //유지하고 싶으면 맨처음 기존 todo를 로드할때도 toDos를 업데이트 해줘야 한다.
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);



}

export function setClickedDate(date) {
    ClickedDate = date;
}