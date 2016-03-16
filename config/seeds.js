var mongoose = require('mongoose');
var User = require('../models/user')
var Project = require('../models/project')
mongoose.connect('mongodb://localhost/green-app');

function drop(){
mongoose.connect('mongodb://localhost/green-app', function() {
  User.collection.drop();
  Project.collection.drop();
 });
}
drop();



var User = require('../models/user');
var Project = require('../models/project');


var user1 = new User({
  name: "Enrico Rainsome",
  username:"admin",
  email: "admin@admin.com",
  avatar: "http://www.eonline.com/eol_images/Entire_Site/2014913/rs_600x600-141013090723-600-jared-leto-tree-hugging-instagram.ls.101314.jpg",
  postcode: "E1 5ED",
  password: "password",
  passwordConfirmation: "password"
},function(err, user){
  if(err) console.error(err);
  else console.log(user);
});
user1.save();

var user2 = new User({
 name: "Henry Tallyho",
 email: "autovincelynch@gmail.com",
 postcode: "E2 7NS",
 avatar: "http://i2.cdn.turner.com/cnnnext/dam/assets/140926165711-john-sutter-profile-image-large-169.jpg",
 // projects: project1._id,
 password: "password",
 passwordConfirmation: "password"
});
user2.save();

var user3 = new User({
 name: "George Bigbucks",
 email: "george@gmail.com",
 postcode: "SW3 3DL",
 avatar: "https://lh3.googleusercontent.com/-wysvRmf4xz4/AAAAAAAAAAI/AAAAAAAAAAA/GluI72KIjv0/photo.jpg",
 // projects: project1._id,
 password: "password",
 passwordConfirmation: "password"
});
user3.save();
var user4 = new User({
 name: "Steve Loveit",
 email: "steve@gmail.com",
 postcode: "E8 4QN",
 avatar: "http://www.lawyersweekly.com.au/images/LW_Media_Library/594partner-profile-pic-An.jpg",
 // projects: project1._id,
 password: "password",
 passwordConfirmation: "password"
});
user4.save();
var user5 = new User({
 name: "Bobbie Shocker",
 email: "bob@gmail.com",
 postcode: "SW11 3JR",
 avatar: "http://zblogged.com/wp-content/uploads/2015/11/17.jpg",
 // projects: project1._id,
 password: "password",
 passwordConfirmation: "password"
});
user5.save();

var user6 = new User({
name: "Fred Hopkins",
email: "hopkins@gmail.com",
postcode: "SE2 3SD",
avatar:"https://www.cheme.cornell.edu/engineering2/customcf/iws_news/uploads/alabi__reis.jpg",
//projects: [{ type: mongoose.Schema.ObjectIt, ref: 'Projects'}],
password: "fred"
});
user6.save();


var project0 = new Project({
title:  "Energy Garden",
  projectType: "Energy",
  projectDate: "5-20-2016",
  lat: "51.5240023",
  lng: "-0.1003084",
  addresslineOne: "City Hall",
   addresslineTwo: "London",
desc: "Energy Gardens are spaces for local people to come together and grow food, generate and use clean energy, improve the local environment and build their community. They are green spaces where people will have the opportunity to get their hands in the soil to grow vegetables, get on roofs to install solar panels, communicate with other gardening groups via solar powered interactive message boards and learn about how to make preserves, brew beer, harvest honey, store seeds, cook and support biodiversity. Crops from the garden will be shared with local people and food banks. Projects like honey and hops will be shared with volunteers and supporters. With the support of Players of the People's Postcode Lottery and the London Sustainable Development Commission, and in partnership with community gardening experts Groundwork London, Repowering is creating fifty gardens across the capital's Overground stations. - See more at: http://www.repowering.org.uk/projects/energy-garden#sthash.ONTIenLd.dpuf",
  image: "http://d3dza3qm7hzbjp.cloudfront.net/uploads/ckeditor/pictures/55c0b2a172657061b46e0000/content_EnergyGarden.jpg",
  gallery: ["http://d3dza3qm7hzbjp.cloudfront.net/uploads/ckeditor/pictures/55c0b51d72657061b46f0000/content_EnergyGarden3.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuU3HmFfPGeiXQjeXYRbFli9LJyeIXeJndsmYbp7RE8JowtFBwNUUT4sEh"],
 attendees: [user1._id,user2._id,user3._id,user4._id,user5._id,user6 ._id]
});

var project1 = new Project({
  title:  "Rain on Me",
  projectType: "Environmental",
  projectDate: 5/15/2016,
  lat: "51.459849", 
  lng: "-0.117187",
  addresslineOne: "Brixton",
   addresslineTwo: "London",
desc: "Rainwater harvesting info session",
  image: "https://s-media-cache-ak0.pinimg.com/236x/03/e9/b9/03e9b99784b7abe86b6a40b52b986346.jpg",
  gallery: ["http://www.blackinsurancenews.com/wp-content/uploads/2015/04/rainwater-harvesting.jpg", "http://www.energydigital.com/public/uploads/large/large_article_im3031_london-olympics-2012.jpg"],
  attendees: [user1._id,user2._id,user3._id,user4._id,user5._id,user6 ._id]
   });
  project1.save(function(err, users){
      if(err) console.error(err);
  });//




  var project2 = new Project({
     title: "Spiny pals",
     projectType: "Animals",
     projectDate: 03/31/2016,
     lat: "51.5186568",
     lng: "-0.0705147",
     addresslineOne: "68-80 Hanbury St",
     addresslineTwo: "London",
     postcode: "E1 5JL",
     desc: "Spiny pals is a meeting where we will discuss ways in which our community can help slow the decline of the hedgehog pupulation",
     image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR7W_VmTVhSlf45O99_MTetZvpnqrqYEHOA39ruGR1eqASqsgUWMzbsfT1z",
     gallery: [],
     attendees: [user1._id,user2._id,user3._id,user4._id,user5._id]
  });








  var project3 = new Project({
    title:  "I Can't Stand the Rain…Against my Window",
    projectType: "Environmental",
    projectDate: 5/25/2016,
    lat: "51.5154863",
    lng: "-0.1286212",
    addresslineOne: "179 Haggerston Rd",
     addresslineTwo: "London E8 4JB",
  desc: "Rainwater Harvesting Barrel Building Workshop",
    image: "https://rekhadhyani.files.wordpress.com/2013/04/rain.jpg?w=636&h=508",
    gallery: ["http://texaslandscapemagazine.com/wp-content/uploads/2015/03/Rainwater-Collection.jpg"],
  attendees: [user1._id,user2._id,user3._id,user4._id,user5._id]
    });



    var project4 = new Project({
    title: "Brixton Energy Solar 4",
    projectType: "Energy",
    projectDate: 21/10/16,
    lat: "51.460045",
    lng: "-0.115064",
    addresslineOne: "Community Centre",
    addresslineTwo: "Brixton",
    desc: "Brixton Energy Solar 4 is a new co-operative set up to enable local people to invest in renewable energy generation in Brixton and raise funds for energy efficiency initiatives. Brixton Energy Solar 4 is currently in planning, but you can use the pledge support button on this page to be kept informed, get involved or show your support.",
    image: "http://d3d7rtxd5tie6q.cloudfront.net/assets/about-us/syed.png",
    gallery: ["http://d3d7rtxd5tie6q.cloudfront.net/assets/about-us/syed.png" ],
    attendees: [user1._id,user2._id,user3._id,user4._id,user5._id]
   });



    var project5 = new Project({
     title:  "I Can't Stand the Rain…Against my Window",
      projectType: "Environmental",
      projectDate: 5/25/2016,
      lat: "51.5369818",
      lng: "-0.1421302",
      addresslineOne: "179 Haggerston Rd",
       addresslineTwo: "London E8 4JB",
    desc: "Housed in the homes of real BlueBarrel customers, our workshops begin with an indoor educational session on rainwater harvesting, and then transition outside to build a BlueBarrel System between 8 and 12 barrels in size. Each participant has a hand in construction, gaining the skills and confidence to go home and build their own system.",
      image: "http://cdn.instructables.com/F8A/9DNT/FWX11M0H/F8A9DNTFWX11M0H.RECT2100.jpg",
      gallery: ["http://texaslandscapemagazine.com/wp-content/uploads/2015/03/Rainwater-Collection.jpg"],
     attendees: [user1._id,user2._id,user3._id,user4._id,user5._id]
      });


    var projectowner1 = new User({
      name: "project_owner1",
      projects: [project1._id],
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
      name: "project_owner2",
      projects: [project2._id],
      email: "project_owner2@gmail.com",
      postcode: "SE2 3SD",
      avatar:"https://www.cheme.cornell.edu/engineering2/customcf/iws_news/uploads/alabi__reis.jpg",
      password: "fred",
      passwordConfirmation: "fred"
      });
    projectowner2.save(function(err, user){
      if(err) console.error(err);
      else console.log(user);
    });

    var projectowner3 = new User({
      name: "project_owner3",
      projects: [project3._id],
      email: "project_owner3@gmail.com",
      postcode: "S2 3SD",
      avatar:"https://www.cheme.cornell.edu/engineering2/customcf/iws_news/uploads/alabi__reis.jpg",
      password: "fred",
      passwordConfirmation: "fred"
      });
    projectowner3.save(function(err, user){
      if(err) console.error(err);
      else console.log(user);
    });

    var projectowner4 = new User({
      name: "project_owner4",
      projects: [project4._id],
      email: "project_owner4@gmail.com",
      postcode: "E2 3SD",
      avatar:"https://www.cheme.cornell.edu/engineering2/customcf/iws_news/uploads/alabi__reis.jpg",
      password: "fred",
      passwordConfirmation: "fred"
      });
    projectowner4.save(function(err, user){
      if(err) console.error(err);
      else console.log(user);
    });

    var projectowner5 = new User({
      name: "project_owner5",
      projects: [project5._id,project0._id],
      email: "project_owner5@gmail.com",
      postcode: "SW2 3SD",
      avatar:"https://www.cheme.cornell.edu/engineering2/customcf/iws_news/uploads/alabi__reis.jpg",
      password: "fred",
      passwordConfirmation: "fred"
      });
    projectowner5.save(function(err, user){
      if(err) console.error(err);
      else console.log(user);
    });


      project2.save(function(err, users){
  if(err) console.error(err);
    project3.save(function(err, users){
  if(err) console.error(err);
    project4.save(function(err, users){
  if(err) console.error(err);
    project5.save(function(err, users){
  if(err) console.error(err);

  ////////////// in the middle of the call back death //





    mongoose.connection.close();







    });
  });
 });
});
