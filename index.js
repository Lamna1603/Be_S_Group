const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(bodyParser.json())

let users = [
    {
        id: 1,
        name : "Na",
        age : 20 
    },
    {
        id:2,
        name :"Chi",
        age: 98
    },
    {
        id: 3,
        name: "be",
        age: 18,
    }
]

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users",(req,res)=>{
    const sortBy = req.query.sortBy
    let sortedUser = [...users]
    if(sortBy==="id_asc")
        sortedUser.sort((a,b)=>a.id - b.id)
    if(sortBy==="id_des")
        sortedUser.sort((a,b)=>b.id - a.id)
    res.send(sortedUser)
})

app.get("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const user = users.find(user=>user.id==id)
    res.send(user)
})


app.delete("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const user = users.filter(user=>user.id!==id)
    users=user
    res.send(users)
})

app.put("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const {name,age} = req.body


    let userIndex = users.findIndex(user => user.id==id)
    if(userIndex===-1)
        return res.status(404).send({error:"User not found"
        })
    users[userIndex].name=name
    users[userIndex].age=age

    
    res.send(users);
})

app.post("/users",(req,res)=>{
    const {name,age} = req.body

    if(!name||!age)
        return res.status(400).send({message: "Name and age are required"})
    const nextId = users.length ? users[users.length - 1].id + 1 : 1

    const newUser = {
        id: nextId,
        name,
        age
    }

    users.push(newUser)
    res.status(200).send(users)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
