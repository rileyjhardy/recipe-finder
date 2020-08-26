import {store} from "./reducers"

const SEARCH = "SEARCH";
const ADDTOFAV = "ADDTOFAV";
const DELETEFROMFAV = "DELETEFROMFAV";
const MAKESHOPLIST = "MAKESHOPLIST";
const RECEIVED_DATA = "RECEIVED_DATA";
const ACTIVATESEARCH = "ACTIVATESEARCH";
const ACTIVATEMYRECIPES = "ACTIVATEMYRECIPES";
const ACTIVATESHOPPINGLIST = "ACTIVATESHOPPINGLIST";
const LOADING = "LOADING";
const DONELOADING = "DONELOADING";

const Loading = string => {
  return {
    type: LOADING
  }
}
const Doneloading = string => {
  return {
    type: DONELOADING
  }
}

const Search = searchTerm => {
  return {
    type: SEARCH,
    data: searchTerm
  };
};
const ReceivedData = data => {
  return {
    type: RECEIVED_DATA,
    apiData: data
  };
};

const ActivateSearch = string => {

  return {
    type: ACTIVATESEARCH
  };
};
const ActivateMyRecipes = string => {
  
  return {
    type: ACTIVATEMYRECIPES
  };
};
const ActivateShoppingList = string => {
  return {
    type: ACTIVATESHOPPINGLIST
  };
};
const AddToFav = id => {
  return {
    type: ADDTOFAV,
    id: id
  };
};
const DeleteFromFav = id => {
  return {
    type: DELETEFROMFAV,
    id: id
  }
}

const handleAsync = term => {
  return function(dispatch) {
    console.log(store.getState());
    dispatch(Loading());
    console.log(store.getState());
    const req = new XMLHttpRequest();
    req.open(
      "GET",
      "https://api.spoonacular.com/recipes/complexSearch?query=" +
        term +
        "&number=5&fillIngredients=true&instructionsRequired=true&addRecipeInformation=true&apiKey=8a770aebd0104fc38395a5ef9a96bd6a",
      true
    );
    req.send();

    req.onload = function() {
      const json = JSON.parse(req.responseText);
        console.log(json);
      dispatch(ReceivedData(json));
      console.log(json);
      dispatch(Doneloading());
    };
  };
};

export {
  Search,
  Loading,
  LOADING,
  DONELOADING,
  Doneloading,
  ReceivedData,
  ActivateSearch,
  ActivateMyRecipes,
  ActivateShoppingList,
  AddToFav,
  DeleteFromFav,
  handleAsync,
  ADDTOFAV,
  DELETEFROMFAV,
  MAKESHOPLIST,
  RECEIVED_DATA,
  ACTIVATESEARCH,
  ACTIVATEMYRECIPES,
  ACTIVATESHOPPINGLIST
};
