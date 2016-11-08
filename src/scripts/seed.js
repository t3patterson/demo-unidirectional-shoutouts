const Backbone = require('backbone');

let ShoutOutModel = Backbone.Model.extend({})

let seedArray = [
   {
      msg: "HELLOOO HOW ARE YOU????",
      imgLink: "https://debragettlemanrak.files.wordpress.com/2011/04/angrykid.jpg",
      from: "Billy",
      rating: 'R  '
   },
   {
      msg: "React seemed great but now it is making me so sad",
      from: 'TIY CHS Sep-2016',
      imgLink: "http://2.bp.blogspot.com/-Iaqmr6Y72fg/UhacXxZIKFI/AAAAAAAAAsA/P3CpMxA7_LM/s1600/sad-banana-2.jpg",
      rating: 'G'

   },
   {
      msg: "Mister Potato Head!!!!",
      from: 'Bubba',
      imgLink: "http://img.lum.dolimg.com/v1/images/open-uri20150422-20810-enmr1e_871e8eac.jpeg",
      rating: 'G'
   },
   {
      msg: "good times with col. Sanders",
      from: "KFC crew",
      imgLink: "http://3.bp.blogspot.com/_50Dux7reTOc/TSkt4uANa6I/AAAAAAAACn0/P8u91b0OBQU/s1600/RA+OMEN+RAD+ANTHEM_SURF+AMBASSADOR+HENDO.png",
     rating: "R"
  },
  {
    msg: "In other news…….",
      from: 'Ron Burghandy',
      imgLink: "http://s2.quickmeme.com/img/c6/c6244e91ee9d13dd00e60222fb097c8e12c62d2e421f28e5cb5314def1e4be3c.jpg",
      rating: "R"
   },
   {
      msg: "All I need are some tasty waves, a good buzz and I'm fine",
      from: 'Jeff',
      imgLink: "http://www.surfertoday.com/images/stories/jeffspicoli.jpg",
      rating: "PG"
   },
   {
      msg: "Steve Buschemiiii. May wanna make sure the kids dont cry too hard",
      from: 'Jordan',
      imgLink: "http://65.media.tumblr.com/0438350175391a71727f8dac6e7be433/tumblr_inline_ocq7jpUfgv1r63chl_400.png",
      rating: "PG"
   }


]

let seedArrayOfModels = seedArray.map(function(shoutOutObj){
   let modelInstance = new ShoutOutModel()
   modelInstance.set(shoutOutObj)
   return modelInstance
})


module.exports = seedArrayOfModels
