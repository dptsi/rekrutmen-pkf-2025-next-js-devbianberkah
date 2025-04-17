import { Container, Heading,Input,Text,Box, Stack,Select, Button, FormControl,FormErrorMessage } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '@/services/api';

interface ApiResponse {
    status?: string;
    data?: Todo[];
    error?: string;
  }
  
async function fetchData(url: string): Promise<ApiResponse> {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return { data: data.data, status: data.status };
    } catch (error) {
      return { error: "Error fetching data" };
    }
  }

const Todolist = () => {
const [todos, setTodos] = useState<Todo[]>([]);
const [isFetching, setIsFetching] = useState(true);
const [error, setError] = useState<string | null>(null);
const [input,setInput] = useState('');
const [status, setStatus] = useState<string>(''); // default value
const [inputError,setInputError] = useState(true);
const [inputLessCharError,setInputLessCharError] = useState(true);

useEffect(() => {
    const getTodos = async () => {
      const { data, error } = await fetchData('http://localhost:3000/api/todos');
      if (error) {
        setError(error);
      } else if (data) {
        setTodos(data);
      }
      setIsFetching(false);
    };

    getTodos();
  }, []);

  if (error) {
    return (
      <Container>
        Error: {error}
      </Container>
    );
  }
 const addTodo = () => {
    if (input.trim()==='') {
        setInputError(true);
        return;
    }

    if(input.length < 3){
        setInputLessCharError(true);
        return;
    }

    const now = new Date().toISOString();

    const newTodo: Todo = {
        id:uuidv4(),
        title:input,
        status:'pending',
        created_at:now,
        updated_at:now,
    };

    setTodos((prevTodo)=>[...prevTodo,newTodo]);
    setInput('');
    setInputError(false);
    setStatus('');
    setInputLessCharError(false);
 };

  return (
   <Container py={5}>
         <Heading mb={4}>Todo List Management</Heading>
         <Stack spacing={4} >
            <FormControl isInvalid={inputError}>
                <Box>
                    <Input placeholder='Enter To Do Title'
                        value={input}
                        onChange={(inp) => {
                            setInput(inp.target.value);
                            if (inputError) setInputError(false);
                            if(inputLessCharError)setInputLessCharError(false);
                        }}
                        onKeyDown={(inp)=>inp.key === 'Enter' && addTodo()}
                        />
               </Box>
                {inputError && (<FormErrorMessage>Title Tidak Boleh Kosong</FormErrorMessage>)}
                {inputLessCharError && (<FormErrorMessage>Title minimal 3 karakter</FormErrorMessage>)}
            </FormControl>
            <Box>
                <Button background={'blue.300'} color={'white'} onClick={addTodo}>
                        Add Todo
                </Button>
            </Box>         
            <Box>
                {isFetching && 
                        <Container>
                        Fetching To Do data...
                    </Container>
                }
                <Stack>
                    <Input placeholder='Search todos..'/>
                    <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="done">Done</option>
                    </Select>
                    <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Newest</option>
                        <option value="">Oldest</option>
                        <option value="">Alphabetical</option>
                    </Select>
                </Stack>
                <Box></Box>
                {todos && todos.map((item) => (
                    <Box key={item.id} mb={4} p={4} borderWidth="1px" borderRadius="md">
                        <Text fontWeight="bold">{item.title}</Text>
                    </Box>
                ))}
            </Box>
         </Stack>
       </Container>
  )
}
export default Todolist
