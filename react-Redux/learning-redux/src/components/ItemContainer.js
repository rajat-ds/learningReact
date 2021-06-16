import React from "react";
import { connect } from "react-redux";
import { buyCake, buyIceCream } from "../redux";

const ItemContainer = (props) => {
  return (
    <div>
      <h2> Item - {props.item} </h2>
      <button onClick={props.buyItem}> Buy Items</button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const itemState = ownProps.cake
    ? state.cake.numOfCakes
    : state.iceCream.numOfIceCream;
  return {
    item: itemState,
  };
};

const mapDispatchToProps = (disPatch, ownProps) => {
  const disPatchFunction = ownProps.cake
    ? () => disPatch(buyCake())
    : () => disPatch(buyIceCream());

  return {
    buyItem: disPatchFunction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
