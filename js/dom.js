const UNCOMPLETED_TODO_ID = 'todos'
const COMPLETED_LIST_TODO_ID = 'completed-todos'
const TODO_ITEMID = 'itemid'
const listUncompleted = document.getElementById(UNCOMPLETED_TODO_ID)
const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID)
function addTodo() {

    const textTodo = document.getElementById('title').value
    const timestamp = document.getElementById('date').value
    console.log(`todo: ${textTodo}`)
    console.log(`timestamp: ${timestamp}`)
    const todo = makeTodo(textTodo, timestamp, false)
    const todoObject = composeDataToObject(textTodo, timestamp, false)
    todo[TODO_ITEMID] = todoObject.id
    console.log(todo[TODO_ITEMID])
    listUncompleted.append(todo)
    todos.push(todoObject)
    updateDataToStorage()

}

function makeTodo(data, timestamp, isCompleted) {
    const textTitle = document.createElement('h2')
    textTitle.innerText = data

    const textTimestamp = document.createElement('p')
    textTimestamp.innerText = timestamp

    const textContainer = document.createElement('div')
    textContainer.classList.add('inner')
    textContainer.append(textTitle, textTimestamp)

    const container = document.createElement('div')
    container.classList.add('item', 'shadow')
    container.append(textContainer)

    isCompleted? container.append(createUndoButton(), createTrashButton()) : container.append(createCheckButton())
    
    return container
}

//* HOF
function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement('button')
    button.classList.add(buttonTypeClass)
    button.addEventListener('click', function (ev) {
        eventListener(ev)
    })
    return button
}

function addTaskToCompleted(taskElement) {
    const taskTitle = taskElement.querySelector('.inner > h2').innerText
    const taskTimeStamp = taskElement.querySelector('.inner > p').innerText

    const newTodo = makeTodo(taskTitle, taskTimeStamp, true)
    const todo = findTodo(taskElement[TODO_ITEMID])
    todo.isCompleted = true
    newTodo[TODO_ITEMID] = todo.id
    listCompleted.append(newTodo)
    taskElement.remove()
    updateDataToStorage()
}

function createCheckButton() {
    return createButton('check-button', function (event) {
        addTaskToCompleted(event.target.parentElement)
    })
}

function removeTaskFromCompleted(taskElement) {
    todos.splice(findTodoIndex(taskElement[TODO_ITEMID]),1)
    taskElement.remove()
    updateDataToStorage()
}

function createTrashButton() {
    return createButton('trash-button', function (event) {
        removeTaskFromCompleted(event.target.parentElement)
    })
}

function undoTaskFromCompleted(taskElement) {
    
    const taskTitle = taskElement.querySelector('.inner > h2').innerText
    const taskTimeStamp = taskElement.querySelector('.inner > p').innerText

    const newTodo = makeTodo(taskTitle, taskTimeStamp, false)

    const todo = findTodo(taskElement[TODO_ITEMID])
    todo.isCompleted = false
    newTodo[TODO_ITEMID] = todo.id

    listUncompleted.append(newTodo)
    taskElement.remove()

    updateDataToStorage()
}

function createUndoButton() {
    return createButton('undo-button', function (event) {
        undoTaskFromCompleted(event.target.parentElement)
    })
}