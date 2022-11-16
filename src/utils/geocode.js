const request = require('request');
const geocode=(address,callback)=>{
    const url='https://api.openweathermap.org/geo/1.0/direct?q=' + address +'&limit=1&appid=b889d7a57afad064573a636d16c5b837';
    request({url:url,json:true},(error,response)=>{
        console.log(typeof(response));
        if(error){
            callback('Unable to connect to server!',undefined);        
        } 
        else if(response.body.length===0){
            callback('Unable to find the specified location!',undefined);
        } 
        else{
            // console.log(response.body[0].lat)
            callback(undefined,{
                latitude:response.body[0].lat,
                longitude:response.body[0].lon,
                location:response.body[0].name,
                state:response.body[0].state,
                country:response.body[0].country
            })
        }
    })
}
module.exports=geocode;