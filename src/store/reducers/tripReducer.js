// for intial state when app starts
const initState = {
    trip: [
        {id: 1, title: "Trip to Kashmir", destinations: "Kashmir and Peer Chinaasi", departureLoc: "Lahore", departureDate: "2020-05-05", duration: 5, price: 1500, capacity: 90, description: "The fun trip that Hayat went to in spring 2020", attraction: "None", image: ""},
        {id: 2, title: "Trip to Kashmir2", destinations: "Kashmir and Peer Chinaasi", departureLoc: "Lahore", departureDate: "2020-05-05", duration: 5, price: 1500, capacity: 90, description: "The fun trip that Hayat went to in spring 2020", attraction: "None", image: ""},
        {id: 3, title: "Trip to Kashmir3", destinations: "Kashmir and Peer Chinaasi", departureLoc: "Lahore", departureDate: "2020-05-05", duration: 5, price: 1500, capacity: 90, description: "The fun trip that Hayat went to in spring 2020", attraction: "None", image: ""}
    ]
}


const tripReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_TRIP":
            console.log('created trip', action.trip)
            return state
        case "CREATE_TRIP_ERROR":
            console.log('created trip error', action.err)
            return state
        default:
            return state

    }
}

export default tripReducer