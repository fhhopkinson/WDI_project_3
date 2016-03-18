var mongoose = require('mongoose');
var User = require('../models/user')
var Project = require('../models/project')
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/green-app';
mongoose.connect(mongoURI);

var User = require('../models/user');
var Project = require('../models/project');

User.collection.drop();
Project.collection.drop();

var user2 = new User({
 name: "Henry Tallyho",
 email: "henryTallho@gmail.com",
 postcode: "E2 7NS",
 avatar: "http://i2.cdn.turner.com/cnnnext/dam/assets/140926165711-john-sutter-profile-image-large-169.jpg",
 password: "qw",
 passwordConfirmation: "qw"
 // projects: project1._id,

});
user2.save();

var user3 = new User({
 name: "George Bigbucks",
 email: "george@gmail.com",
 postcode: "SW3 3DL",
 avatar: "https://lh3.googleusercontent.com/-wysvRmf4xz4/AAAAAAAAAAI/AAAAAAAAAAA/GluI72KIjv0/photo.jpg",
 password: "qw",
 passwordConfirmation: "qw"
 // projects: project1._id,

});
user3.save();
var user4 = new User({
 name: "Steve Loveit",
 email: "steve@gmail.com",
 postcode: "E8 4QN",
 avatar: "http://www.lawyersweekly.com.au/images/LW_Media_Library/594partner-profile-pic-An.jpg",
 password: "qw",
 passwordConfirmation: "qw"
 // projects: project1._id,

});
user4.save();

var user5 = new User({
 name: "Bobbie Shocker",
 email: "bob@gmail.com",
 postcode: "SW11 3JR",
 avatar: "http://zblogged.com/wp-content/uploads/2015/11/17.jpg",
 password: "qw",
 passwordConfirmation: "qw"
 // projects: project1._id,

});
user5.save();

var user6 = new User({
  name: "Fred Hopkins",
  email: "hopkins@gmail.com",
  postcode: "SE2 3SD",
  avatar:"https://www.cheme.cornell.edu/engineering2/customcf/iws_news/uploads/alabi__reis.jpg",
  password: "qw",
  passwordConfirmation: "qw"
//projects: [{ type: mongoose.Schema.ObjectIt, ref: 'Projects'}],
});
user6.save();

var user7 = new User({
  name: "Livs Foster",
  email: "foster@gmail.com",
  postcode: "SE4 3SD",
  avatar:"http://7-themes.com/data_images/out/75/7028553-beautiful-girl-style-profile-makeup.jpg",
  password: "qw",
  passwordConfirmation: "qw"
//projects: [{ type: mongoose.Schema.ObjectIt, ref: 'Projects'}],
});
user7.save();

var user8 = new User({
  name: "James Board",
  email: "bored@gmail.com",
  postcode: "SE1 5SD",
  avatar:"http://trevorastonphotography.co.uk/wp-content/uploads/2013/12/no-more-bad-profile-pictures.jpg",
  password: "qw",
  passwordConfirmation: "qw"
//projects: [{ type: mongoose.Schema.ObjectIt, ref: 'Projects'}],
});
user8.save();

var user9 = new User({
  name: "James Bond",
  email: "007@gmail.com",
  postcode: "NW1 5SD",
  avatar:"http://blog.mysinglepropertywebsites.com/wp-content/uploads/2010/07/tech-profile-shawn-anen.jpg",
  password: "qw",
  passwordConfirmation: "qw"
//projects: [{ type: mongoose.Schema.ObjectIt, ref: 'Projects'}],
});
user9.save();

var user10 = new User({
  name: "Fred Bond",
  email: "008@gmail.com",
  postcode: "W1 5SD",
  avatar:"http://wwwf.imperial.ac.uk/business-school/wp-content/uploads/2013/11/Makant-Profile-Picture.png",
  password: "qw",
  passwordConfirmation: "qw"
//projects: [{ type: mongoose.Schema.ObjectIt, ref: 'Projects'}],
});
user10.save();

var user11 = new User({
  name: "Vince Lynch",
  email: "autovincelynch@gmail.com",
  postcode: "NW5 1UX",
  avatar:"http://i.imgur.com/HGZVqP7.jpg",
  password: "password",
  passwordConfirmation: "password"
//projects: [{ type: mongoose.Schema.ObjectIt, ref: 'Projects'}],
});
user11.save();


var project0 = new Project({
  title:  "Energy Garden",
  projectType: "Energy",
  projectDate: "5/15/16",
  lat: "51.5240023",
  lng: "-0.1003084",
  addresslineOne: "City Hall",
  addresslineTwo: "London",
  postcode: "SE1 2AA",
  desc: "Energy Gardens are spaces for local people to come together and grow food, generate and use clean energy, improve the local environment and build their community. They are green spaces where people will have the opportunity to get their hands in the soil to grow vegetables, get on roofs to install solar panels, communicate with other gardening groups via solar powered interactive message boards and learn about how to make preserves, brew beer, harvest honey, store seeds, cook and support biodiversity. Crops from the garden will be shared with local people and food banks. Projects like honey and hops will be shared with volunteers and supporters. With the support of Players of the People's Postcode Lottery and the London Sustainable Development Commission, and in partnership with community gardening experts Groundwork London, Repowering is creating fifty gardens across the capital's Overground stations. - See more at: http://www.repowering.org.uk/projects/energy-garden#sthash.ONTIenLd.dpuf",
  image: "http://d3dza3qm7hzbjp.cloudfront.net/uploads/ckeditor/pictures/55c0b2a172657061b46e0000/content_EnergyGarden.jpg",
  gallery: ["http://d3dza3qm7hzbjp.cloudfront.net/uploads/ckeditor/pictures/55c0b51d72657061b46f0000/content_EnergyGarden3.jpg"],
 attendees: [user3._id,user4._id,user5._id,user6 ._id]
});//


var project1 = new Project({
  title:  "Rain on Me",
  projectType: "Environmental",
  projectDate: "6/25/16",
  lat: "51.69849",
  lng: "-0.117187",
  addresslineOne: "Brixton",
  addresslineTwo: "London",
  postcode: "SW9 9SL",
  desc: "The revolutionary system is based on a new cloud technology platform that uses sensor data, climate forecast information, & modelling to actively control, maintain, and monitor, water infrastructure.",
  image: "https://s-media-cache-ak0.pinimg.com/236x/03/e9/b9/03e9b99784b7abe86b6a40b52b986346.jpg",
  gallery: ["http://www.blackinsurancenews.com/wp-content/uploads/2015/04/rainwater-harvesting.jpg", "http://www.energydigital.com/public/uploads/large/large_article_im3031_london-olympics-2012.jpg"],
  attendees: [user3._id,user4._id,user5._id,user6 ._id]
});
project1.save(function(err, users){
  if(err) console.error(err);
  });//

var project2 = new Project({
 title: "Spiny Pals",
 projectType: "Animals",
 projectDate: "3/31/16",
 lat: "51.5186568",
 lng: "-0.0705147",
 addresslineOne: "68-80 Hanbury St",
 addresslineTwo: "London",
 postcode: "E1 5JL",
 desc: "Spiny pals is a meeting where we will discuss ways in which our community can help slow the decline of the hedgehog pupulation",
 image: "http://cdn.images.express.co.uk/img/dynamic/128/590x/hedgehog-garden-RSPCA-573919.jpg",
 gallery: ["http://barfblog.com/wp-content/uploads/2015/11/hedgehog.jpg"],
 attendees: [user2._id,user4._id,user5._id]
});

var project3 = new Project({
  title:  "I Can't Stand the Rain…Against my Window",
  projectType: "Environmental",
  projectDate: "5/25/16",
  lat: "51.5154863",
  lng: "-0.1286212",
  addresslineOne: "Buxton St",
  addresslineTwo: ", London",
  postcode: "E1 5AR",
  desc: "Rainwater Harvesting Barrel Building Workshop. Although it takes 12 years to get pay back from them economically, they are the right thing to do environmentally, says Waterwise managing director Jacob Tompkins.",
  image: "https://c1.staticflickr.com/9/8060/8222886048_9e6df4ecab_b.jpg",
  gallery: ["http://texaslandscapemagazine.com/wp-content/uploads/2015/03/Rainwater-Collection.jpg"],
  attendees: [user2._id,user3._id,user4._id,]
});

var project4 = new Project({
  title: "Brixton Energy Solar 4",
  projectType: "Energy",
  projectDate: "10/10/16",
  lat: "51.460045",
  lng: "-0.115064",
  addresslineOne: "Community Centre",
  addresslineTwo: "Brixton",
  postcode: "SW2 1AS",
  desc: "Brixton Energy Solar 4 is a new co-operative set up to enable local people to invest in renewable energy generation in Brixton and raise funds for energy efficiency initiatives. Brixton Energy Solar 4 is currently in planning, but you can use the pledge support button on this page to be kept informed, get involved or show your support.",
  image: "http://news.panasonic.com/global/images/04_blackfriars_CG.jpg",
  gallery: ["https://media.licdn.com/media/AAEAAQAAAAAAAANzAAAAJGU5Y2Q2Y2UzLTUyYjgtNDEzZi1hMTAwLTk0MGE1OThmM2JmZg.png", "http://static.standard.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2012/07/09/10/blackfriars-solar-.jpg", "https://static-secure.guim.co.uk/sys-images/Guardian/Pix/pictures/2010/8/11/1281538290059/solar-panels-006.jpg" ],
  attendees: [,user2._id,user3._id,user4._id,user5._id,user6._id]
});

var project5 = new Project({
 title:  "I Can't Stand the Rain",
 projectType: "Environmental",
 projectDate: "5/25/16",
 lat: "51.5369818",
 lng: "-0.1421302",
 addresslineOne: "12 Ingestre Rd",
 addresslineTwo: "London",
 postcode: "NW5 1UX",
 desc: "Housed in the homes of real BlueBarrel customers, our workshops begin with an indoor educational session on rainwater harvesting, and then transition outside to build a BlueBarrel System between 8 and 12 barrels in size. Each participant has a hand in construction, gaining the skills and confidence to go home and build their own system.",
 image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzK7bfHpGbda1GmTVNsRc0YXq4eud_oJLwdDvL6L16wf8G5_d2xQ",
 gallery: ["http://texaslandscapemagazine.com/wp-content/uploads/2015/03/Rainwater-Collection.jpg", "http://farm2.static.flickr.com/1049/4603516198_a4299a0f9f.jpg"],
 attendees: [user2._id,user3._id,user4._id,user5._id]
});

var project6 = new Project({
 title:  "Get our houses green!",
 projectType: "Lobbying",
 projectDate: "5/31/16",
 lat: "151.528471",
 lng: "-0.0846979",
 addresslineOne: "Buttersland Street",
 addresslineTwo: "London",
 postcode: "N1 6BY",
 desc: "Old and environmentally damaging industries often lobby effectively for less stringent regulations and are slow to adopt new and cleaner technologies. This paper explains the lobbying success of these industries in terms of the strategic role of investment as a credible commitment device. It is demonstrated that if governments are predisposed to special interest groups, underinvestment in new technology enables firms to lobby more effectively. Such industries are shown to be better placed to extract policy concessions, despite contributing less to the government in political donations. The analysis therefore suggests that political considerations may provide a significant incentive for firms to reject environmentally beneficial investments, even when these lower production costs.",
 image: "http://cdn.instructables.com/F8A/9DNT/FWX11M0H/F8A9DNTFWX11M0H.RECT2100.jpg",
 gallery: ["http://www.smithsofthedean.co.uk/rainsavers/Images/water-butts/Water%20Butts/recycled-210-water-butt4.JPG"],
 attendees: [user2._id,user3._id,user4._id,user5._id]
});

var project7 = new Project({
 title:  "Scrapheap Challenge",
 projectType: "Other",
 projectDate: "6/31/16",
 lat: "51.531295",
 lng: "-0.097089",
 addresslineOne: "City Road Basin",
 addresslineTwo: "London ",
 postcode: "N1 7TB",
 desc: "There is a pile of scrap metal and broken sofas and things that are polluting the river system and it is the aim of this project to clean this up and clean the water to and ensure that there will be no more problems like this.",
 image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Scrapyard_challenge_vw_beetle.jpg",
 gallery: ["http://previews.123rf.com/images/ljupco/ljupco0606/ljupco060600111/430569-Scrapheap-in-Skopje-Stock-Photo.jpg", "http://c7.alamy.com/comp/AB5H91/rubbish-dump-pile-landfill-waste-produce-products-man-made-AB5H91.jpg"],
 attendees: [user2._id,user3._id,user4._id,user5._id]
});

var project8 = new Project({
 title:  "Recycle This!",
 projectType: "Recycling",
 projectDate: "6/12/16",
 lat: "51.57677641121266",
 lng: "-0.012485262778113793",
 addresslineOne: "Bakers Avenue",
 addresslineTwo: "London ",
 postcode: "E17 9AH",
 desc: "Volunteers have been at the heart of our work at FRP for 25 years and we still couldn’t operate without the contribution that they make today. We set out to provide volunteering opportunities that are rewarding for those who help us to achieve our aims. By volunteering for FRP you can: gain work experience and learn new skills; meet other members of the local community; and earn a sense of achievement, from contributing to a practical project with environmental and social aim",
 image: "http://gallery.nen.gov.uk/assets/0908/0000/0373/scrap_heap.jpg",
 gallery: ["http://previews.123rf.com/images/ljupco/ljupco0606/ljupco060600111/430569-Scrapheap-in-Skopje-Stock-Photo.jpg", "http://c7.alamy.com/comp/AB5H91/rubbish-dump-pile-landfill-waste-produce-products-man-made-AB5H91.jpg"],
 attendees: [user2._id,user3._id,user4._id,user5._id]
});

var project9 = new Project({
 title:  "Badger Crossing",
 projectType: "Animals",
 projectDate: "4/12/16",
 lat: "51.57677641121266",
 lng: "-0.012485262778113793",
 addresslineOne: "Balham Park Road",
 addresslineTwo: "London",
 postcode: "SW12 8EA",
 desc: "Early fences and tunnels to prevent road kill and allow movement were not highly successful. The fences were too low and were not anchored in the ground, allowing the badgers to climb over or crawl under them and onto the road. The fences also frequently developed large holes, so they offered little protection. These deficiencies were corrected in later projects. Near the town of Heumen, for example, the national Ministry of Transport constructed five tunnels under the highway and built higher, stronger fences. Escape gates were put in the fences at one-kilometer-intervals to protect any badgers that ended up on the road. These meant the badgers could get off the roads, but couldn't get back on again.",
 image: "http://www.savethebadger.com/badgercubs.jpg",
 gallery: ["http://www.wildlifetrusts.org/sites/default/files/images/Badger%20web%20version%20(Tim%20Matthews).jpg", "http://i.telegraph.co.uk/multimedia/archive/02108/ba_2108798b.jpg"],
 attendees: [user4._id,user2._id,user3._id]
});

var project10 = new Project({
 title:  "Litter Picking",
 projectType: "Recycling",
 projectDate: "7/12/17",
 lat: "51.538492",
 lng: "-0.035889",
 addresslineOne: "25 Barge Lane",
 addresslineTwo: "London",
 postcode: "E3 5PF",
 desc: "There is a lot of litter in the park nearby adn I would like some help clearing it up as a clean park would benefit the community in two ways: Firstly, it would make the park nicer, secondly, it would help recycle and that would help save the environment",
 image: "http://cdn.nycitynewsservice.com/blogs.dir/9/files/2011/12/dirty-parks-DN.jpg",
 gallery: ["http://www.thetimes.co.uk/tto/multimedia/archive/00185/Hyde_Park_Litter_185437a.jpg","http://static01.nyt.com/images/2013/09/09/nyregion/RIVERSIDE/RIVERSIDE-master675.jpg"],
 attendees: [user2._id,user6._id]
 });

var user1 = new User({
  name: "Enrico Rainsome",
  username:"admin",
  email: "admin@admin.com",
  projects: [project9._id],
  avatar: "http://www.eonline.com/eol_images/Entire_Site/2014913/rs_600x600-141013090723-600-jared-leto-tree-hugging-instagram.ls.101314.jpg",
  postcode: "E1 5ED",
  password: "qw",
  passwordConfirmation: "qw"

},function(err, user){
  if(err) console.error(err);
  else console.log(user);
});
user1.save();

var projectowner1 = new User({
  name: "Peter Grimes",
  projects: [project1._id, project6._id,project7._id],
  email: "project_owner1@gmail.com",
  postcode: "SE1 3SD",
  avatar:"https://www.cheme.cornell.edu/engineering2/customcf/iws_news/uploads/alabi__reis.jpg",
  password: "fred",
  passwordConfirmation: "fred"
});
projectowner1.save(function(err, user){
  if(err) console.error(err);
  else console.log(user);
});

var projectowner2 = new User({
  name: "Richard Charles",
  projects: [project2._id],
  email: "project_owner2@gmail.com",
  postcode: "SE2 3SD",
  avatar:"https://www.morganstanley.com/assets/images/people/tiles/adam-parker-large.jpg",
  password: "fred",
  passwordConfirmation: "fred"
});
projectowner2.save(function(err, user){
  if(err) console.error(err);
  else console.log(user);
});

var projectowner3 = new User({
  name: "Charlie Brown",
  projects: [project3._id,project8._id,project10._id],
  email: "project_owner3@gmail.com",
  postcode: "S2 3SD",
  avatar:"https://www.morganstanley.com/assets/images/people/tiles/karlene-quigley-large.jpg",
  password: "fred",
  passwordConfirmation: "fred",
});
projectowner3.save(function(err, user){
  if(err) console.error(err);
  else console.log(user);
});

var projectowner4 = new User({
  name: "Hen French",
  projects: [project4._id],
  email: "project_owner4@gmail.com",
  postcode: "E2 3SD",
  avatar:"https://www2.mmu.ac.uk/media/mmuacuk/content/images/social-care-and-social-work/scsw-student-profile-mariola-mak.jpg",
  password: "fred",
  passwordConfirmation: "fred",
});
projectowner4.save(function(err, user){
  if(err) console.error(err);
  else console.log(user);
});

var projectowner5 = new User({
  name: "Albert Herring",
  projects: [project5._id,project0._id,project1._id],
  email: "project_owner5@gmail.com",
  postcode: "SW2 3SD",
  avatar:"https://www.cheme.cornell.edu/engineering2/customcf/iws_news/uploads/alabi__reis.jpg",
  password: "fred",
  passwordConfirmation: "fred",
});
projectowner5.save(function(err, user){
  if(err) console.error(err);
  else console.log(user);
});

project0.save(function(err, users){
  if(err) console.error(err);
  project1.save(function(err, users){
    if(err) console.error(err);
  project2.save(function(err, users){
    if(err) console.error(err);
    project3.save(function(err, users){
      if(err) console.error(err);
      project4.save(function(err, users){
        if(err) console.error(err);
        project5.save(function(err, users){
          if(err) console.error(err);
          project6.save(function(err, users){
            if(err) console.error(err);
            project7.save(function(err, users){
              if(err) console.error(err);
              project8.save(function(err, users){
                if(err) console.error(err);
                project9.save(function(err, users){
                  if(err) console.error(err);
                  project10.save(function(err, users){
                    if(err) console.error(err);
    ////////////// in the middle of the call back death //





  mongoose.connection.close();



                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
