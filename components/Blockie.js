import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';

//Note: In a real setting, we recommend saving to state and re-making the blockie on prop change for better re-render performance.

export default props => {
  return <img
    className="inline-block -ml-1 mr-3 h-6 w-6 rounded-full"
    aria-hidden="true"
    src={makeBlockie(props.address)}
    alt=""
  />
}