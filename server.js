var admin = require('firebase-admin')

var serviceAccount = require("/Users/travisracisz/Downloads/interactive-map-f5148-firebase-adminsdk-67sa6-f572d3da1a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://interactive-map-f5148.firebaseio.com"
});

var db = admin.database()
var ref = db.ref()

ref.set({"It": "works"})


