import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import { USER, POST, ICONS, BTICONS } from '../data/data'
import BottomTabs from '../components/home/BottomTabs'
import { db } from '../firebase'

const HomeScreen = ({ navigation }) => {

    useEffect(() => {
        // collectionGROUP not collection, this auto includes every sub section of the parent group
        db.collectionGroup('post').onSnapshot(snapshot => {
            console.log(snapshot.docs.map(doc => doc.data()))
            // loadUsersCallback();
        })

    }, [])



    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <Stories />
            <ScrollView>
                {POST.map((post, index) => (
                    <Post post={post} key={index} />
                ))}
            </ScrollView>
            <BottomTabs icons={BTICONS} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1
    }
})

export default HomeScreen