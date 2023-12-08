import React from 'react';
import Link from 'next/link';

export default () => {
  return (
    <React.Fragment>
      <a href="https://metamask.io/" target="_blank">
        <button className="inline-block bg-white py-2 px-8 border border-transparent rounded-md text-base font-medium text-red-700 hover:text-white hover:bg-orange-400">
          Install Metamask 🦊
        </button>
      </a>
    </React.Fragment>
  );
};
