import "./styles.css";
import {
  LOADING,
  DONELOADING,
  Doneloading,
  ACTIVATESEARCH,
  ACTIVATEMYRECIPES,
  ACTIVATESHOPPINGLIST,
  ADDTOFAV,
  DELETEFROMFAV
} from "./actioncreators";
import { RECEIVED_DATA } from "./actioncreators";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import $ from "jquery";

function ReduceAcivation(state = { activeTab: "Search" }, action) {

  switch (action.type) {
    case ACTIVATESEARCH:
      $(".nav li a").removeClass("active");
      $("#1").addClass("active");
      return Object.assign({}, state, { activeTab: "Search" });
    case ACTIVATEMYRECIPES:
      $(".nav li a").removeClass("active");
      $("#2").addClass("active"); 
      return Object.assign({}, state, { activeTab: "My Recipes" });
    case ACTIVATESHOPPINGLIST:
      $(".nav li a").removeClass("active");
      $("#3").addClass("active");
      return Object.assign({}, state, { activeTab: "Shopping List" });
    default:
        
      return state;
  }
}

const initialState = {
  render: false,
  activeTab: "",
  searchResults: [],
  isFetching: false
  
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_DATA:
  
      var newState = {
        render: true,
        searchResults: []
      
      };
      var test = action.apiData;
      console.log(test);

      for (var i = 0; i < test["results"].length; i++) {
        newState.searchResults.push(test["results"][i]);
      }
      
      
      return Object.assign({}, state, newState);
    case LOADING:

      return Object.assign({}, state, { isFetching: true});

    case DONELOADING:
      return Object.assign({}, state, { isFetching: false});
          
    default:
      
      return state;
  }
}



function FavReducer(state = {render: false, favRecipes: []}, action){
  switch(action.type){
    case ADDTOFAV:
    var newState1 = {
      render: true,
      favRecipes: []
      
    };
newState1.favRecipes.push(...state.favRecipes);
    newState1.favRecipes.push(action.id);
    
    
    return Object.assign({}, state, newState1);
    case DELETEFROMFAV:
    
    

    var beef = state.favRecipes.filter(x => (x.id != action.id));


    
    var newState2 = {
      render: true,
      favRecipes: beef
    }

    console.log(newState2);
    return Object.assign({}, state, newState2);
    
default:

return state;
  }
}


const rootReducer = combineReducers({
  activate: ReduceAcivation,
  search: Reducer,
  fav: FavReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export { store, Reducer, ReduceAcivation };

