import { View, Text, Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'

const addIcon = 'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png'
const heartIcon = 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'
const messIcon = 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png'

const Header = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image style={styles.logo} source={require('../../assets/header-logo.png')} />
            </TouchableOpacity>

            <View style={styles.iconContainer}>
                <TouchableOpacity>
                    <Image source={{ uri: addIcon }} style={styles.icon}></Image>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={{ uri: heartIcon }} style={styles.icon}></Image>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>11</Text>
                    </View>
                    <Image source={{ uri: messIcon }} style={styles.icon} ></Image>
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,

    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain'
    },
    iconContainer: {
        flexDirection: 'row'
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain'

    },
    unreadBadge: {
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 20,
        bottom: 18,
        width: 25,
        height: 18,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,

    },
    unreadBadgeText: {
        color: 'white',
        fontWeight: '600'
    }
})

export default Header
