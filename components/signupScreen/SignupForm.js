import { View, Text, Button, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { firebase, db } from '../../firebase'


const SignupForm = ({ navigation }) => {

    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(2, 'A username is required'),
        password: Yup.string().required().min(8, 'Password must be 8 characters in length')
    })

    const getRandomProfilePicture = async () => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }

    const onSignup = async (email, password, username) => {
        try {
            const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log('Firebase User Created Successfully', email, password)

            // rules of database must have path and collection as named here 'USERS' nor user etc..
            db.collection('users').doc(authUser.user.email).set({
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture()
            })
        }
        catch (error) {
            Alert.alert(error.message)
        }
    }

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={(values) => {
                    onSignup(values.email, values.password, values.username)
                }}
                validationSchema={SignupFormSchema}
                validateOnMount={true}
            >

                {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
                    <View>

                        {/* Email input field */}
                        <View style={[styles.inputField,
                        {
                            borderColor: values.email.length < 1 || Validator.validate(values.email)
                                ? '#ccc' : 'red'
                        }
                        ]}>
                            <TextInput placeholderTextColor={'#444'}
                                placeholder='Email'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                // textContentType='emailAddress' need?
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>

                        {/* Username input field */}
                        <View style={[styles.inputField,
                        {
                            borderColor: values.username.length < 1 || values.username.length >= 2
                                ? '#ccc' : 'red'
                        }
                        ]}>
                            <TextInput placeholderTextColor={'#444'}
                                placeholder='Username'
                                autoCapitalize='none'
                                textContentType='username'

                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>

                        {/* Password input field */}
                        <View style={[styles.inputField,
                        {
                            borderColor: values.password.length < 1 || values.password.length >= 8
                                ? '#ccc' : 'red'
                        }
                        ]}>
                            <TextInput placeholderTextColor={'#444'}
                                placeholder='Password'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                textContentType='password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                        <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
                            <Text style={{ color: '#6BB0F5' }}>Forgot password?</Text>
                        </View>


                        <Pressable titleSize={20} style={styles.button(isValid)}
                            onPress={handleSubmit}
                        // disabled={!isValid} do we need this?
                        >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>

                        <View style={styles.signupContainer}>
                            <Text>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                                <Text style={styles.signupText}>
                                    {' '}Log In
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                )}
            </Formik>
        </View >
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80
    },
    inputField: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: '#FAFAFA',
        marginBottom: 10,
        borderWidth: 1,
    },
    button: isValid => ({
        backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,

    }),
    buttonText: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 20,
    },
    signupContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50
    },
    signupText: {
        color: '#6BB0F5'
    },

})

export default SignupForm
