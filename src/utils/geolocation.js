const request=require('request')


const geoCode = (address,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=[api_token_here]&limit=1'

    request({url:url,json:true},(error,response)=>{

        if(error)
        {
            callback('Service unavailable',undefined)
        }else if(response.body.features.length===0)
        {
            callback('Unable to locate address, pls try again.')
        }
        else{
            callback(undefined,{

                latilongitudetude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                place_name:response.body.features[0].place_name
            })
        }
    })


}


module.exports=geoCode
