export const USER = [{ user: 'Sponged', image: 'https://i.imgur.com/95q1N5D.png' },
{ user: 'Marger', image: 'https://i.imgur.com/sd64OhO.png' },
{ user: 'Ugh', image: 'https://i.imgur.com/WGXZQsZ.jpeg' },
{ user: 'Skele', image: 'https://i.imgur.com/QDUE3bG.jpeg' },
{ user: 'BigMouth', image: 'https://i.imgur.com/Wup8Ien.jpeg' }]

export const POST = [{
    imageUrl: USER[0].image,
    user: USER[0].user,
    likes: 420,
    caption: 'Hellow Moto World 1',
    profile_picture: USER[0].image,
    comments: [{ user: 'val', comment: 'cool dude' }, { user: 'ananya', comment: 'chillzzz' }]
},
{
    imageUrl: USER[1].image,
    user: USER[1].user,
    likes: 69420,
    caption: 'Hellow Moto World 2',
    profile_picture: USER[1].image,
    comments: [{ user: 'ananya', comment: 'chillzzz' }]
}
]

export const ICONS = [{
    name: 'Like',
    imageUrl: "https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-heart-love-those-icons-lineal-those-icons.png",
    likedImageUrl: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-heart-miscellaneous-kiranshastry-lineal-color-kiranshastry.png"
},
{ name: 'Comment', imageUrl: "https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/000000/external-comment-video-interface-inkubators-detailed-outline-inkubators.png" },
{ name: 'Share', imageUrl: "https://img.icons8.com/ios/50/000000/sent.png" },
{ name: 'Save', imageUrl: "https://img.icons8.com/sf-ultralight/25/000000/bookmark-ribbon.png" }]

export const BTICONS = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png',
        inactive:
            'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png',
    },
    {
        name: 'Search',
        active: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
        inactive: 'https://img.icons8.com/ios/500/ffffff/search--v1.png',
    },
    {
        name: 'Reels',
        active: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png',
        inactive: 'https://img.icons8.com/ios/500/ffffff/instagram-reel.png',
    },
    {
        name: 'Shop',
        active:
            'https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png',
        inactive:
            'https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png',
    },
    {
        name: 'Profile',
        active:
            'https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj',
        inactive:
            'https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj',
    },
]