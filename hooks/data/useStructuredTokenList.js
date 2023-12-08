import useSWR from "swr";
import { parseBase64Json } from "util/misc";
import { getBlenderJpgUrl, getOpenscadStlUrl } from "../../util/urls.js";
import modelColors from "../../modelColors";

const getStructuredTokenList = (_, tokenIds, tokenURIs) => {
  if (tokenIds === null || tokenIds === [] || tokenURIs === null || tokenURIs === []) return [];

  let mappedArray = [];
  let tokenList = [];
  const polyTerraPLA = modelColors.polyterraColors.pla;
  if (!!tokenURIs && tokenURIs.length > 0) {
    for (let i = 0; i < tokenIds.length; i++) {
      const decodedTokenURI = parseBase64Json(tokenURIs[i]);
      mappedArray.push([tokenIds[i], decodedTokenURI]);
    }
  }

  mappedArray.map((token) => {
    const jpgUrl = getBlenderJpgUrl(0, token[0]);
    const stlUrl = getOpenscadStlUrl(0, token[0]);
    let tokenObject = {};
    tokenObject.id = token[0];
    tokenObject.stl = stlUrl;
    tokenObject.image = jpgUrl;
    token[1].attributes.map((attr) => {
      if (!!attr) {
        tokenObject[attr.trait_type.toLowerCase()] = attr.value;
        if (attr.trait_type == "Color" && !!polyTerraPLA[attr.value]) {
          tokenObject["colorHex"] = polyTerraPLA[attr.value].hex;
        }
      }
    });
    tokenList.push(tokenObject);
  });

  return tokenList;
};

export const useStructuredTokenList = (tokenIds, tokenURIs) => {
  const shouldFetch = !!tokenURIs && tokenURIs.length > 0 && !!tokenIds && tokenIds.length > 0;
  return useSWR(
    shouldFetch ? ["structuredTokenList", tokenIds, tokenURIs] : null,
    getStructuredTokenList
  );
};
