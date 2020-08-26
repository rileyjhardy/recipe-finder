import "./styles.css";
import React from "react";
import $ from 'jquery';

const Nav = props => {
  return (
    <div>
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <a
            id="1"
            onClick={props.search}
            href="# "
            className="nav-link active"
          >
            Search
          </a>
        </li>
        <li className="nav-item">
          <a id="2" onClick={props.myrecipe} href="# " className="nav-link">
            My Recipes
          </a>
        </li>
        <li className="nav-item">
          <a id="3" onClick={props.shop} href="# " className="nav-link">
            Shopping List
          </a>
        </li>
      </ul>

      <br />
    </div>
  );
};

function Header() {
  return (
    <div className="header row">
      <div className="col-lg-12">
        <h1 className="header-text text-center">Recipe Finder</h1>
      </div>
    </div>
  );
}
const Results = props => {
  const ingredientList = props.ing.map(x => (
    <li key={x.original}>{x.original}</li>
  ));

  const instructions = props.instructions.map(x => (
    <li key={x.step}>{x.step}</li>
  ));

  return (
    <div>
      <div className="results shadow rounded border">
        <img
          src={props.image}
          className="img-fluid center-class rounded shadow-sm"
          alt="fail"
        />

        <div className="head">
          <h2 style={{ fontSize: "3vw" }}>
            <strong>{props.title}</strong> |{" "}
            <span style={{ fontSize: "15px", verticalAlign: "middle" }}>
              <i>
                ready in {props.time} min &#9679; {props.servings} servings
                &#9679; source: {props.source}
              </i>
            </span>
          </h2>
        </div>
        <div className="ing">
          <p>Ingredients:</p>
          <ul>{ingredientList}</ul>
        </div>
        <br />

        <div className="inst">
          <hr />
          <p>Instructions:</p>
          <ol>{instructions}</ol>
        </div>
        <button
          value={props.id}
          id="addbutton"
          className="btn-outline-primary col-sm-3 btn"
          onClick={props.fav}
        >
          Add to My List
        </button>
      </div>
      <br />
    </div>
  );
};

const Input = props => {
  return (
    <div>
      <div className="input-group inputgroup row justify-content-center">
        <input
          className="form-control col-lg-6 shadow-sm"
          onChange={props.change}
          value={props.values}
          placeholder="...rice, chicken, pasta"
        />
        <button
          className="btn btn-primary col-lg-1 shadow-sm"
          onClick={props.async}
        >
          Search
        </button>
      </div>
      <br />
    </div>
  );
};

const FavDisplayed = props => {

  const ingredientList = props.ingredients.map(x => (
    <li key={x.original}>{x.original}</li>
  ));

  const instructions = props.instructions.map(x => (
    <li key={x.step}>{x.step}</li>
  ));

  return (
    <div>
      {props.favyet > 0 ? null : <p>No recipes yet</p>}
      <div />
      <div
        className="fav-list border row justify-content-between shadow-sm"
        onClick={props.collapse}
        id={props.id}
      >{props.title}

        <button
          type="button"
          className=" btn btn-outline-danger col-2"
          value={props.id}
          onClick={props.delete}
        >
          Delete
        </button>

        <div className="display-no col-12 favlist-dropdown" id={props.id + 'a'}>
        <hr />
          <div>
            <p>Ingredients:</p>
            <ul>{ingredientList}</ul>
          </div>
          <div>
            <p>Instructions:</p>
            <ul>{instructions}</ul>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

const ShopListDisplayed = props => {
  return (
    <div>
      <br />
      <div className="shop-list">
        {props.shopyet > 0 ? (
          <h2>Here is your shopping list!</h2>
        ) : (
          <p className="text-center">No items yet</p>
        )}
        <br />
        <ul>{props.combineing}</ul>
      </div>
    </div>
  );
};

export { Nav, Header, Results, Input, FavDisplayed, ShopListDisplayed };
