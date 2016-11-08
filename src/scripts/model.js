const Backbone = require('backbone');

const ShoutOutModel = Backbone.Model.extend({
   url: '/api/shoutouts/',
   idAttribute: "_id",
})

const ShoutOutCollection = Backbone.Collection.extend({
   model: ShoutOutModel,
   url: "/api/shoutouts"
})


module.exports = {
   ShoutOutModel,
   ShoutOutCollection
}
