// import the fs library to work with the filesystem
const fs = require("fs")

// check if file exists
if (!fs.existsSync("todos.json")) {
    // create the file if it doesn't exist
    fs.writeFileSync("todos.json", JSON.stringify([]))
}

// read the file
const todos = JSON.parse(fs.readFileSync("todos.json"))


// parse command line arguments
console.log(process.argv)
const [,, command, input] = process.argv

// functions for determining id number
function getId() {
    if (todos.length === 0) {
        return 1
    } else {
        return todos[todos.length - 1].id + 1
    }
}

function saveTodos() {
    fs.writeFileSync("todos.json", JSON.stringify(todos))
}


// switch with actions
switch (command) {
    case "add":
        const newTodo = {
            id: getId(),
            message: input
        }
        todos.push(newTodo)
        console.log("Todo Created")
        saveTodos()
        break
    case "view":
        for (let todo of todos) {
            console.table(todo)
        }
        break
    case "delete":
        // find the inde of the todo with the id in input
        const index = todos.findIndex(todo => todo.id === parseInt(input))
        // remove the todo from the array
        todos.splice(index, 1)
        // confirmation message
        saveTodos()
        console.log("Todo Deleted")

        break
}








