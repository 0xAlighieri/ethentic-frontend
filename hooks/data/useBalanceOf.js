import useSWR from "swr";
import useEthenticContract from "hooks/contracts/useEthenticContract";

const getBalanceOf = ethentic => async (
  _,
  nftOwnerAddress
) => {
  const balance = await ethentic.balanceOf(nftOwnerAddress);
  return balance.toNumber();
}

export default function useBalanceOf(nftOwnerAddress) {
  const ethentic = useEthenticContract();

  const shouldFetch = !!ethentic && typeof nftOwnerAddress === "string";
  return useSWR(
    shouldFetch ? ["BalanceOf", nftOwnerAddress] : null,
    getBalanceOf(ethentic)
  );
}