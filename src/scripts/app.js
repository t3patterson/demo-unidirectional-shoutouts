const ReactDOM = require('react-dom');
const React = require('react');
const Backbone = require('backbone');

// (PART 0-A - Setup the STORE  )
const STORE = require('./store.js');

// (PART 0-B - Setup the ACTIONS  )
const ACTIONS = require('./actions.js');

const {ShoutOutModel, ShoutOutCollection} = require('./model.js')

const HomeView = React.createClass({

   getInitialState: function(){
      //(1a) Set default values on the store
      STORE.setStore('currentViewSetting', 'ALL')
      STORE.setStore('previewImgUrl','http://www.allensguide.com/img/no_image_selected.gif')
      STORE.setStore('shoutOutData', new ShoutOutCollection() )

      //(1b) Set initial application state with store-getter
      let initialAppState = STORE.getStoreData()
      return initialAppState
   },

   componentWillMount: function(){
      let self = this


      //(2a) Listen for changes on the store and run this callback
      STORE.onChange(function(){
         console.log("????????")
         //(2b) Set the state every time an action changes the store changes
         self.setState(STORE.getStoreData())
      })

      //(3a) Fetch Action (@ initialization)
      ACTIONS.fetchShoutData()

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

   _addSubmission: function(evt){

      let theMsg = this.refs.theMsgEl.value
      let msgFrom = this.refs.msgFromEl.value
      let theImg = this.refs.imgInputEl.value
      let ratingVal = this.refs.ratingOptionsEl.value

      let shoutOutDataObj = {
         msg: theMsg,
         imgLink: theImg,
         from: msgFrom,
         rating:ratingVal
      }

      //(3c) .createNewShoutOut Action (fires on add-button click)
      ACTIONS.createNewShoutOut(shoutOutDataObj)

   },

   render: function(evt){

      return (
         <div className="container">
            <h1>Shout Outs</h1>
            <NavView selectedView={this.state.currentViewSetting}/>
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

                     <select className="form-control" ref="ratingOptionsEl">
                       <option value="G">Family Friendly (G)</option>
                       <option value="PG">Parental Guidance (PG)</option>
                       <option value="G">Mature Audiences (R)</option>
                     </select>

                     <br/>
                     <button className="btn btn-block btn-success btn-lg" onClick={this._addSubmission}>+</button>
               </div>

               <ShoutOutList
                  shoutData={ this.state.shoutOutData.models }
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
      }).reverse()

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
      let updatedRating = evt.target.dataset.rated
      //(3b) .changeViewSetting Action (fires on Nav-Button click)
      ACTIONS.changeViewSetting(updatedRating)

   },

   _getBtnClassName: function(viewType, currentView){
      if(viewType === currentView){
         return 'btn btn-primary btn-lg'
      } else {
         return 'btn btn-default btn-lg'

      }
   },

   render: function(){
      let currentSelectedView = this.props.selectedView

      return (
         <div>
            <hr/>
            <button className={ this._getBtnClassName('ALL', currentSelectedView) } onClick={this._handleNavClick} data-rated="ALL"  >All</button>
            <button className={ this._getBtnClassName('G', currentSelectedView) } onClick={this._handleNavClick} data-rated="G"  >Family Friendly (Rated G)</button>
            <button className={ this._getBtnClassName('PG', currentSelectedView) } onClick={this._handleNavClick} data-rated="PG"  >Parental Guidance (Rated PG)</button>
            <button className={ this._getBtnClassName('R', currentSelectedView) } onClick={this._handleNavClick} data-rated="R"  >Mature Audiences (Rated R)</button>
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

let dataModels
if (typeof dataModels === 'undefined' ){
   dataModels = []
}

let shoutOutCollInstance = new ShoutOutCollection()

ReactDOM.render(<HomeView shoutOutDataColl={shoutOutCollInstance}/>, document.querySelector('#app-container'))
