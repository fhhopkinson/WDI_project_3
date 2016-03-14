var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/green-app');
mongoose.connection.on('open', function(){
  mongoose.connection.db.dropDatabase(function(err){
    console.log(err);
  });


var User = require('../models/user');
var Project = require('../models/project');

var project1 = new Project({
   title: "Lets pick up cans on the heath",
   projectType: "recycling",
   projectDate: 24/07/2016,
   lat: "51.5608454",
   lng: "-0.1653263",
   desc: "An amazing opportunity to get our local space looking great again and safe for all to enjoy",
   image: "https://pbs.twimg.com/media/CIwMqZuXAAInkOc.jpg"
 });


var project2 = new Project({
   title: "Hedgehogs need space to move!",
   projectType: "animal",
   projectDate: 24/05/2016,
   lat: "51.5551355",
   lng: "-0.0621014",
   desc: "Lets give the Hedgehogs room to explore",
   image: "http://www.junkymonkey.co.uk/wp-content/gallery/recycling/caterpiller.jpg"
 });

var project3 = new Project({
  title: "Lets clean up hackney fields after BBQ day",
  projectType: "energy",
  projectDate: 16/04/2016,
  lat: "51.5312496",
  lng: "-0.2270089",
  image: "http://www.hackneyhive.co.uk/index/wp-content/uploads/2011/05/bbqlondon-fields.jpg",
  desc: "Its BBQ season, and used BBQs can be a fire risk, the mess can be a hazard to children lets keep the place tidy and show people how to recycle"
});


var project4 = new Project({
  title: "Hampstead Energy Group-Meet",
  projectType: "energy",
  projectDate: 16/03/2016,
  lat: "51.506987",
  lng: "-0.179165",
  image: "http://www.hackneyhive.co.uk/index/wp-content/uploads/2011/05/bbqlondon-fields.jpg",
  desc: "A get togther to discuss local energy projects, and what we can do to reduce our use of Fossil fuels, and give back power to the community"
});


User.create([{
  username:"admin",
  email: "admin@admin.com",
  password: "password",
  passwordConfirmation: "password"
}],function(err, users){
  if(err) console.error(err);
  else console.log(users);
      

        project1.save(function(err, users){
      if(err) console.error(err);
          project2.save(function(err, users){
        if(err) console.error(err);
          project3.save(function(err, users){
        if(err) console.error(err);
          project4.save(function(err, users){
        if(err) console.error(err);
    mongoose.connection.close();
    });
       });
      });
    });
  });
});
