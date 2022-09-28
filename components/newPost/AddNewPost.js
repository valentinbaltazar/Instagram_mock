import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FormikPostUpLoader from './FormikPostUpLoader'
import { NavigationContainer } from '@react-navigation/native'


const AddNewPost = ({ navigation }) => {
    return (
        <View styles={styles.container}>
            <Header navigation={navigation} />
            <FormikPostUpLoader navigation={navigation} />
        </View >

    )
}

const Header = ({ navigation }) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back.png' }}
                style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
        <Text style={styles.headerText}>New Post</Text>
        <Text></Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 20,
    }
})

export default AddNewPost