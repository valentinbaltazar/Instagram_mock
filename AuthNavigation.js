import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SignedInStack, SignedOutStack } from './screens/Navigation'
import { firebase } from './firebase'
import { useGestureHandlerRef } from '@react-navigation/stack'



const AuthNavigation = () => {
    const [currentUser, setcurrentUser] = useState(null)

    const userHandler = user => user ? setcurrentUser(user) : setcurrentUser(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => userHandler(user))
    }, [])



    return (
        <>
            {currentUser ? <SignedInStack /> : <SignedOutStack />}
        </>

    )
}

export default AuthNavigation