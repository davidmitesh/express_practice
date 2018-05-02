const express=require('express');
const hbs=require('hbs');
const fs=require('fs');


var app=express();
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=now+`${req.method} ${req.url}`;
  fs.appendFile('server.log',log+'\n',(err)=>{
    console.log(err);
  })
  console.log(log);
  res.render('maintenance.hbs');
})
app.use(express.static(__dirname+'/public'));
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('capitalize',(text)=>{
  return text.toUpperCase();
})
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    title: "mitesh",
    year: new Date().getFullYear()
  });
});
app.get('/',(req,res)=>{
  res.render(__dirname+'/public/help.hbs');
});
app.get('/home',(req,res)=>{
  res.render('home.hbs',{
    title: "mitesh",
    year: new Date().getFullYear()
  });
});
app.listen(3000,()=>{
  console.log("hey server up");
});
