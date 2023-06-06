const todoForm = document.getElementById("todo-form");
// todo-form의 id를 #로 표현
// const todoInput = document.querySelector("#todo-form input");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");
const curDateDisplay = document.getElementById("cur_date");


const TODOS_KEY = "todos";
const TODOSLIST_KEY = "todoLists";
// let toDos = [];
let CurrentDate;

function TodoList(date) {
    this.date = date;
    this.todos = [];
}

const todoLists = [];


function saveToDos() {
    // localStorage.setItem("todos", toDos);
    // localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
    // console.log("save" +  JSON.stringify(toDos));
    localStorage.setItem(TODOSLIST_KEY,JSON.stringify(todoLists));
}

function deleteToDo(event) {

    //event는 버튼 클릭하면 받는 default param이고 event.target은 버튼이 된다.
    //target.parentElement는 li로 우리가 없애고자 하는 list니까
    //const li로 받아서 remove해주면 행이 사라진다.
    const li = event.target.parentElement;

    // toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    todoLists.forEach(todoList => {
        todoList.todos = todoList.todos.filter(todo => todo.id !== parseInt(li.id));
    });

    console.log(todoLists);
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

    // toDos.push(newTodoObj);
    addNewTodo(CurrentDate,newTodoObj);

    paintToDo(newTodoObj);
    saveToDos();
}

todoForm.addEventListener("submit", handleToDoSummit);

// const savedToDos = localStorage.getItem(TODOS_KEY);

// if (savedToDos !== null) {
//     console.log(savedToDos);

//     const parsedToDos = JSON.parse(savedToDos);
//     // console.log(parsedToDos);

//     //화면이 refresh될떄마다 맨위에 줄에서 toDos가 []로 초기화 된다.
//     //toDos는 누적되서 계속 todo를가지고 있는 array여서 기존에 있던 todo를
//     //유지하고 싶으면 맨처음 기존 todo를 로드할때도 toDos를 업데이트 해줘야 한다.
//     toDos = parsedToDos;
//     parsedToDos.forEach(paintToDo);



// }

const savedToDosList = localStorage.getItem(TODOSLIST_KEY);
// localStorage에서 받아오면 string으로 받아짐

if(savedToDosList !== null)
{
    console.log("todoList : " + savedToDosList);
// todoList : [{"date":"2023-06-08","todos":[{"id":1686040281658,"text":"1"},{"id":1686040281905,"text":"2"},{"id":1686040282154,"text":"3"},{"id":1686040282970,"text":"4"}]}
// ,{"date":"2023-06-15","todos":[{"id":1686040287049,"text":"5"},{"id":1686040287401,"text":"6"}]}]
// 위와 같은 예시가 있을때

// console.log(typeof(savedToDosList));

    const parsedToDosList = JSON.parse(savedToDosList);

// parsedToDosList JSON으로 변환된 parsedToDosList은 string인savedToDosList 를
//[] 배열로 변경해 준 것이다.
    console.log(typeof(parsedToDosList));

    //배열인 parsedToDosList은 forEach를 돌릴 수 있다. 
    parsedToDosList.forEach(mParsedToDosList => {


        if(mParsedToDosList.date === CurrentDate)
        {

            
            mParsedToDosList.todos.forEach(paintToDo);

        }


    })

}


export function setCurrentDate(date) {
    CurrentDate = date;
    curDateDisplay.textContent = date + " 일정";
    console.log("setCurrentDate is called " + CurrentDate);
}
