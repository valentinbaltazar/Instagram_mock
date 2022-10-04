import { View, Text, Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { ICONS } from '../../data/data'
import { db, firebase } from '../../firebase'


const Post = ({ post }) => {

    const handleLike = post => {
        // will be true or false if liked or unliked
        // checks if post already includes users email from preiouse like action
        const currentLikeStatus = !post.likes_by_users.includes(
            firebase.auth().currentUser.email
        )

        db.collection('users')
            .doc(post.owner_email)
            .collection('post')
            .doc(post.id) //gets this from useEffect 'posts' in Homescreen
            .update({
                likes_by_users: currentLikeStatus ?
                    firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email)
                    : firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email)

            })
            .then(() => {
                console.log('Likes Updated!')
            })
            .catch(error => {
                console.error('Error updating document: ', error);
            })
    }

    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} orientation='verticle' />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                <PostFooter post={post} handleLike={handleLike} />
                <Likes post={post} />
                <Caption post={post} />
                <CommentsSection post={post} />
                <Comments post={post} />
            </View>


        </View>
    )
}

const PostHeader = ({ post }) => (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between', margin: 5, alignItems: 'center'
    }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: post.profile_picture }} style={styles.story} />
            <Text style={{ color: 'white', marginLeft: 5, fontWeight: '700' }}>
                {post.user}
            </Text>
        </View>

        <Text style={{ color: 'white', fontWeight: '900' }}>
            ...
        </Text>
    </View>
)

const PostImage = ({ post }) => (
    <View style={{ width: "100%", height: 450 }}>
        <Image source={{ uri: post.imageUrl }}
            style={{ height: '100%', resizeMode: 'cover' }} />
    </View>

)

const PostFooter = ({ handleLike, post }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.leftFooterIconContainer}>
            <TouchableOpacity onPress={() => handleLike(post)}>
                <Image style={styles.footerIcon}
                    source={post.likes_by_users.includes(firebase.auth().currentUser.email)
                        ? require('../../assets/heart_liked.png')
                        : require('../../assets/heart.png')}
                />
            </TouchableOpacity>

            <Icon imageStyle={styles.footerIcon} imgUrl={require('../../assets/comment.png')} />
            <Icon imageStyle={styles.footerIcon} imgUrl={require('../../assets/share.png')} />
        </View>

        <View >
            <Icon imageStyle={styles.footerIcon} imgUrl={require('../../assets/bookmark.png')} />
        </View>


    </View>

)

const Icon = ({ imageStyle, imgUrl }) => (
    <TouchableOpacity>
        <Image style={imageStyle} source={imgUrl} />
    </TouchableOpacity>
)

const Likes = ({ post }) => (
    <View style={{ flexDirection: 'row', marginTop: 4 }}>
        <Text style={{ color: 'white', fontWeight: '600' }}>
            {post.likes_by_users.length.toLocaleString('en')} likes
        </Text>
    </View>
)

const Caption = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        <Text style={{ color: 'white' }}>
            <Text style={{ fontWeight: '600' }}>{post.user}</Text>
            <Text>{' '}{post.caption}</Text>
        </Text>
    </View>
)

const CommentsSection = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        {!!post.comments.length && (
            <Text style={{ color: 'grey' }}>
                {post.comments.length > 1 ? 'View all' : 'View'} {post.comments.length}{' '}
                {post.comments.length > 1 ? 'comments' : 'comment'}
            </Text>
        )}
    </View>
)

const Comments = ({ post }) => (
    <View>
        {post.comments.map((comment, index) => (
            <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={{ color: 'white' }}>
                    <Text style={{ fontWeight: '600' }}>{comment.user}</Text>
                    {' '}{comment.comment}
                </Text>
            </View>
        ))}
    </View>
)

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501'
    },
    footerIcon: {
        width: 33,
        height: 33
    },
    leftFooterIconContainer: {
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between'

    }
})

export default Post

