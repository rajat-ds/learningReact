import React from "react";
import { connect } from "react-redux";
import { buyIceCream } from "../redux";
const IceCreamContainer = (props) => {
  return (
    <div>
      <h2>Number of iceCreams - {props.numOfIceCream}</h2>
      <button onClick={props.buyIceCReam}>Buy Cake</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    numOfIceCream: state.iceCream.numOfIceCream,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buyIceCReam: () => dispatch(buyIceCream()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(IceCreamContainer);
