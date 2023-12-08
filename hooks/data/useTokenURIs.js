import useSWR from "swr";
import useEthenticContract from "hooks/contracts/useEthenticContract";

const getTokenURIs = (ethentic) => async (_, tokenIds) => {
  const tokenURIs = await Promise.all(
    tokenIds.map(async (tokenId) => {
      const URI = await ethentic.tokenURI(tokenId);
      return URI;
    })
  );

  return tokenURIs;
};

export default function useTokenURIs(tokenIds) {
  const ethentic = useEthenticContract();

  const shouldFetch = !!ethentic && !!tokenIds && tokenIds.length > 0;
  return useSWR(shouldFetch ? ["tokenURIs", tokenIds] : null, getTokenURIs(ethentic));
}
