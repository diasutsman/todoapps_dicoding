const STORAGE_KEY = "TODO_APPS"
let todos = []

function isStorageExist() /*: Boolean */ {
    if(typeof Storage === 'undefined') {
        alert('Browser tidak mendukung local storage')
        return false
    }return true
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    document.dispatchEvent(new Event('ondatasaved'))
}

function loadDataFromStorage() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (data)todos = data
    document.dispatchEvent(new Event('ondataloaded'))
}

function updateDataToStorage() {
    if(isStorageExist())saveData()
}

function composeDataToObject(task, timestamp, isCompleted) {
    return {
        id: +new Date(),
        task,
        timestamp,
        isCompleted
    }
}

function findTodo(todoId) {
    return todos.find(({id}) => id == todoId) || null
}

function refreshDataFromTodos() {
    todos.forEach(({id, task, timestamp, isCompleted}) => {
        const newTodo = makeTodo(task, timestamp, isCompleted)
        newTodo[TODO_ITEMID] = id;
        (isCompleted? listCompleted : listUncompleted).append(newTodo)
    })
}

function findTodoIndex(todoId) {
    return todos.findIndex(({id}) => id == todoId)
}
