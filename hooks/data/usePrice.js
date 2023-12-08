import useSWR from "swr";
import { ethers } from "ethers";
import useEthenticContract from "hooks/contracts/useEthenticContract";

const getPrice = (ethentic) => async (_, numTokens) => {
  const price = await ethentic.price(numTokens);
  return ethers.utils.formatEther(price);
};

export default function usePrice(numTokens) {
  const ethentic = useEthenticContract();

  const shouldFetch = !!ethentic && typeof numTokens === "string";

  return useSWR(shouldFetch ? ["price", numTokens] : null, getPrice(ethentic));
}
