console.log('Client side console log !!')



const weather_form=document.querySelector('form')
const search_l=document.querySelector('input')

const dis_msg=document.querySelector('#message-1')
const dis_msg2=document.querySelector('#message-2')



weather_form.addEventListener('submit',(e)=>{
e.preventDefault()
console.log('Testing')
console.log(search_l.value)



dis_msg.textContent='Loading...'
dis_msg2.textContent=''



fetch('/weather?address='+search_l.value).then((response)=>{
response.json().then((data)=>{
    if(data.error)
    {
        dis_msg.textContent=data.error
    }else{
        
        
        dis_msg.textContent=data.geodata.place_name        
        dis_msg2.textContent='Todays temperature at '+search_l.value+' is '+data.temp.temp+' .But it feels like '+data.temp.feelslike



    }

})

})



})

