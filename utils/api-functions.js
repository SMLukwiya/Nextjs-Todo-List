export const saveTodo = async(data) => {
    const response = await fetch('/api/todos-add', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    return await response.json();
  }
  
export const getAllTodos = async() => {
    const response = await fetch('/api/todos-getAll')
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    return await response.json();
}

export const getTodo = async(data) => {
    const response = await fetch('/api/todo-getById', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error(response.statusText);
      }
    
    return await response.json();
}

export const updateTodo = async(data) => {
    const response = await fetch('/api/todos-update', {
        method: 'POST',
        body: JSON.stringify(data)
    });

    return await response.json();
}

export const deleteTodo = async(id) => {
    const response = await fetch('/api/todos-delete', {
        method: 'DELETE',
        body: JSON.stringify(id)
    });

    return await response.json();
}