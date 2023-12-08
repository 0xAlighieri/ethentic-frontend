import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { getInfuraApiUrl } from "util/urls";

export const injected = new InjectedConnector();
export const network = new NetworkConnector({
  urls: { 1: getInfuraApiUrl(1) },
  defaultChainId: 1
});
