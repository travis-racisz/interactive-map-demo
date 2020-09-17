const { schedulingPolicy } = require('cluster');
var admin = require('firebase-admin')
var fs = require('fs')
const { parse } = require('svgson');
var readStream = fs.createReadStream('./DemoSVG.svg', 'utf-8')

var serviceAccount = require("/Users/travisracisz/Downloads/interactive-map-f5148-firebase-adminsdk-67sa6-f572d3da1a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://interactive-map-f5148.firebaseio.com"
});

var db = admin.database()
var ref = db.ref()
var row = ["A", "B", "C", "D"]
var rowIndex = 1 
var seats = []
var data = ''





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
         var result = svg.children.filter(item => item.name === 'rect')
         for(var i = 0; i < result.length; i++){
                 result[i].seat = seats[i]
                 result[i].chosen = false
                 result[i].attributes.height = Number(result[i].attributes.height)
                 result[i].attributes.width = Number(result[i].attributes.width)
                 result[i].attributes.x = Number(result[i].attributes.x)
                 result[i].attributes.y = Number(result[i].attributes.y)
            }
        // ref.set(result)
     })
     .catch((err) => console.log(err))
 })
 