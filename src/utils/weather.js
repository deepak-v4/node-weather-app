const request= require('request')


const weather_stat = (data,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=845e474bed3cd6753b17cccf28c20a98&query='+encodeURIComponent(data.lat)+','+encodeURIComponent(data.lon)

    request({url:url,json:true},(error,response)=>{

        if(error)
        {
            callback('Service unavailable',undefined)
        }else if(response.body.error)
        {
            callback('no Data found',undefined)
        }else{
            callback(undefined,{
                temp:response.body.current.temperature,
                feelslike:response.body.current.feelslike,
                humid:response.body.current.humidity,
                wind_sp:response.body.current.wind_speed

            })
        }


    })

}


module.exports=weather_stat