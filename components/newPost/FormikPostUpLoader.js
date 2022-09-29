import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { validateYupSchema } from 'formik'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import { Button } from 'react-native-elements/dist/buttons/Button'
import validUrl from 'valid-url'

const PLACEHOLDER_IMG = 'https://i.imgur.com/E4Sdkgh.jpeg'

const uploadPostScheme = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached character limit')
})

const FormikPostUpLoader = ({ navigation }) => {
    const [thumbnailUrl, setthumbnailUrl] = useState(PLACEHOLDER_IMG)

    return (
        <Formik initialValues={{ caption: '', imageUrl: '' }}
            onSubmit={values => {
                console.log(values)
                console.log('Your post was submitted successfully!')
                navigation.goBack()
            }
            }
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