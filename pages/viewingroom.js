import Page from "components/Page";
import React, { Suspense, useState, useEffect } from "react";
import { ethers } from "ethers";
import LoadingDisplay from "../components/LoadingDisplay";
import useTokensForOwner from "hooks/data/useTokensForOwner";
import useTokenURIs from "hooks/data/useTokenURIs";
import { useStructuredTokenList } from "hooks/data/useStructuredTokenList";
import { useRouter } from "next/router";
import { useWeb3Provider } from "hooks/api/useWeb3Provider";
import GeneralErrorHandlingBox from "components/GeneralErrorHandlingBox";
import Scene from "../components/Scene";

const validCollectionNames = ["Causeways"];

export default function ViewingRoom() {
  const router = useRouter();
  const { active, account } = useWeb3Provider();
  const { data: tokenIds = [] } = useTokensForOwner(account);
  const { data: tokenURIs = [] } = useTokenURIs(tokenIds);
  const { data: tokenList = [] } = useStructuredTokenList(tokenIds, tokenURIs);
  const [status, setStatus] = useState("loading");
  const tokenOwnerError = !ethers.utils.isAddress(account);
  const [activeToken, setActiveToken] = useState("");

  const { collection: collectionName } = router.query;

  const handleModelChange = (props) => {
    const modelId = props.target.value;
    const model = tokenList.filter((model) => model.id == modelId);
    setActiveToken(model[0]);
  };

  useEffect(() => {
    let collectionExistsError = false;
    if (!!collectionName) collectionExistsError = !validCollectionNames.includes(collectionName);
    if (!!tokenOwnerError || !!collectionExistsError) {
      setStatus("errored");
    } else if (!!active && !!tokenList && tokenList.length > 0) {
      setStatus("loaded");
    } else if (!!active && !!tokenList && tokenList.length === 0) {
      setStatus("noTokensError");
    } else {
      setStatus("loading");
    }
  }, [tokenOwnerError, active, account, tokenList, collectionName]);

  useEffect(() => {
    if (status === "loaded") setActiveToken(tokenList[0]);
  }, [status]);

  const NftDropdown = () => {
    return (
      <div className="py-4 px-4 lg:px-8 items-center text-white bg-teal-500 justify-center">
        <p>Select your NFT from the dropdown to view.</p>
        <div>
          <select
            id="location"
            name="location"
            className=" block w-full mt-4 pr-10 py-2 text-red-500 border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md right"
            defaultValue={activeToken.id}
            onChange={handleModelChange}>
            {tokenList.map((model) => (
              <option key={model.id}>{model.id}</option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  const TraitList = (props) => {
    const { id, bluntness, color, density, tallness, shape } = props.activeToken;
    const traitObject = { shape, color, tallness, bluntness, density };

    return (
      <div className="ml-4 lg:ml-8 mt-8 bg-teal-500">
        <h2 className="text-2xl font-bold text-white font-mono">
          {collectionName} #{id}
        </h2>
        <div className="flow-root mt-8">
          <ul className="-my-5">
            {Object.keys(traitObject).map((key, index) => (
              <li key={key} className="py-2">
                <div className="flex items-center space-x-4">
                  <div className=" min-w-0">
                    <p className=" font-medium text-white truncate">{key.toUpperCase()}:</p>
                  </div>
                  <div>
                    <a href="#" className="inline-flex font-medium text-red-500">
                      {traitObject[key]}
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Page>
      {(() => {
        switch (status) {
          case "loaded":
            return (
              <div>
                <div className="md:grid md:grid-cols-5 ">
                  <div className="md:col-span-1 bg-teal-500">
                    <NftDropdown />
                    <TraitList activeToken={activeToken} />
                  </div>
                  <div
                    style={{ width: `100%`, height: `1080px`, position: `relative` }}
                    className="md:col-span-4">
                    <Suspense fallback={<LoadingDisplay />}>
                      <Scene
                        activeModel={activeToken.stl}
                        activeModelColor={activeToken.colorHex}
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
            );
          case "loading":
            return <LoadingDisplay />;
          case "errored":
            if (!account) return <GeneralErrorHandlingBox errorType="metamaskNotConnected" />;
          case "noTokensError":
            return <GeneralErrorHandlingBox errorType="noNftsOwned" />;
        }
      })()}
    </Page>
  );
}
