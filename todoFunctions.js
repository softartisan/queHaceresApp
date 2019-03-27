


//Capturar datos del localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos');
    try{
        return todosJSON ? JSON.parse(todosJSON) : [];
    }catch(e){
        return [];
    }
   
} 
//Guardar todos en localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos',JSON.stringify(todos));
}

//Get DOM element para cada todo
const generateTodoDOM = (todo) => {
    const divTodo = document.createElement('div');
    const pText = document.createElement('span');
    const buttonDelete = document.createElement('button');
    const checkDelete = document.createElement('input');

    pText.textContent = todo.text;
    buttonDelete.textContent = 'X';
    checkDelete.checked = todo.completed;

    checkDelete.setAttribute('type','checkbox');

    buttonDelete.addEventListener('click',() => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos,filters);
    });

    checkDelete.addEventListener('change',(e) => {
        changeCompleted(todo.id,e.target.checked);
        saveTodos(todos);
        renderTodos(todos,filters);
        console.log('ppp');
    });

    divTodo.appendChild(buttonDelete);
    divTodo.appendChild(pText);
    divTodo.appendChild(checkDelete);
   
    return divTodo;
}

//Remove todo by id
const removeTodo = (id) =>{
    const todoIndex = todos.findIndex((todo) =>{
        return todo.id === id;
    });

    if(todoIndex > -1) todos.splice(todoIndex,1);
}

const changeCompleted = (id,isChecked) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo.id === id;
    });

    todos[todoIndex].completed = isChecked;
}

//Get DOM element para el sumario
const generateSummaryDOM = (incompleteTodos) => {
    h2Summary = document.createElement('h2');
    h2Summary.textContent = `Tienes ${incompleteTodos.length} cosas que hacer`;
    return h2Summary;
}

//Renderizar todos basado en los filtros
const renderTodos = function (todos, filters) {

    const filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    }).filter((todo) =>{
        return !filters.hideCompleted || !todo.completed ;
    });

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed;
    });

    document.querySelector('#todos').innerHTML = '';

    const h2Summary = generateSummaryDOM(incompleteTodos);
    document.querySelector('#todos').appendChild(h2Summary);

    filteredTodos.forEach(function (todo) {
        pTodo = generateTodoDOM(todo);
        document.querySelector('#todos').appendChild(pTodo);
    });
}
