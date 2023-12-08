import { useRouter } from "next/router";
import Page from "components/Page";
import useAllTokensForCollection from "../hooks/data/useAllTokensForCollection";
import NftCardList from "components/NftCardList";
import { collections } from "../data/collections";
import MintModal from "components/MintModal";
import { useState, useEffect } from "react";
import useMaxTotalSupply from "../hooks/data/useMaxTotalSupply";
import usePrice from "../hooks/data/usePrice";
import GeneralErrorHandlingBox from "components/GeneralErrorHandlingBox";
import LoadingDisplay from "../components/LoadingDisplay";
import { useWeb3Provider } from "hooks/api/useWeb3Provider";
import useSaleActive from "hooks/data/useSaleActive";

const validCollectionNames = ["Causeways"];

// page should be accessed via `/collection?name=${name}` route
export default () => {
  const router = useRouter();
  const { active, chainId, metamaskInstalled, chainIdStatus, account } = useWeb3Provider();
  const { name: collectionName } = router.query;
  const { data: allTokenIds = [] } = useAllTokensForCollection();
  const { data: maxTotalSupply = "..." } = useMaxTotalSupply();
  const { data: tokenPrice = "..." } = usePrice("1");
  const { data: isSaleActive } = useSaleActive();

  const [showMintModal, setShowMintModal] = useState(false);
  const [status, setStatus] = useState("loading");
  const [collectionInfo, setCollectionInfo] = useState();

  const openMintModal = () => {
    setShowMintModal((prev) => !prev);
  };

  // NB: for this component, since there's only one collection,
  //     we can just hardcode the collection ID (i.e. just query contract as normal)
  let collectionExistsError = false;
  if (!!collectionName) collectionExistsError = !validCollectionNames.includes(collectionName);

  useEffect(() => {
    if (!!collectionExistsError) {
      setStatus("errored");
    } else if (!!collectionName) {
      setCollectionInfo(collections.find((c) => c.name === collectionName));
      setStatus("loaded");
    } else {
      setStatus("loading");
    }
  }, [collectionExistsError, collectionName]);

  return (
    <Page>
      {(() => {
        switch (status) {
          case "loading":
            return <LoadingDisplay />;
          case "errored":
            return <h1>Error: No collection with this name</h1>;
          case "loaded":
            return (
              <div className="md:grid md:grid-cols-2 ">
                <div className="md: col-span-1">
                  <section className=" my-12 lg:my-20 font-mono relative max-w-xl mx-auto px-2 sm:px-6 lg:px-8 lg:max-w-7xl">
                    <h3 className="text-2xl font-semibold   sm:text-2xl text-red-400 text-center">
                      {collectionInfo.name}
                    </h3>
                    <p className="text-lg text-gray-500 mt-2 text-center">
                      {collectionInfo.artist}
                    </p>
                    <img
                      className="w-full h-full object-cover my-10 rounded-lg"
                      src={collectionInfo.source}
                      alt=""
                    />
                    <div className="mt-10">
                      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 lg:grid-cols-3  lg:divide-y-0 md:divide-x">
                        <div className="px-2 py-5 sm:p-6">
                          <dt className="text-sm font-normal text-gray-900">Total Minted</dt>
                          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div className="flex items-baseline text-base font-semibold text-teal-400 text-sm">
                              <span className="text-sm">
                                {allTokenIds.length}/{maxTotalSupply}
                              </span>
                            </div>
                          </dd>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                          <dt className="text-sm font-normal text-gray-900">Price</dt>
                          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div className="grid items-baseline text-base font-semibold text-teal-400 text-sm">
                              <span className="text-sm"> Ξ {tokenPrice.slice(0, 6)}</span>

                              <span className="text-teal-600 pl-1 text-xs">(~$100 USD)</span>
                            </div>
                          </dd>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                          <dt className="text-sm font-normal text-gray-900">Creation Date</dt>
                          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div className="flex items-baseline text-base font-semibold text-teal-400">
                              <span className="text-sm">{collectionInfo.creationDate}</span>
                            </div>
                          </dd>
                        </div>
                      </dl>
                    </div>
                    {metamaskInstalled && active && account && (
                      <div>
                        {!!isSaleActive && Date.now() / 1000 > 1657801800 ? (
                          <button
                            onClick={openMintModal}
                            className="mt-8 items-center px-4 py-2 border border-transparent font-bold font-mono rounded-md text-white text-md bg-teal-500 shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600">
                            Buy now
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="mt-8 items-center px-4 py-2 border border-transparent font-bold font-mono rounded-md text-gray-500 text-md bg-gray-200 shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
                            Sale not active... 🔜
                          </button>
                        )}
                        <MintModal
                          showMintModal={showMintModal}
                          setShowMintModal={setShowMintModal}
                          collectionName={collectionName}
                        />
                      </div>
                    )}
                    <h3 className="text-2xl font-semibold  tracking-tight sm:text-2xl text-red-400 text-center mt-4">
                      Summary
                    </h3>
                    <p className="mt-4 leading-loose text-sm">{collectionInfo.summary}</p>
                  </section>
                </div>
                {(() => {
                  if (allTokenIds.length > 0) {
                    switch (chainIdStatus) {
                      case "chainIdUndefined":
                        return <div></div>;
                      case "unsupportedChainId":
                        return (
                          <GeneralErrorHandlingBox
                            errorType={chainIdStatus}
                            additionalInfo={chainId}
                          />
                        );
                      case "supportedChainId":
                        return (
                          <div className=" md:col-span-1">
                            <section className="my-12 lg:my-20 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                              <h3 className="text-2xl font-semibold tracking-tight sm:text-2xl text-red-400 text-center mb-8">
                                Gallery
                              </h3>
                              <div>
                                <NftCardList
                                  allTokenIds={allTokenIds}
                                  collectionName={collectionInfo.name}
                                />
                              </div>
                            </section>
                          </div>
                        );
                    }
                  } else if (allTokenIds.length == 0) {
                    switch (chainIdStatus) {
                      case "chainIdUndefined":
                        return (
                          <>
                            <GeneralErrorHandlingBox errorType="noTokensMintedOrMetamaskNotConnected"></GeneralErrorHandlingBox>
                          </>
                        );
                      case "unsupportedChainId":
                        return (
                          <GeneralErrorHandlingBox
                            errorType={chainIdStatus}
                            additionalInfo={chainId}
                          />
                        );
                      case "supportedChainId":
                        return (
                          <>
                            <GeneralErrorHandlingBox errorType="noTokensMintedOrMetamaskNotConnected"></GeneralErrorHandlingBox>
                          </>
                        );
                    }
                  }
                })()}
              </div>
            );
        }
      })()}
    </Page>
  );
};
