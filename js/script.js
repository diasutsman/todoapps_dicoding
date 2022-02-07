document.addEventListener('DOMContentLoaded', () => {
    const submitForm = document.getElementById('form')
    submitForm.addEventListener('submit', e => {
        e.preventDefault()
        addTodo()
    })

    if (isStorageExist())loadDataFromStorage()
})

document.addEventListener('ondatasaved', () => console.log('Data berhasil disimpan'))

document.addEventListener('ondataloaded', () => refreshDataFromTodos())