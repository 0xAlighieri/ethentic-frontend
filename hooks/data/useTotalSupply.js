import useSWR from "swr";
import useEthenticContract from "hooks/contracts/useEthenticContract";

const getTotalSupply = (ethentic) => async () => {
  const totalSupply = await ethentic.totalSupply();
  return totalSupply.toNumber();
};

export default function useTotalSupply() {
  const ethentic = useEthenticContract();
  const shouldFetch = !!ethentic;

  return useSWR(shouldFetch ? ["totalSupply"] : null, getTotalSupply(ethentic));
}
