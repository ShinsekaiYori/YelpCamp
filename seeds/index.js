const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp')


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
//your user:id
            author: '61350dbb12a36ebd00ad4d72',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus interdum nibh at efficitur. Proin in leo in lacus elementum ultrices in ac felis. Fusce congue porttitor massa, varius varius elit feugiat eget. Morbi commodo mollis lorem, rhoncus fringilla mi iaculis ut. Etiam mollis eget lorem vitae vehicula. Nullam tempus sem et eros fermentum, sed consectetur ex imperdiet. Ut lacinia arcu nisi. Sed in augue eu ante laoreet congue ut eget erat. Vestibulum pretium lorem faucibus tellus viverra scelerisque.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude

                ]
            },

            images: [
                {
                    url: 'https://res.cloudinary.com/de6s5sby4/image/upload/v1631032080/YelpCamp/whhfuvinf45oi9g4lryg.png',
                    filename: 'YelpCamp/whhfuvinf45oi9g4lryg',
                },
                {
                    url: 'https://res.cloudinary.com/de6s5sby4/image/upload/v1631032082/YelpCamp/tlctppbbn6ph7yjh2flk.jpg',
                    filename: 'YelpCamp/tlctppbbn6ph7yjh2flk',
                },
                {
                    url: 'https://res.cloudinary.com/de6s5sby4/image/upload/v1631032084/YelpCamp/ed2ukkdxmi1dsbvqmfb2.jpg',
                    filename: 'YelpCamp/ed2ukkdxmi1dsbvqmfb2',
                },
                {
                    url: 'https://res.cloudinary.com/de6s5sby4/image/upload/v1631032090/YelpCamp/yswhaoisqn58mo3jzx1i.jpg',
                    filename: 'YelpCamp/yswhaoisqn58mo3jzx1i',
                }
            ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})