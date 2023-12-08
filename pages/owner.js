import { useRouter } from "next/router";
import Page from "components/Page";
import useBalanceOf from "hooks/data/useBalanceOf";
import useTokensForOwner from "hooks/data/useTokensForOwner";
import Link from "next/link";
import NftCardList from "components/NftCardList";
import { getEtherscanAddressUrl } from "util/urls";
import { shortenEthAddress } from "util/misc";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import GeneralErrorHandlingBox from "components/GeneralErrorHandlingBox";
import LoadingDisplay from "../components/LoadingDisplay";
import { useWeb3Provider } from "hooks/api/useWeb3Provider";

// page should be accessed via `/owner?address=${addr}` route
export default () => {
  const router = useRouter();
  const { address: userAddress } = router.query;
  const { data: nftBalance = null } = useBalanceOf(userAddress);
  const { data: tokenIds = [] } = useTokensForOwner(userAddress);
  const [status, setStatus] = useState("loading");

  const tokenOwnerError = !ethers.utils.isAddress(userAddress);
  const collectionName = "Causeways"; // NB: hardcoded for now
  const { active, account, chainId, metamaskInstalled, chainIdStatus } = useWeb3Provider();

  useEffect(() => {
    if (!!tokenOwnerError) {
      setStatus("errored");
    } else if (!!userAddress) {
      // TODO: defer loaded state until we actually have tokenIds
      setStatus("loaded");
    } else {
      setStatus("loading");
    }
  }, [tokenOwnerError, userAddress, nftBalance, chainId]);

  return (
    <Page>
      {(() => {
        switch (metamaskInstalled) {
          case true:
            switch (active) {
              case true:
                switch (status) {
                  case "loading":
                    return <LoadingDisplay />;
                  case "unsupportedChainId":
                    return (
                      <div>
                        <GeneralErrorHandlingBox
                          errorType="unsupportedChainId"
                          additionalInfo={chainId}
                        />
                      </div>
                    );
                  case "errored":
                    return (
                      <div>
                        <GeneralErrorHandlingBox
                          errorType="addressNotFound"
                          additionalInfo={userAddress}
                        />
                      </div>
                    );
                  case "loaded":
                    return (
                      <>
                        <section
                          className="my-6 lg:my-12 font-mono relative max-w-xl mx-auto px-4 sm:px-6
              lg:px-8 lg:max-w-7xl grid grid-cols-1 gap-8">
                          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                            Account:{" "}
                            <span className="text-red-400">{shortenEthAddress(userAddress)}</span>
                          </h3>
                          <p>A summary of the Ethentic prints owned by {userAddress}.</p>
                        </section>
                        <section
                          className="my-2 lg:my-6 font-mono relative max-w-xl mx-auto px-4 sm:px-6
              lg:px-8 lg:max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                          <div className="flow-root">
                            <ul className="divide-y divide-gray-200">
                              <li key="1" className="py-4">
                                <div className="flex items-center space-x-4">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                      Address Etherscan:{" "}
                                    </p>
                                  </div>
                                  <div>
                                    <Link
                                      href={getEtherscanAddressUrl(userAddress, chainId)}
                                      className="inline-flex text-sm font-medium ">
                                      <a>
                                        <span className="text-teal-400">
                                          {shortenEthAddress(userAddress)}
                                        </span>
                                      </a>
                                    </Link>
                                  </div>
                                </div>
                              </li>
                              <li key="2" className="py-4">
                                <div className="flex items-center space-x-4">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium  truncate">
                                      Total Prints Owned:
                                    </p>
                                  </div>
                                  <div>
                                    <a href="#" className="inline-flex text-sm font-medium  ">
                                      <span className="text-red-400">{nftBalance}</span>
                                    </a>
                                  </div>
                                </div>
                              </li>
                              {`${userAddress}`.toLowerCase() === `${account}`.toLowerCase() && (
                                <li key="3">
                                  <button className="mt-8 mr-4 text-md items-center px-4 py-2 border border-transparent font-bold font-mono rounded-md text-teal-500  border-teal-500 shadow-sm hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600">
                                    <Link
                                      href={{
                                        pathname: "/viewingroom"
                                      }}>
                                      Go to Viewing Room
                                    </Link>
                                  </button>
                                </li>
                              )}
                            </ul>
                          </div>
                        </section>
                        {(() => {
                          switch (chainIdStatus) {
                            case "chainIdUndefined":
                              return <div></div>;
                            case "unsupportedChainId":
                              return (
                                <div>
                                  <GeneralErrorHandlingBox
                                    errorType="unsupportedChainId"
                                    additionalInfo={chainId}
                                  />
                                </div>
                              );

                            case "supportedChainId":
                              return (
                                <section className="my-12 lg:my-20 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                                  <h3 className="text-2xl font-semibold  tracking-tight sm:text-2xl text-red-400 text-center mb-8">
                                    Ethentic Prints Owned
                                  </h3>
                                  {nftBalance > 0 ? (
                                    <div>
                                      <NftCardList
                                        allTokenIds={tokenIds}
                                        collectionName={collectionName}
                                      />
                                    </div>
                                  ) : (
                                    <div>
                                      <GeneralErrorHandlingBox errorType="noNftsOwned"></GeneralErrorHandlingBox>
                                    </div>
                                  )}
                                </section>
                              );
                          }
                        })()}
                      </>
                    );
                }
              case false:
                return (
                  <GeneralErrorHandlingBox errorType="metamaskNotConnected"></GeneralErrorHandlingBox>
                );
            }
          case false:
            return (
              <GeneralErrorHandlingBox errorType="metamaskNotDetected"></GeneralErrorHandlingBox>
            );
        }
      })()}
    </Page>
  );
};
