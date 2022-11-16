const path = require('path');
const express = require('express');
const hbs=require('hbs'); 
const forecast=require('./utils/forecast');
const geocode=require('./utils/geocode');

const app=express();
//A better way to serve HTML using node on the browser

const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,'../templates/partials')

// static rendering
app.use(express.static(publicDirectoryPath));
// dynamic rendering
app.set('view engine','hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
app.get('',(req,res)=>{
    res.render('index',{
       title:"Weather",
       name:"Nikhil Yadav"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Nikhil Yadav"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        text:"This is dynamic rendering with handlebars",
        title:"Help",
        name:"Nikhil Yadav"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'The address must be provided'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(!error){
            forecast(latitude,longitude,(error,forecastdata)=>{
                if(error){
                    res.send({error});
                } else {
                   res.send({
                        forecast:forecastdata,
                        location,
                        address:req.query.address
                   }) 
                }
            })
        }
        else{
            res.send({error});
        }
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'The search must be provided'
        });
    }
    console.log(req.query);
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        message:"Help article not found!!"
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        message:"404 Page not found"
    })

})
// app.get('',(req,res)=>{             //referring to root domain
//     res.send('Hello express!'); 
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>Title</h1>');
// })
// app.get('/help',(req,res)=>{
//     res.send('This is help page');
// })
app.listen(3000,()=>{
    console.log('The server is active on port: 3000');
})