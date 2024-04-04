import './App.css';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, FormControl } from '@mui/material';
import Todo from "./Component/Todo"


export default function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState('');
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState('')


  async function fetchTodos() {
    let res = await fetch('/todos')
    let data = await res.json()
    setTodo(data)
  }
  useEffect(() => {

    fetchTodos()
  }, [editing])





  const handleUpdate = (todo) => {
    setInput(todo.todo)
    setId(todo._id)
    setEditing(true)
  }



  const handleDelete = async (id) => {
    console.log(id)
    try {
      let res = await fetch(`/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(res)
    } catch (error) {
      console.log(error.message)
    }

    const newTodo = todo.filter((todo) => todo._id !== id);
    setTodo(newTodo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editing === false) {
      setTodo((prev) => [...prev, { todo: input }])
      let res = await fetch('/add', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ todo: input })
      })
    }
    else {
      let res = await fetch(`/todos/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ todo: input })
      })

      setEditing(false)
    }


    setInput('')
  }
  console.log(input)
  return (

    <Box
      display="flex"
      flexDirection={'column'}
      alignItems="center"
      justifyContent="center"
      height='100vh'
      width='100%'
      sx={{ background: 'linear-gradient(to bottom, #430089, #82ffa1)' }}>


      <Box width={500}  >
        <Typography sx={{ fontStyle: 'italic', fontWeight: 'bold', textAlign: 'center', color: 'white', fontSize: 30 }} gutterBottom component="div">
          To-Do List
        </Typography>


        <form onSubmit={handleSubmit}>
          {editing ? (
            <FormControl sx={{ marginTop: 2, display: 'flex', flexDirection: 'row', }}  >
              <TextField fullWidth type='text' value={input} onChange={(e) => setInput(e.target.value)} variant="outlined" placeholder="Add Your Task" sx={{ backgroundColor: "#efefef", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} />
              <Button type="submit" variant="contained" sx={{ backgroundColor: "#ef5350", ":hover": { backgroundColor: '#d32f2f' }, borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                Update
              </Button>
            </FormControl>
          ) : (
            <FormControl sx={{ marginTop: 2, display: 'flex', flexDirection: 'row' }} >
              <TextField fullWidth type='text' value={input} onChange={(e) => setInput(e.target.value)} variant="outlined" placeholder="Add Your Task" sx={{ backgroundColor: "#efefef", borderTopLeftRadius: 10,  borderBottomLeftRadius: 10 }} />
              <Button type="submit" variant="contained" sx={{ backgroundColor: "#ef5350", ":hover": { backgroundColor: '#d32f2f' }, borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                Add
              </Button>
            </FormControl>
          )}
        </form>
      </Box>
      <Card sx={{ marginTop: 3, maxHeight: 500, width: 500, border: 7, borderColor: 'white', borderRadius: 5, overflowY: 'scroll' }} >
        <CardContent>


          <Box marginTop={2}>
            {todo.map((value, index) => (
              <Todo key={value} value={value} handleDelete={handleDelete} handleUpdate={handleUpdate} />
            ))}
          </Box>

        </CardContent>


      </Card>
      <p className='text'>{`You have ${todo.length} pending task`}</p>
    </Box >

  );
}


