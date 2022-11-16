const request = require('request');
const forecast=(latitude,longitude,callback)=>{
    // console.log(latitude,longitude);
    const url='https://api.openweathermap.org/data/2.5/weather?lat=' +latitude+ '&lon=' +longitude+ '&units=metric&appid=b889d7a57afad064573a636d16c5b837';
    request({url:url,json:true},(error,{body}) =>{
        if(error){
            callback('Unable to connect to server',undefined);
        }
        else if(body.length===0){
            callback('Can not find the location!',undefined)
        }
        else{
            callback(undefined,body.main)
        }
    })
}
module.exports=forecast;