const Backbone = require('backbone')
const { ShoutOutModel, ShoutOutCollection } = require('./model.js')
const STORE = require('./store.js')

const ACTIONS = {
   fetchShoutData: function(){
      let shoutOutCollInstance = new ShoutOutCollection()
      shoutOutCollInstance.fetch().then(function(){
         STORE.setStore('shoutOutData', shoutOutCollInstance)
      })
   },

   createNewShoutOut: function(modAttributes){
      let newMod = new ShoutOutModel()
      newMod.set(modAttributes)
      newMod.save().then(function(serverRes){
         ACTIONS.fetchShoutData()
      })
   },

   changeViewSetting: function(viewSetting){
      STORE.setStore('currentViewSetting', viewSetting)
   },


}

module.exports = ACTIONS
