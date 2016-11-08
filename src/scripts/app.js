const ReactDOM = require('react-dom');
const React = require('react');
const Backbone = require('backbone');

let seedDataModels = require('./seed.js')

const HomeView = React.createClass({

   getInitialState: function(){

      let startingStateObj = {
         currentViewSetting : 'ALL',
         previewImgUrl: 'http://www.allensguide.com/img/no_image_selected.gif',
         //(1d) Put array of modles on the component's state
         shoutOutData : this.props.shoutOutDataMods
      }

      return startingStateObj
   },

   componentWillMount: function(){
      let outerMsg = 'woahhhhhh'
      Backbone.Events.on("change-rating", function(newRating){
         console.log( outerMsg, newRating)
         this.setState({
            currentViewSetting: newRating
         })
      }.bind(this))
   },

   _handleImgPreviewClick: function(){
      console.log('button CLICKED!!!!!')
      console.log('img input val', this.refs.imgInputEl.value)
      let currentImgInput = this.refs.imgInputEl.value
      let newStateObj = {}

      if( currentImgInput.length  > 0   ) {
         newStateObj = { previewImgUrl: currentImgInput }
      } else {
         newStateObj = this.startingStateObj
      }
      this.setState(newStateObj)
   },

   //
   _addSubmission: function(evt){
      let theMsg = this.refs.theMsgEl.value
      let msgFrom = this.refs.msgFromEl.value
      let theImg = this.refs.imgInputEl.value

      let modAttributes = {
         msg: theMsg,
         imgLink: theImg,
         from: msgFrom
      }

      let newMod = new ShoutOutModel()
      newMod.set(modAttributes)

      let copyOfShoutList = this.state.shoutOutData.map(function(m){return m })
      copyOfShoutList.push(newMod)

      let newStateObj = {shoutOutData: copyOfShoutList}
      this.setState(newStateObj)
   },

   render: function(evt){

      return (
         <div className="container">
            <h1>Shout Outs</h1>
            <NavView/>
            <div className="row">
               <div className="col-sm-4 new-shoutout">
                     <h3>Your Message</h3>
                     <input type="text" className="form-control"  ref="theMsgEl"/>

                     <hr/>

                     <h4>Message From </h4>
                     <input type="text" className="form-control" ref="msgFromEl"/>

                     <hr/>

                     <h4>Add Image</h4>

                     <input type="text" className="form-control" ref="imgInputEl"/>
                     <button className="btn btn-block btn-default btn-warning btn-sm" onClick={this._handleImgPreviewClick} >Add Image</button>

                     <br/>

                     <div href="#" className="thumbnail">
                           <img src={this.state.previewImgUrl} alt="no image found"/>
                     </div>
                     <br/>
                     <button className="btn btn-block btn-success btn-lg" onClick={this._addSubmission}>+</button>
               </div>

               <ShoutOutList
                  shoutData={ this.state.shoutOutData }
                  currentViewFilter={this.state.currentViewSetting}
               />

            </div>

         </div>
      )
   }
})


const ShoutOutList = React.createClass({
   //
   render: function(){
      let self = this
      let filteredModelsList = this.props.shoutData.filter(function(modl){
         if(self.props.currentViewFilter.toUpperCase() === 'ALL'){
            return true
         } else {
            return modl.get('rating') === self.props.currentViewFilter
         }
      })

      let arrayOfShoutOutJSX = filteredModelsList.map(function(smod){
         return (
            <ShoutItem shoutModl={smod} key={smod.cid}/>
         )
      })

      return (
         <div className="col-sm-8">
            <h2>¡Shout Outs!</h2>

            <div className="shoutout">

               {arrayOfShoutOutJSX}

            </div>
         </div>

      )
   }
})

const NavView = React.createClass({
   _handleNavClick: function(evt){
      console.log('MARCO', evt.target.dataset.rated)
      let updatedRating = evt.target.dataset.rated
      Backbone.Events.trigger("change-rating", updatedRating )
   },

   render: function(){
      return (
         <div>
            <hr/>
            <button className="btn-primary btn btn-lg" onClick={this._handleNavClick} data-rated="ALL">All</button>
            <button className="btn-default btn btn-lg" onClick={this._handleNavClick} data-rated="G">Family Friendly (Rated G)</button>
            <button className="btn-default btn btn-lg" onClick={this._handleNavClick} data-rated="PG">Parental Guidance (Rated PG)</button>
            <button className="btn-default btn btn-lg" onClick={this._handleNavClick} data-rated="R">Mature Audiences (Rated R)</button>
            <hr/>
         </div>
      )
   }
})

const ShoutItem = React.createClass({
   render: function(){
      return (
         <blockquote  style={{background: 'indianred', color: '#fff', padding: '4rem'}}>
            <p>{this.props.shoutModl.get('msg')}</p>
            <img src={this.props.shoutModl.get('imgLink')} alt="..."/>
            <cite>{this.props.shoutModl.get('from')}</cite>
            <h3 className="text-muted text-right">
               RATING:
               <span className="bg-warning text-primary text-center" style={{padding: '10px'}}>
                  {this.props.shoutModl.get('rating')}
               </span>
            </h3>
         </blockquote>
      )
   }
})


ReactDOM.render(<HomeView shoutOutDataMods={seedDataModels}/>, document.querySelector('#app-container'))
