const express = require('express');
const path= require('path');
const fs= require('fs');
const app = express();
const port=80;

app.use('/static',express.static('static'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    const params={
    }
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={
    }
    res.status(200).render('contact.pug',params);
    
})

//post
app.post('/contact',(req,res)=>{
    console.log(req.body);//req.body gives all the data given by the form after submiting
    let name= req.body.name;
    let age= req.body.age;
    let phone= req.body.phone;
    let address= req.body.address;
    let data= `This is the data provided by the form(inside pugApp.js) Name of client ${name}, ${age} years old, contact number:+91 ${phone}, Address: ${address}`;
    fs.writeFileSync("form_data.txt", data);
    const param={
        "message":"Your forms have been submitted successfully",
        "content":"Success!!!"
    }
    res.status(200).render('contact.pug',param);
})

//start
app.listen(port,()=>{
    console.log(`Server started!! at port ${port}`);
})