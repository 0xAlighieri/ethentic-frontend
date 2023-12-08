import useSWR from "swr";
import useEthenticContract from "hooks/contracts/useEthenticContract";

const getSaleActive = (ethentic) => async () => {
  const isActive = await ethentic.saleActive();
  return isActive;
};

export default function useSaleActive() {
  const ethentic = useEthenticContract();

  const shouldFetch = !!ethentic;

  return useSWR(shouldFetch ? ["saleActive"] : null, getSaleActive(ethentic));
}
