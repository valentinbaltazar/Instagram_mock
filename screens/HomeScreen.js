import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import { USER, POST, ICONS, BTICONS } from '../data/data'
import BottomTabs from '../components/home/BottomTabs'
import { db } from '../firebase'

const HomeScreen = ({ navigation }) => {


    const [posts, setposts] = useState([])

    useEffect(() => {
        // collectionGROUP not collection, this auto includes every sub section of the parent group
        // Liked functionallity doesnt work without this orderedBy and doc functionality?
        db.collectionGroup('post').orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                setposts(snapshot.docs.map(doc => (
                    { id: doc.id, ...doc.data() })
                ))
                // loadUsersCallback();
            })

    }, [])





    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <Stories />
            <ScrollView>
                {posts.map((post, index) => (
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