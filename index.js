const express = require('express')
const cors = require('cors')



const app = express()

app.use(cors())

app.use(express.json())

app.use(express.static('build'))

let contacts = [
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    },
    {
      "name": "sachin",
      "number": "123423",
      "id": 5
    },
    {
      "name": "sach",
      "number": "23566",
      "id": 6
    }
  ]


// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(contacts))
// })

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/contacts', (request, response) => {
    response.json(contacts)
})

app.get('/info', (request, response) => {
  response.send(`<dev><h2>PhoneBook has info of ${contacts.length} people. <h2></dev>` + new Date())
})

app.get('/api/contacts/:id',(request, response)=>{
  const id = Number(request.params.id)
  const contact = contacts.find(p => p.id === id)
  //console.log(contact)
  //console.log(id)
  if(contact) response.json(contact)
  else response.status(404).end()
})

app.delete('/api/contacts/:id',(request,response) => {
  const id = request.params.id
  contacts = contacts.filter( n => n.id !== id)
  response.status(204).end()
})

const generateId = () =>{
  const maxId = contacts.length > 0 ? Math.max(...contacts.map(p => p.id)) : 0;
  console.log(maxId)
  return maxId + 1;
}

app.post('/api/contacts' , (request,response)=>{
  const body = request.body
  if(!body.name){
    return response.status(400).json({
      error:'name missing'
    })
  }

  if(!body.number){
    return response.status(400).json({
      error:'number missing'
    })
  }

  const contact = {
    id : generateId(),
    name : body.name,
    number : body.number

  }
  contacts = contacts.concat(contact)
  response.json(contact)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)