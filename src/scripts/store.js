const { ShoutOutModel, ShoutOutCollection } = require('./model.js')

const STORE = {
   _data:  {
       currentViewSetting : '',
       previewImgUrl: '',
       navClicks: 0,
       shoutOutData : new ShoutOutCollection(),
    },

   setStore: function(storeProp, payload){
      if(typeof storeProp !== 'string'){
         console.error('hey use a string for 1st property')
         return
      }

      if(typeof this._data[storeProp] === 'undefined'){
         console.error(`Sorry, ${storeProp} is not a value on the store, you need to declare it`)
         return
      }

      this._data[storeProp] = payload
      this.onChangeCb(this._data)
   },

   getStoreData: function(){
      return this._data
   },

   onChange: function(someFunc){
      this.onChangeCb = someFunc
   }

}

module.exports = STORE
