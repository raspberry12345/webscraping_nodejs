const axios = require("axios")
const fs = require('fs')

const url = "https://www.willhaben.at/iad/immobilien/haus-kaufen/burgenland/oberwart"
const filePath = 'output.txt';
axios(url).then((response) => {
    const responseString = response.data
    let index = responseString.indexOf("Häuser zu kaufen")
    let amountAvailableHouses =""
    let day = new Date().getDate().toString() 
    let month = new Date().getMonth()+1
    amountAvailableHouses = day +"."+ month.toString()+" "
    
    for (let counter = 0; counter < 3; counter++) {
        
        amountAvailableHouses += responseString[index-4+counter]
        //console.log(amountAvailableHouses)
    }
    amountAvailableHouses = amountAvailableHouses.trim()
    amountAvailableHouses = amountAvailableHouses+";\n"

    
    fs.appendFile(filePath, amountAvailableHouses, (err) => {
        if (err) {
          console.error('Ein Fehler ist aufgetreten:', err);
          return;
        }
        console.log('Text wurde erfolgreich in die Datei geschrieben.');
      })
      
}).catch((err) =>{
    console.log(err)
})