import { useWeb3Provider } from "hooks/api/useWeb3Provider";
import { ethentic } from "../../ethentic-contracts";
import useContract from "./useContract";

export default function useEthenticContract() {
  const { chainId } = useWeb3Provider();
  return useContract(ethentic.deployments[chainId], ethentic.abi);
}
