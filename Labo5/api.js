const endpoint = "http://localhost:8000";


export const createUser = async function() {
    if (!window.localStorage.getItem("userId")) {
        const req = new Request(
            endpoint.concat('/users'), {
                method: 'POST',

            }
        );
        console.log("user created")
        const res = await fetch(req);
        console.log(res);
        const body = await res.json();
        const userId = body.id;
        window.localStorage.setItem("userId", userId)
            //console.log('User created with id '.concat(userId));
    };
    return await getTodos();
};

export const createTodo = async function(name) {
    const req = new Request(
        endpoint.concat('/', window.localStorage.getItem("userId"), '/tasks'), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name
            })
        }
    );
    console.log("abc");
    const res = await fetch(req);
    console.log('Todo created...');
    return await res.json();
};

export const getTodos = async function() {
    const req = new Request(
        endpoint.concat('/', window.localStorage.getItem("userId"), '/tasks'), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
    const res = await fetch(req);
    return (await res.json()).tasks
};

export const updateTodo = async function({ id, name }) {
    const req = new Request(
        endpoint.concat('/', window.localStorage.getItem("userId"), '/tasks/', id), {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name
            })
        }
    );
    const res = await fetch(req);
    console.log('To do updating...')
    await res.json();
    console.log('Todo updated...');
};

export const deleteTodo = async function(id) {
    const req = new Request(
        endpoint.concat('/', window.localStorage.getItem("userId"), '/tasks/', id), {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    await fetch(req);
    console.log('Todo deleted...');
};