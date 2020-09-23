const admin = require('firebase-admin')
const fs = require('fs')
const { parse } = require('svgson');
const readStream = fs.createReadStream('./DemoSVG.svg', 'utf-8')

const serviceAccount = require("/Users/travisracisz/Downloads/interactive-map-f5148-firebase-adminsdk-67sa6-f572d3da1a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://interactive-map-f5148.firebaseio.com"
});

const db = admin.database()
const ref = db.ref()
const row = ["A", "B", "C", "D"]
let rowIndex = 1 
const seats = []
let data = ''





function seatGenerator(rowSize, rowLetter){
    while(rowIndex < rowSize ){
        seats.push(rowLetter + rowIndex)
        rowIndex += 1
    }
    rowIndex = 1
 }

 row.map(row => { 
     switch(row){ 
         case "A": 
            seatGenerator(15, row)
            break 
         case"B": 
            seatGenerator(15, row)
            break 
        case "C": 
            seatGenerator(15, row)
            break
        case "D": 
            seatGenerator(15, row)
            break 
        default: 
            console.log(seats)
     }
 })

 readStream.on("data", chunk => { 
     data += chunk
 }).on('end', () => { 
     parse(data).then(json => { 
         svg = json
         let result = svg.children.filter(item => item.name === 'rect')
         for(let i = 0; i < result.length; i++){
                 result[i].seat = seats[i]
                 result[i].chosen = false
                 result[i].attributes.height = Number(result[i].attributes.height)
                 result[i].attributes.width = Number(result[i].attributes.width)
                 result[i].attributes.x = Number(result[i].attributes.x)
                 result[i].attributes.y = Number(result[i].attributes.y)
            }
            // ref.set(result)
                ref.once('value', (snapshot) => { 
                    snapshot.val().length === 56 ? console.log(`${snapshot.val().length} booths were pushed out of 56`) : console.log(`something went wrong only ${snapshot.val().length} booths were pushed out of 56`)
                })
     })
     .catch((err) => console.log(err))
 })
 