import { View, Text, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { validateYupSchema } from 'formik'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import { Button } from 'react-native-elements/dist/buttons/Button'
import validUrl from 'valid-url'
import { db, firebase } from '../../firebase'



const PLACEHOLDER_IMG = 'https://i.imgur.com/E4Sdkgh.jpeg'

const uploadPostScheme = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached character limit')
})

const FormikPostUpLoader = ({ navigation }) => {
    const [thumbnailUrl, setthumbnailUrl] = useState(PLACEHOLDER_IMG)

    const [currentLoggedInUser, setcurrentLoggedInUser] = useState(null)

    const getUsername = () => {
        const user = firebase.auth().currentUser
        const unsubscribe = db.collection('users').where('owner_uid', '==', user.uid)
            .limit(1).onSnapshot(
                snapshot => snapshot.docs.map(doc => {
                    setcurrentLoggedInUser(
                        {
                            username: doc.data().username,
                            profilePicture: doc.data().profile_picture
                        }
                    )
                })

            )
        return unsubscribe
    }



    useEffect(() => {
        getUsername()
    }, [])

    const uploadPostToFirebase = (imageUrl, caption) => {
        const unsubscribe = db
            .collection('users')
            .doc(firebase.auth().currentUser.email)
            .collection('post')
            .add({
                imageUrl: imageUrl,
                caption: caption,
                user: currentLoggedInUser.username,
                profile_picture: currentLoggedInUser.profilePicture, //"why this fails?", //currentLoggedInUser.profilePicture,
                owner_uid: firebase.auth().currentUser.uid,
                owner_email: firebase.auth().currentUser.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                likes_by_users: [],
                comments: []
            })
            .then(() => navigation.goBack())

        return unsubscribe

    }


    return (
        <Formik initialValues={{ caption: '', imageUrl: '' }}
            onSubmit={values => {
                uploadPostToFirebase(values.imageUrl, values.caption)
            }}
            validationSchema={uploadPostScheme}
        // validateOnMount={true}
        >

            {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                <View>
                    <View style={{
                        margin: 20, justifyContent: 'space-between',
                        flexDirection: 'row'
                    }}>
                        <Image source={{
                            uri: validUrl.isUri(thumbnailUrl)
                                ? thumbnailUrl : PLACEHOLDER_IMG
                        }}
                            style={{ width: 100, height: 100 }} />
                        <View style={{ flex: 1, marginLeft: 12 }}>

                            {/* Caption input */}
                            <TextInput
                                style={{ color: 'white', fontSize: 20 }}
                                placeholder='Write a Caption...'
                                placeholderTextColor={'grey'}
                                multiline={true}
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption}
                            />
                        </View>
                    </View>
                    <Divider width={0.2} orientation='verticle'></Divider>

                    {/* Upload Pic from URL */}
                    <TextInput
                        onChange={(e) => setthumbnailUrl(e.nativeEvent.text)}
                        style={{ color: 'white', fontSize: 18 }}
                        placeholder='Enter Image Url'
                        placeholderTextColor={'grey'}
                        onChangeText={handleChange('imageUrl')}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                    />
                    {errors.imageUrl && (
                        <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.imageUrl}
                        </Text>
                    )}

                    <Button onPress={handleSubmit} title={'Share'} disabled={!isValid} />

                </View>

            )}
        </Formik>
    )
}

export default FormikPostUpLoader