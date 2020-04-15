// export const createTrip = (trip) => {
    // return {
    //     type: 'ADD_TRIP',
    //     trip: trip,
    // }
// }

export const createTrip = (trip, currProfile) => {
    // we want to return a function and halt the action dispatch until the function finishes
    // dispatch is the funciton that dispatches an action to the reducer
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database

        // this variable will have a reference to our database
        const firestore = getFirestore();

        // grabbing user's id and profile
        const authorId = getState().firebase.auth.uid
        firestore.collection('Trips').add({
            ...trip, // takes all the properties from createTrip
            // company: profile.userName ,
            companyId: authorId,
            companyName: currProfile.companyName
        }).then(() => {
            dispatch( {type: 'CREATE_TRIP', trip: trip}) 
        }).catch((err) => {
            dispatch( {type: 'CREATE_TRIP_ERROR', err}) 
        })
    }
}