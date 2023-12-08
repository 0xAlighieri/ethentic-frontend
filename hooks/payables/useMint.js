import { useCallback } from "react";
import useEthenticContract from "hooks/contracts/useEthenticContract";

export default function useMint() {
  const ethentic = useEthenticContract();

  return useCallback(
    async (nftRecipient, numTokens) => {
      const totalCost = await ethentic.price(numTokens);
      return ethentic.mint(nftRecipient, numTokens, { value: totalCost });
    },
    [ethentic]
  );
}
