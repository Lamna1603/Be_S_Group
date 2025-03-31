const express = require("express")
const fs = require("fs")
const bodyParser = require("body-parser")
const { join } = require("path")
const { json } = require("stream/consumers")


const app = express()
const port = 3001
const usersFile = "users.json"

app.use(bodyParser.json())

//doc danh sach nguoi dung tu file
const readUsers = ()=>{
    const data  = fs.readFileSync(usersFile,"utf-8")
    return JSON.parse(data)
}

//ghi danh sachs nguoi dung vao file

const writeUsers = (users)=>{
    fs.writeFileSync(usersFile,JSON.stringify(users,null,2),"utf-8")
}

// lay danh sach nguoi dung

const check_sortBy = (req,res,next)=>{
    const sortBy= req.query.sortBy
    if(sortBy) {
         if(sortBy !=="id_asc" && sortBy !==sortBy==="id_des") return res.status(400).send({message: "cant catch your sort method"})
         } 
        next ()
}

app.get("/users",check_sortBy,(req,res)=>{

    const sortBy  = req.query.sortBy

    let users = readUsers();

    let sorted_user = [...users]
    if(sortBy==="id_asc") sorted_user.sort((a,b)=>a.id-b.id)
    if(sortBy==="id_des") sorted_user.sort((a,b)=>b.id-a.id)

    res.status(200).send(sorted_user)
})

// lay thong tin nguoi dung theo id

const checkId = (req,res,next)=>{
    const id = parseInt(req.params.id)
    if (isNaN(id)) return res.status(400).send({message: "your id is invalid"})
    next()
}

app.get("/users/:id",checkId,(req,res)=>{
    
    const users = readUsers()
    const id = parseInt(req.params.id)
    const user = users.find(u => u.id===id)

    if(!user) return res.status(400).send({message : "User not found"})
    
        res.send(user)
})

//them nguoi dung

const check_infor = (req,res,next)=>{
    const {name,age} = req.body
    if(!isNaN(name)|| isNaN(age))
        return res.status(400).send({message: " Name or age of new people iss invalid"})
    next()
}

app.post("/users",check_infor,(req,res)=>{
    const users= readUsers()
    const {name,age} = req.body
    
    const newUser = {
        id: users.length  ? users[users.length - 1].id +1 :1,
        name,
        age 
    }

    
    users.push(newUser)
    writeUsers(users)
    res.send(users)
})

//cap nhap nguoi dung
app.put("/users/:id",checkId,check_infor,(req,res)=>{
    const id = parseInt(req.params.id)
    const users =readUsers()
    const index_user = users.findIndex(u => u.id ===id)
    
    if(index_user==-1) return res.status(404).send({message: "user not found"})
    users[index_user]={ ...users[index_user], ...req.body}
    writeUsers(users)

    res.send(users)
})

// xoa nguoi dung
app.delete("/users/:id",checkId,(req,res)=>{
    const id = parseInt(req.params.id)
    
    let users = readUsers()
    const newUsers = users.filter(u=> u.id !== id)

    if(newUsers.length===users.length) return res.status(404).send({message: "User not found!" })
    writeUsers(newUsers)
    res.send(newUsers)
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

