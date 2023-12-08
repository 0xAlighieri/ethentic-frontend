export const getBlenderPngUrl = (collectionId, tokenId) => {
  if (
    collectionId === null ||
    collectionId === undefined ||
    tokenId === null ||
    tokenId === undefined
  )
    return null;
  return new URL(
    `collection/${collectionId}/preview/model_${tokenId}.png`,
    process.env.NEXT_PUBLIC_ETHENTIC_CDN_URL
  );
};

export const getBlenderJpgUrl = (collectionId, tokenId) => {
  if (
    collectionId === null ||
    collectionId === undefined ||
    tokenId === null ||
    tokenId === undefined
  )
    return null;

  return new URL(
    `collection/${collectionId}/preview/model_${tokenId}.jpg`,
    process.env.NEXT_PUBLIC_ETHENTIC_CDN_URL
  );
};

export const getOpenscadStlUrl = (collectionId, tokenId) => {
  if (
    collectionId === null ||
    collectionId === undefined ||
    tokenId === null ||
    tokenId === undefined
  )
    return null;
  return new URL(
    `collection/${collectionId}/model/model_${tokenId}.stl`,
    process.env.NEXT_PUBLIC_ETHENTIC_CDN_URL
  );
};

export const getOpenscadPngUrl = (collectionId, tokenId) => {
  if (
    collectionId === null ||
    collectionId === undefined ||
    tokenId === null ||
    tokenId === undefined
  )
    return null;
  return new URL(
    `collection/${collectionId}/preview/preview_${tokenId}.png`,
    process.env.NEXT_PUBLIC_ETHENTIC_CDN_URL
  );
};

export const getEtherscanTxUrl = (txId, chainId) => {
  if (chainId == 1) {
    return `https://etherscan.io/tx/${txId}`;
  } else if (chainId == 4) {
    return `https://rinkeby.etherscan.io/address/${txId}`;
  } else if (chainId == 5) {
    return `https://goerli.etherscan.io/tx/${txId}`;
  } else {
    return "#";
  }
};

export const getEtherscanAddressUrl = (addr, chainId) => {
  if (chainId == 1) {
    return `https://etherscan.io/address/${addr}`;
  } else if (chainId == 4) {
    return `https://rinkeby.etherscan.io/address/${addr}`;
  } else if (chainId == 5) {
    return `https://goerli.etherscan.io/address/${addr}`;
  } else {
    return "#";
  }
};

export const getInfuraApiUrl = (chainId) => {
  if (chainId == 1) {
    return `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
  } else if (chainId == 4) {
    return `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
  } else return null;
};
