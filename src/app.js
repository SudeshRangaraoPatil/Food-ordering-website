const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");
const { json } =require("express");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.get("/", (req, res) => {
    res.render("index")
});
app.get("/register", (req, res) => {
    res.render("register")
});
app.get("/login", (req,res) => {
    res.render("login");
})
app.post("/register", async (req,res) =>{
    try{
        const password =req.body.password;
       console.log(req.body)
    const registerEmployee = new Register({
        username: req.body.username,
        email:req.body.email,
        password:req.body.password

    })

    const registered = await registerEmployee.save();
    console.log(registered)
    res.status(201).render("index");

    }catch(error){
        res.status(400).send(error);
    }
})
// app.post("/signup",(req,res)=>{
//     var name = req.body.name;
//     var email = req.body.email;
//     var password = req.body.password;
//     var confirm_password = req.body.confirm_password;

//     var data ={
//         "name": name,
//         "email": email,
//         "password":password,
//         "confirm_password":confirm_password
//     }
// })

// login check

app.post("/login",async(req,res) => {
   try{
    const email = req.body.email;
    const password = req.body.password;

   const useremail = await Register.findOne({email:email});
   if(useremail.password == password){
    res.status(201).render("index");
   }else{
    res.send("password are not matching");
   }

   }catch (error){
    res.status(400).send("invalid username")
   }
})


app.listen(port, () => {
    console.log('server is running' + port);
  });