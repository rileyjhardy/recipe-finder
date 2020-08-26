import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { handleAsync, Search, ActivateSearch,ActivateMyRecipes,ActivateShoppingList, AddToFav, DeleteFromFav, Doneloading, Loading } from "./actioncreators";
import { Nav, Header, Input, Results, FavDisplayed, ShopListDisplayed} from "./components";
import { store } from "./reducers";
import "./styles.css";
import $ from "jquery";
import {Spinner} from 'react-bootstrap'

class RecipeApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deleteFav = this.deleteFav.bind(this);
this.handleCollapse = this.handleCollapse.bind(this);
    
  }
  handleChange(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  handleSearch() {
    
    store.dispatch(handleAsync(this.state.searchTerm));
  }
  
  handleClick(e){

    const test2 = this.props.appdata.search.searchResults[e.target.value];

    
    store.dispatch(AddToFav(test2))
  }

  deleteFav(e){
    store.dispatch(DeleteFromFav(e.target.value));
    
  }

  handleCollapse(e){
    

var tocollapse = e.target.id + 'a';
var test = '#' + tocollapse.toString();
console.log(test);
$(test).toggleClass("display-no");


  }

  render() {  
    const results = [];
   
    if (this.props.appdata.search.render === true){ 
  
    for (var i = 0; i < 5; i++){
      results.push(<Results title = {this.props.appdata.search.searchResults[i]["title"]} image={this.props.appdata.search.searchResults[i]["image"]} ing = {this.props.appdata.search.searchResults[i]["missedIngredients"]} instructions = {this.props.appdata.search.searchResults[i]["analyzedInstructions"][0]["steps"]} time={this.props.appdata.search.searchResults[i]["readyInMinutes"]} servings = {this.props.appdata.search.searchResults[i]["servings"]} source = {this.props.appdata.search.searchResults[i]["sourceName"]} fav = {this.handleClick} id = {i} key={this.props.appdata.search.searchResults[i]["id"]}/>);
    }
      
    }

 
    const FavList = this.props.appdata.fav.favRecipes.map(x => (
      <FavDisplayed title={x["title"]} numing={x["missedIngredients"].length} delete={this.deleteFav} key={x["id"]} id={x["id"]} favyet={this.props.appdata.fav.favRecipes.length} collapse={this.handleCollapse} ingredients={x["missedIngredients"]} instructions={x["analyzedInstructions"][0]["steps"]} />
    ))

    const ShopList = [];
    
    for (var i = 0; i < this.props.appdata.fav.favRecipes.length; i++){
      for (var j = 0; j < this.props.appdata.fav.favRecipes[i]["missedIngredients"].length; j++){ 
        if (ShopList.indexOf(this.props.appdata.fav.favRecipes[i]["missedIngredients"][j]["name"]) === -1){
      ShopList.push(this.props.appdata.fav.favRecipes[i]["missedIngredients"][j]["name"]);

      };
    };
  };
    const ShopList2 = ShopList.map(x => (
      <li key={x.indexOf}>{x}</li>
    ))




   
    return (
      <div className="App">
        
          <Header />
          <div className="inner-boundary container-fluid">
          <Nav
            myrecipe={this.props.activateMyRecipes}
            search={this.props.activateSearch}
            shop={this.props.activateShoppingList}
          
          />
          {(this.props.appdata.activate.activeTab === "Search")? <div><Input
            change={this.handleChange}
            values={this.state.searchTerm}
            async={this.handleSearch}
            render={this.props.appdata.search.render}
            title={this.props.appdata.search.title}
            image={this.props.appdata.search.image}
            time={this.props.appdata.search.cooktime}
            amount={this.props.appdata.search.servings}

          />{results}</div> : null}


        {(this.props.appdata.search.isFetching === true)? <div className="text-center"><Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner></div> : null}
        {(this.props.appdata.activate.activeTab === "My Recipes")? ((this.props.appdata.fav.favRecipes.length === 0)? <div><br /><p style={{textAlign: "center"}}>No recipes yet</p></div> : <div><p>Click recipe to expand</p>{FavList}<p>Go to shopping list for an aggregated list of ingredients</p></div>) : null}

        

      {(this.props.appdata.activate.activeTab === "Shopping List")?
      <ShopListDisplayed combineing={ShopList2} shopyet={this.props.appdata.fav.favRecipes.length} /> : null}
      
      

          </div>
          
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    appdata: state
  };
};

const mapDispatchToProps = dispatch => {
  
  return {
    searchRecipes: searchTerm => {dispatch(Search(searchTerm));},
    activateSearch: () => {dispatch(ActivateSearch());},
    activateMyRecipes: () => {dispatch(ActivateMyRecipes());},
    activateShoppingList: () => {dispatch(ActivateShoppingList())},
    addToFav: (id) => {dispatch(AddToFav(id))},
    deleteFromFav: (id) => {dispatch(DeleteFromFav(id))},
    loading: () => {dispatch(Loading())},
    doneLoading: () => {dispatch(Doneloading())}
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeApp);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}
console.log(store.getState());
const rootElement = document.getElementById("root");
ReactDOM.render(<AppWrapper />, rootElement);
