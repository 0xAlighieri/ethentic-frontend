// break this file out by function theme if it emerges

export const shortenEthAddress = (addr) => {
  return `${addr.slice(0, 6)}..${addr.slice(-6)}`;
};

export const decodeBase64 = (input) => {
  return Buffer.from(input.substring(29), "base64").toString("utf-8");
};

export const parseBase64Json = (input) => {
  return JSON.parse(decodeBase64(input));
};
