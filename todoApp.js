let todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
};


document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
});

document.querySelector('#formTodo').addEventListener('submit',(e) => {

    e.preventDefault(); //Evito el evento default

    todos.push({
        id: uuidv4(),
        text: e.target.elements.textTodo.value,
        completed: false
    }); //Agrego el objeto al array todos

    saveTodos(todos);

    renderTodos(todos,filters); //Re-renderizo la lista 

    e.target.elements.textTodo.value = ''; //Limpio el valor del input

});


document.querySelector('#checkHideCompleted').addEventListener('change',(e) =>{
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
});


//App
renderTodos(todos, filters);