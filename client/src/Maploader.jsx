import React, {useState, useEffect} from 'react'
import firebase from 'firebase'
import Map from './Map.jsx'




var firebaseConfig = {
    apiKey: "AIzaSyB0ldJslSu6i4xy-PUeagstGZY7n6OTpnk",
    authDomain: "interactive-map-f5148.firebaseapp.com",
    databaseURL: "https://interactive-map-f5148.firebaseio.com",
    projectId: "interactive-map-f5148",
    storageBucket: "interactive-map-f5148.appspot.com",
    messagingSenderId: "660648516501",
    appId: "1:660648516501:web:cedde368bfa2dda1df349c",
    measurementId: "G-XSZDHTC2V8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

 


function Maploader(){ 

    const [seats, setSeats] = useState([])
    const [seatStyle, setSeatStyle] = useState()



    
    useEffect(() => {
            const mapRef = firebase.database().ref()
            mapRef.on('value', snapshot => { 
                let seats = []
               snapshot.forEach(childSnapshot => { 
                   seats.push(childSnapshot.val())
                   setSeats(() => ([
                       ...seats
                   ]))
               })
            })
    }, [])
 
    function handleSubmit(i){ 
        let index = i
       const seatRef = firebase.database().ref('/' + index)
        seatRef.once('value', snapshot => { 
            let chosenSeat = snapshot.val()
            chosenSeat.chosen = true
            seatRef.set(chosenSeat)
        })
    }

    function updateStyle(index){ 
        setSeatStyle((prev) => (prev === index ? null : index))
    }
  
    return( 
        <div> 
            <svg style = {{height: "90vh"}} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 797.1896 862.6702">
            {seats && seats.map((seat, index) => 
                <Map 
                    index = {index}
                    seatStyle = {seatStyle}
                    updateStyle = {updateStyle}
                    x = {seat.attributes.x} 
                    y = {seat.attributes.y} 
                    seat = {seat.seat} 
                    chosen = {seat.chosen} 
                    height = {seat.attributes.height} 
                    width = {seat.attributes.width}
                    />
            )}
            </svg>
            <button onClick = {() => handleSubmit(seatStyle)}>Submit</button>
          
        </div>
    )
}

export default Maploader