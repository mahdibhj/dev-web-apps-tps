const endpoint = "https://glo3102lab4.herokuapp.com";
let userid = "";

export const createUser = async function() {
    const req = new Request(
        endpoint.concat('/users'), {
            method: 'POST',

        }
    );
    const res = await fetch(req);
    console.log(res);
    //const abc = fetch("https://glo3102lab4.herokuapp.com/users", {method:'POST'} )
    //console.log(abc)
    const id = (await res.json()).id;
    globalThis.userId = id;
    console.log('User created with id '.concat(id));
};

export const createTodo = async function(name) {
    const req = new Request(
        endpoint.concat('/',userId,'/tasks'), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name
            })
        }
    );
    const res = await fetch(req);
    console.log('Todo created...');
    return await res.json();
};

export const getTodos = async function() {
    const req = new Request(
        endpoint.concat('/',userId,'/tasks'), {
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
        endpoint.concat('/',userId,'/tasks/',id), {
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
        endpoint.concat('/',userId,'/tasks/',id), {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    await fetch(req);
    console.log('Todo deleted...');
};
