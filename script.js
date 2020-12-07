let locationtimezone = document.querySelector(".location-timezone");
let tempraturedescription = document.querySelector(".temprature-description");
let tempraturedegree = document.querySelector(".temprature-degree");
let temperaturesection = document.querySelector(".temprature");
const temperaturespan = document.querySelector(".temprature span");
let locationcity = document.querySelector(".location-city");
const searchinput = document.querySelector(".search-input");
const searchbutton = document.querySelector(".search-button");



searchbutton.addEventListener('click' , (e)=>{

    e.preventDefault();
    getweather(searchinput.value);
    searchinput.value = "";
    

});

const getweather = async (city)=>
{
    let long;
    let lati;
    const key = "899e80ac377f0b97e9d5c67a078ca7cb";
    const proxy = "https://cors-anywhere.herokuapp.com/"; 
    const api1 = `${proxy}api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
     
    try {
        
        const response = await fetch(api1);

        const weatherdata = await response.json();
        console.log(weatherdata);

        const {lon , lat } = weatherdata.coord;

        long = lon;
        lati = lat;

        const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lati},${long}`;

        const data = await fetch(api);
        const icondata = await data.json();
        console.log(icondata);
        
        const { name } = weatherdata;
        const {temperature , summary , icon} = icondata.currently;

        locationcity.textContent = name;
        tempraturedegree.textContent = temperature;
        tempraturedescription.textContent = summary;
        locationtimezone.textContent = icondata.timezone;

        seticons(icon , document.querySelector(".icon"));

        let celcius = (temperature - 32) + (5/9);

        temperaturesection.addEventListener("click", ()=> {
            if(temperaturespan.textContent === "F"){
                temperaturespan.textContent = "C";
                tempraturedegree.textContent = Math.floor(celcius);
            } else {
                    temperaturespan.textContent = "F";
                    tempraturedegree.textContent = temperature;
                   }
        });

        

    } catch (error) {
        alert('city not found');
    }
 }




 window.addEventListener('load', ()=> {

    let long;
    let lat;


    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(position => {

            long = position.coords.longitude;
            lat = position.coords.latitude;
            const key = "899e80ac377f0b97e9d5c67a078ca7cb";
            const proxy = "https://cors-anywhere.herokuapp.com/"; 
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            const api1 = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
             
            
            fetch(api1)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {name} = data;
                    locationcity.textContent = name;
                   
                    });
            
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                   const {temperature , summary , icon} = data.currently;

                   tempraturedegree.textContent = temperature;
                   tempraturedescription.textContent = summary;
                   locationtimezone.textContent = data.timezone;
                   
                    seticons(icon , document.querySelector(".icon"));

                    let celcius = (temperature - 32) + (5/9);

                    temperaturesection.addEventListener("click", ()=> {
                        if(temperaturespan.textContent === "F"){
                            temperaturespan.textContent = "C";
                            tempraturedegree.textContent = Math.floor(celcius);
                        } else {
                            temperaturespan.textContent = "F";
                            tempraturedegree.textContent = temperature;
                        }
                    });

                });

        });


    } 

    
    
  });

  function seticons(icon , iconId){
    const skycons = new Skycons({color: "white"});
    const currenticon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconId , Skycons[currenticon]);
}