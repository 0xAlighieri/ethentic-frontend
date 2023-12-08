import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

export default function useContract(contractAddress, abi) {
  const { library, account } = useWeb3React();
  const shouldFetch = isAddress(contractAddress) && !!abi && !!library;
  const signerOrLibrary = account ? library.getSigner(account) : library;

  return useMemo(
    () => (shouldFetch ? new Contract(contractAddress, abi, signerOrLibrary) : undefined),
    [contractAddress, abi, library, account]
  );
}
