const form=document.getElementById("todo-form");
const todoInput=document.getElementById("todo");
const ul =document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.getElementById("filter");
const clearButton=document.getElementById("clear-todos");
const addTodoButton=document.getElementById("add-todo");

addEventListeners();

function addEventListeners(){

    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteItem);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
};
function clearAllTodos(){
    if(confirm("Tümünü Silmek İstediğinize Emin Misiniz?")){
        while(ul.firstChild !=null){
            ul.removeChild(ul.firstChild);
        }
        localStorage.removeItem("todos");       
    }
    
}

function filterTodos(e){
   
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(item){
        const text = item.textContent.toLowerCase();

        if(text.indexOf(filterValue) != -1){
            //Bulduysa
                item.setAttribute("style","display:block");
            }else{
                //Bulamadıysa
                item.setAttribute("style","display:none  !important");
                }
                });
       
                
}

function deleteItem(e){
     if(e.target.className==="fa fa-remove"){            //Li'yi silebilmek için ulaştığımız ikonun parentini 
        e.target.parentElement.parentElement.remove();              // ve onun da parentini secip sildik.
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","To Do Başarıyla Silindi !! ");
    }
}

function deleteTodoFromStorage(deleteTodo){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo===deleteTodo){
            todos.splice(index,1);
            localStorage.setItem("todos",JSON.stringify(todos));   
            }
       
    })
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })

}
function addTodo(e){    
        const newTodo=todoInput.value.trim();
        const oldTodo = getTodosFromStorage();
        if(newTodo===""){
          showAlert("danger","Lütfen Bir Todo Girin.");   
        }
        else if (oldTodo.includes(newTodo)) {
            showAlert("warning","Bu Todo Daha Önce Girilmiş");
        }

        else if(!(newTodo==="")){
            showAlert("success","Todo Eklendi.");
            addTodoToUI(newTodo);
            addTodoToStorage(newTodo);
        } 
        
    e.preventDefault();
};

function showAlert(type,message){
   const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    console.log(alert);

    firstCardBody.appendChild(alert);
    setTimeout(()=>{
        alert.remove();
    },2000);
 }

function addTodoToUI(newTodo){ //Aldığu değeri list item olarak ekleyecek

   /* <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li> */
   const listItem=document.createElement("li");
   const link=document.createElement("a"); 
   link.href="#";
   link.className="delete-item";
   link.innerHTML="<i class = 'fa fa-remove'></i>";
   listItem.className="list-group-item d-flex justify-content-between";

   //Text Node Ekleme
   listItem.appendChild(document.createTextNode(newTodo));
   listItem.appendChild(link);

   //UL ye li ekleme
   ul.appendChild(listItem);
   
   console.log(listItem);

   todoInput.value="";
}
function getTodosFromStorage(){

    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));

    }
    return todos;
}

function addTodoToStorage(newTodo){
   let todos= getTodosFromStorage()
   todos.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todos));
}

