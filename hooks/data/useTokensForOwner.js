import useSWR from "swr";
import useEthenticContract from "hooks/contracts/useEthenticContract";
import useBalanceOf from "hooks/data/useBalanceOf";

const getTokensForOwner = (ethentic) => async (_, nftOwnerAddress, nftBalance) => {
  let tokenIds = [];
  for (let i = 0; i < nftBalance; i++) {
    const tokenId = await ethentic.tokenOfOwnerByIndex(nftOwnerAddress, i);
    tokenIds.push(tokenId.toNumber());
  }
  return tokenIds;
};

export default function useTokensForOwner(nftOwnerAddress) {
  const ethentic = useEthenticContract();
  const { data: nftBalance } = useBalanceOf(nftOwnerAddress);

  const shouldFetch = !!ethentic && typeof nftOwnerAddress === "string" && !!nftBalance;
  return useSWR(
    shouldFetch ? ["tokensForOwner", nftOwnerAddress, nftBalance] : null,
    getTokensForOwner(ethentic)
  );
}
