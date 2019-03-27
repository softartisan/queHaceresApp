


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
    const labelTodo = document.createElement('label');
    const containerTodo = document.createElement('div');
    const pText = document.createElement('span');
    const buttonDelete = document.createElement('button');
    const checkDelete = document.createElement('input');

    labelTodo.classList.add('list-item');
    pText.textContent = todo.text;
    buttonDelete.textContent = 'Eliminar';
    buttonDelete.classList.add('button','button--text');
    checkDelete.checked = todo.completed;
    checkDelete.setAttribute('type','checkbox');
    containerTodo.classList.add('list-item__container');

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

    
    containerTodo.appendChild(checkDelete);
    containerTodo.appendChild(pText);
    containerTodo.appendChild(buttonDelete);

    labelTodo.appendChild(containerTodo);
   
    return labelTodo;
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
    h2Summary.classList.add('list-title');
    h2Summary.textContent = incompleteTodos.length === 1 ? 'Tienes 1 cosa que hacer.' :`Tienes ${incompleteTodos.length} cosas que hacer.`;
    
    return h2Summary;
}

//Renderizar todos basado en los filtros
const renderTodos = function (todos, filters) {
    const divTodos =  document.querySelector('#todos');

    const filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    }).filter((todo) =>{
        return !filters.hideCompleted || !todo.completed ;
    });

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed;
    });

    divTodos.innerHTML = '';

    const h2Summary = generateSummaryDOM(incompleteTodos);
    document.querySelector('#todos').appendChild(h2Summary);
    if(filteredTodos.length === 0){
        const p = document.createElement('p');
        p.classList.add('empty-message');
        p.textContent = "No hay quehaceres para mostrar.";
        divTodos.appendChild(p);
    }
    else{
        filteredTodos.forEach(function (todo) {
            pTodo = generateTodoDOM(todo);
            divTodos.appendChild(pTodo);
        });
    }
    
}
