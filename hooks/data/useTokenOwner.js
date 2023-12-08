import useSWR from "swr";
import useEthenticContract from "hooks/contracts/useEthenticContract";

const getTokenOwner = (ethentic) => async (_, tokenId) => {
  if (tokenId === undefined) {
    throw new Error("No token ID specified");
  }
  const owner = await ethentic.ownerOf(tokenId);
  return owner;
};

export default function useTokenOwner(tokenId) {
  const ethentic = useEthenticContract();

  const shouldFetch = !!ethentic;
  return useSWR(shouldFetch ? ["ownerOf", tokenId] : null, getTokenOwner(ethentic));
}
