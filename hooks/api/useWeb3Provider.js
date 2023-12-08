import detectEthereumProvider from "@metamask/detect-provider";
import { useWeb3React } from "@web3-react/core";
import { injected, network } from "ethereum/connectors";
import { useEffect, useState } from "react";
import { supportedChainIds } from "util/supportedChainIds";

export const useWeb3Provider = () => {
  const { active, activate, chainId, account } = useWeb3React();
  const [chainIdStatus, setChainIdStatus] = useState("chainIdUndefined");
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);

  // if chainId or account changes, we need to check which provider to use again
  useEffect(() => {
    (async () => {
      const provider = await detectEthereumProvider({ silent: true });

      if (provider) {
        // check if metamask installed
        if (provider === window.ethereum) {
          console.info("Metamask detected!");
          setMetamaskInstalled(true);
        } else {
          console.error("Provider is not window.ethereum");
          console.error("Do you have multiple Web3 wallets installed?");
        }
      } else {
        console.log("Please install MetaMask!");
        setMetamaskInstalled(false);
      }

      if (await injected.isAuthorized()) {
        // metamask already authorized; just activate
        console.log("Injected provider already authorized. Connecting.");
        await activate(injected, undefined, true);
      } else {
        await activate(network);
      }

      if (chainId == undefined) {
        setChainIdStatus("chainIdUndefined");
      } else if (!supportedChainIds.includes(chainId)) {
        setChainIdStatus("unsupportedChainId");
      } else if (supportedChainIds.includes(chainId)) {
        setChainIdStatus("supportedChainId");
      }
    })();
  }, [chainId, account]);

  return { active, activate, chainId, account, chainIdStatus, metamaskInstalled };
};
