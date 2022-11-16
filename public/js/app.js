console.log("Trying to access cliet side using the server side");

const weatherForm=document.querySelector('form');
const searchText=document.querySelector('input');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        // console.log(searchText.value);
        messageOne.innerHTML='Loading...';
        messageTwo.innerHTML='';
        fetch('http://localhost:3000/weather?address='+searchText.value).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    messageOne.innerHTML=data.error;
                    // console.log(data.error);
                } else {
                    // console.log(data.forecast.temp);
                    // console.log(data.location);
                    const currForecast=data.forecast;
                    messageOne.textContent=`temp: ${currForecast.temp}, Feels like: ${currForecast.feels_like}, Max: ${currForecast.temp_max}, Min: ${currForecast.temp_min} [all in degree celcius]`
                    messageTwo.innerHTML=data.location;
                }
            })
        })
})