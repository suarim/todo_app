import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TodoItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const TodoText = styled.span`
  flex: 1;
`;

const DeleteButton = styled.button`
  border: none;
  background: none;
  color: #ff0000;
  cursor: pointer;

  &:hover {
    color: #cc0000;
  }
`;

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTodo = () => {
    if (newTodo.trim() === '') return;

    const todo = { text: newTodo };
    axios.post('http://localhost:5000/todos', todo)
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error(error));
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <Container>
      <Title>Todo List</Title>
      <InputContainer>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <Button onClick={addTodo}>Add Todo</Button>
      </InputContainer>
      <TodoList>
        {todos.map(todo => (
          <TodoItem key={todo._id}>
            <TodoText>{todo.text}</TodoText>
            <DeleteButton onClick={() => deleteTodo(todo._id)}>Delete</DeleteButton>
          </TodoItem>
        ))}
      </TodoList>
    </Container>
  );
}

export default App;
