const mongoose = require('mongoose');
const novel = require('./models/novels')

mongoose.connect('mongodb://localhost:27017/NovelHolder', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("MONGO CONNECTION OPEN!!");
})
.catch(err => {
    console.log("MONGO CONNECTION Error...");
    console.log(err);
})

const seedNovels = [
    {
        name: 'Nagisa',
        author:"603200aa4467c41b0c795770",
        image: 'https://c4.wallpaperflare.com/wallpaper/913/535/781/clannad-okazaki-tomoya-okazaki-ushio-okazaki-nagisa-wallpaper-preview.jpg',
        description: "Nagisa is the best! Nagisa is a cute girl with short wavy red hair that reaches a little below her shoulders. She has a frail physique, as noted by Tomoya Okazaki, therefore she is petite for her age, due to her poor health and weak immune system."
    },
    {
        name: 'Zero Two',
        author:"603200aa4467c41b0c795770",
        image: 'https://c4.wallpaperflare.com/wallpaper/147/282/530/anime-darling-in-the-franxx-pink-hair-smile-zero-two-darling-in-the-franxx-hd-wallpaper-preview.jpg',
        description: "Zero Two (ゼロツー, Zero Tsū) is the main heroine and the deuteragonist of DARLING in the FRANXX. Despite having no regard for human life or her own and being accustomed to fighting solo, she took interest in Hiro and offered an opportunity to pilot with her, making him her new partner and 'darling'. After Hiro was able to ride with her more than three times, the pair became the 13th Plantation's newest members, piloting the powerful FRANXX Strelizia."
    },
    {
        name: "MengQi",
        author:"603200aa4467c41b0c795770",
        image: 'https://c4.wallpaperflare.com/wallpaper/874/478/505/4000x2596-px-action-asian-fantasy-wallpaper-preview.jpg',
        description: "She had willowy eyebrows over limpid clear eyes, cherry red lips popped over her pale skin, and a cascading waterfall of hair descended all the way to her waist"
    },
    {
        name: 'Touka',
        author:"603200aa4467c41b0c795770",
        image: 'https://c4.wallpaperflare.com/wallpaper/417/291/813/anime-girls-tokyo-ghoul-tokyo-ghoul-re-kirishima-touka-wallpaper-preview.jpg',
        description: "Touka is a slender and attractive teenage girl with bob-length black hair (purple in the anime) that has long bangs that reach her chin covering the right side of her face and blue eyes. She appears to be a cute, normal girl that one would not suspect to be a ghoul. Her facial features and hairstyle bear a strong."
    }

]

novel.insertMany(seedNovels)
.then(res => {
    console.log(res);
})
.catch(e => {
    console.log(e);
})