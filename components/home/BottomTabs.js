import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { BTICONS } from '../../data/data'
import { Image } from 'react-native-elements/dist/image/Image'
import { Divider } from 'react-native-elements'


const BottomTabs = ({ icons }) => {
    const [activeTab, setactiveTab] = useState('Home')

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => setactiveTab(icon.name)}>
            <Image source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
                style={[styles.icon, icon.name === 'Profile' ? styles.profilePic() : null,
                activeTab === 'Profile' && icon.name === activeTab ? styles.profilePic(activeTab) : null]} />
        </TouchableOpacity>
    )


    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation='verticle' />
            < View style={styles.container}>
                {icons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View >
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        width: '100%',
        bottom: '3%',
        zIndex: 999,
        backgroundColor: '#000'

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        paddingTop: 10
    },
    icon: {
        width: 30,
        height: 30
    },
    profilePic: (activeTab = '') => ({
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: activeTab === 'Profile' ? 2 : 0
    })

})

export default BottomTabs