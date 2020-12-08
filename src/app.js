const hbs =require('hbs')
const path = require('path')
const express = require('express')

const request=require('request')
const geoCode =require('./utils/geolocation')
const weather_stat=require('./utils/weather')


const app = express()

const port =process.env.PORT || 3000

const public_path= path.join(__dirname,'../public')
const view_path=path.join(__dirname,'../templates/views')
const partials_path=path.join(__dirname,'../templates/partials')



app.set('view engine','hbs')
app.set('views',view_path)
hbs.registerPartials(partials_path)



app.use(express.static(public_path))



 app.get('',(req,res)=>
{

res.render('index',{
    title:'Weather app',
    name:'Deepak Kumar'
})

})


app.get('/help',(req,res)=>{

res.render('help',{
    title:'Help ',
    name:'Deepak Kumar'
})

})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Deepak Kumar'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }

   

    geoCode(encodeURIComponent(req.query.address),(error,geodata)=>{


        if(error)
        {
            return res.send({
                error:'You must provide an address!'
            })
        }
        
        const data_v = {
            lat:geodata.latilongitudetude,
            lon:geodata.longitude
        }
        
        weather_stat(data_v,(error,data)=>{
        
        if(error)
        {
            return res.send({
                error:'You must provide an address!'
            })
        }
        else
        {
            res.send({
                geodata:geodata,
                temp:data
            })


        }
        
        
        
        })
        
        
        
        })
        





















    // res.send([{
    //     forecast:'Winter',
    //     location:'Ranchi'
    // }])
})

app.get('*',(req,res)=>{

    res.render('404',{
        title:'404',
        error_msg:'Page not found!',
        name:'Deepak Kumar'
    })
})






app.listen(port,()=>{

    console.log('Server is up and running on port '+ port)
})