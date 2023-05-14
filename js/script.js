const todoForm = document.querySelector(".form"),
    todoInput = document.querySelector(".form input"),
    todosParent = document.querySelector(".list-items");
let todoStore = [];

todoForm.addEventListener("submit", e => {
    e.preventDefault();
    add2TodoStore(todoInput.value);
})

todosParent.addEventListener('click', e => {
    if (e.target.classList.contains('done')) {
        toggleCompleted(e.target.parentElement.getAttribute('data-id'))
    }
    if (e.target.classList.contains('del')) {
        delListItem(e.target.parentElement.getAttribute('data-id'))
    }
});

function add2TodoStore(inputVal) {
    if (inputVal !== "") {
        const todoItem = {
            id: Date.now(),
            txt: inputVal,
            completed: false
        };
        todoStore.push(todoItem);
        todoInput.value = "";
        addStoreToStorage(todoStore);
    }
}

function addStoreToStorage(store) {
    localStorage.setItem('todosStore', JSON.stringify(store));
    PrintToScreen(store);
    countItems();
}

function PrintToScreen(todoStore) {
    todosParent.innerHTML = "";
    todoStore.forEach((item) => {
        let listItem = document.createElement('li');
        listItem.classList.add("list-item");
        listItem.dataset.id = item.id;
        item.completed ? listItem.classList.add("completed") : null;
        listItem.innerHTML = `
            
            <svg xmlns="http://www.w3.org/2000/svg" class="icon done" ><path fill="none"  stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
            <p class="txt">${item.txt}</p>
            <svg xmlns="http://www.w3.org/2000/svg"  class="icon del"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
    
        `;
        todosParent.insertBefore(listItem, todosParent.children[0]);
    })
}

function getTodosFromLoacalStorage() {
    const todosRef = localStorage.getItem('todosStore');
    if (todosRef) {
        todoStore = JSON.parse(todosRef);
        PrintToScreen(todoStore);
    }
}
getTodosFromLoacalStorage()

function toggleCompleted(id) {
    todoStore.forEach(el => {
        el.id == id ? el.completed = !el.completed : null;
        addStoreToStorage(todoStore);
    })
}

function delListItem(id) {
    todoStore = todoStore.filter(el => el.id != id);
    addStoreToStorage(todoStore);
}

function countItems() {
    document.querySelector('.num-items').innerHTML = todoStore.length + " items left";
    if (todoStore.length == 0) {
        document.querySelector(".show-all").classList.add('disabled');
        document.querySelector(".show-active").classList.add('disabled');
        document.querySelector(".show-completed").classList.add('disabled');
        document.querySelector(".clear").classList.add('disabled');
    }else{
        document.querySelector(".show-all").classList.remove('disabled');
        document.querySelector(".show-active").classList.remove('disabled');
        document.querySelector(".show-completed").classList.remove('disabled');
        document.querySelector(".clear").classList.remove('disabled');
    }
};
countItems();

(function clearAllItems() {
    document.querySelector(".clear").addEventListener('click', () => {
        todoStore = [];
        addStoreToStorage(todoStore);
    })
}());

(function showCompletedItems() {
    document.querySelector(".show-completed").addEventListener('click', () => {
        getTodosFromLoacalStorage()
        todoStore = todoStore.filter(item => item.completed ? item : "")
        PrintToScreen(todoStore)
    })
}());

(function showActive() {
    document.querySelector(".show-active").addEventListener('click', () => {
        getTodosFromLoacalStorage()
        todoStore = todoStore.filter(item => !item.completed ? item : "")
        PrintToScreen(todoStore)
    })
}());

(function showAll() {
    document.querySelector(".show-all").addEventListener('click', () => {
        getTodosFromLoacalStorage()
    })
}());

(function toggleMod() {
    let mod = document.body.classList;
    document.querySelector(".toggle-mod").addEventListener('click', (e) => {
        let el = e.target
        mod.toggle('dark-mod')
        localStorage.setItem('dark-mod', mod.contains('dark-mod'));
        if (el.classList.contains('moon')) {
            el.classList.remove('moon');
            el.src = "images/icon-sun.svg";
        } else {
            el.classList.add('moon');
            el.src = "images/icon-moon.svg";
        }
    })
    localStorage.getItem("dark-mod") == "true" ? mod.add('dark-mod'): "";
}());

