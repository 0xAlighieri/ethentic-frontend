import Page from "components/Page";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/solid";
import useTokenOwner from "../hooks/data/useTokenOwner";
import { useRouter } from "next/router";
import {
  getOpenscadStlUrl,
  getBlenderJpgUrl,
  getBlenderPngUrl,
  getOpenscadPngUrl
} from "../util/urls.js";
import Link from "next/link";
import { useState, useEffect } from "react";
import StlModal from "components/StlModal";
import GeneralErrorHandlingBox from "components/GeneralErrorHandlingBox";
import LoadingDisplay from "../components/LoadingDisplay";
import useTokenURIs from "hooks/data/useTokenURIs";
import { useStructuredTokenList } from "hooks/data/useStructuredTokenList";
import { useWeb3Provider } from "hooks/api/useWeb3Provider";
import ImageWithFallback from "../components/ImageWithFallback";
import { useResourceExists } from "../hooks/api/useResourceExists";
import { shortenEthAddress } from "util/misc";

// TODO: show scad preview png if blender jpg unavailable
// TODO: gray out or don't show download buttons if asset not available
// NB: hardcoded until we can get it from a contract
const validCollectionNames = ["Causeways"];
const collectionInfo = {
  Causeways: {
    id: 0,
    singularName: "Causeway"
  }
};

const TraitListDetails = (props) => {
  const { bluntness, color, density, tallness, shape } = props.activeToken;
  const traitObject = { shape, color, tallness, bluntness, density };
  return (
    <div className="flow-root mt-16">
      <ul className="-my-5 divide-y divide-gray-200">
        {Object.keys(traitObject).map((key) => (
          <li key={key} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{key.toUpperCase()}:</p>
              </div>
              <div>
                <a href="#" className="inline-flex text-sm font-medium text-gray-900  ">
                  {traitObject[key]}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// accessed via /details?collection=$COLLECTION_NAME&token=$TOKEN_ID
export default () => {
  const { chainId, account, chainIdStatus } = useWeb3Provider();
  const router = useRouter();
  const [viewerIsOwner, setViewerIsOwner] = useState(false);
  const [tokenId, setTokenId] = useState(null);
  const [tokenName, setTokenName] = useState(null);
  const [collectionId, setCollectionId] = useState(null);
  const [collectionName, setCollectionName] = useState(null);
  const { data: tokenOwner = "", error: tokenExistsError } = useTokenOwner(tokenId);

  const [openscadPngExists, openscadPngUrl] = useResourceExists(
    getOpenscadPngUrl(collectionId, tokenId)
  );
  const [openscadStlExists, openscadStlUrl] = useResourceExists(
    getOpenscadStlUrl(collectionId, tokenId)
  );
  const [blenderPngExists, blenderPngUrl] = useResourceExists(
    getBlenderPngUrl(collectionId, tokenId)
  );
  const [blenderJpgExists, blenderJpgUrl] = useResourceExists(
    getBlenderJpgUrl(collectionId, tokenId)
  );

  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("loading");
  const [largeImageIndex, setLargeImageIndex] = useState(0);
  const { data: tokenURIs = [] } = useTokenURIs([tokenId]);
  const { data: tokenList = [] } = useStructuredTokenList([tokenId], tokenURIs);
  const [imageArray, setImageArray] = useState([]);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  let collectionExistsError = false;
  if (!!collectionId) collectionExistsError = !validCollectionNames.includes(collectionId);

  useEffect(() => {
    setViewerIsOwner(`${tokenOwner}`.toLowerCase() === `${account}`.toLowerCase());
  }, [tokenOwner, account]);

  useEffect(() => {
    const newImageArray = [];
    if (blenderJpgExists) newImageArray.push(blenderJpgUrl);
    if (openscadPngExists) newImageArray.push(openscadPngUrl);
    setImageArray(newImageArray);
  }, [blenderJpgExists, openscadPngExists]);

  useEffect(() => {
    const { collection: collectionNameFromQuery, tokenId: tokenIdFromQuery } = router.query;
    setTokenId(tokenIdFromQuery);
    setTokenName(`${collectionInfo[collectionNameFromQuery]?.singularName} #${tokenIdFromQuery}`);
    setCollectionName(collectionNameFromQuery);
    setCollectionId(collectionInfo[collectionNameFromQuery]?.id);
  }, [router]);

  useEffect(() => {
    if (!!tokenExistsError) {
      setStatus("tokenDoesNotExist");
    } else if (!!collectionExistsError) {
      setStatus("collectionDoesNotExist");
    } else if (chainIdStatus == "unsupportedChainId") {
      setStatus("unsupportedChainId");
    } else if (
      !!collectionName &&
      !!tokenId &&
      !tokenExistsError &&
      !collectionExistsError &&
      !!tokenList &&
      tokenList.length > 0 &&
      !!openscadPngExists
    ) {
      setStatus("loaded");
    } else {
      setStatus("loading");
    }
  }, [
    tokenExistsError,
    collectionExistsError,
    collectionName,
    tokenId,
    tokenExistsError,
    tokenList,
    openscadPngExists
  ]);

  return (
    <Page>
      {(() => {
        switch (status) {
          case "loading":
            return <LoadingDisplay />;
          case "tokenDoesNotExist":
            return (
              <div>
                <GeneralErrorHandlingBox errorType={status} additionalInfo={tokenId} />
              </div>
            );
          case "collectionDoesNotExist":
            return (
              <div>
                <GeneralErrorHandlingBox errorType={status} additionalInfo={collectionName} />
              </div>
            );
          case "unsupportedChainId":
            return (
              <div>
                <GeneralErrorHandlingBox errorType={status} additionalInfo={chainId} />
              </div>
            );
          case "loaded":
            return (
              <>
                <nav
                  className="flex my-6 lg:my-12 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl "
                  aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-4">
                    <li>
                      <div>
                        <Link href="/">
                          <a className="text-teal-400 hover:text-teal-500">
                            <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">Home</span>
                          </a>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <ChevronRightIcon
                          className="flex-shrink-0 h-5 w-5 text-teal-400"
                          aria-hidden="true"
                        />
                        <Link
                          href={{
                            pathname: "/collection",
                            query: { name: collectionName }
                          }}>
                          <a className="ml-4 text-sm font-medium text-teal-500 hover:text-teal-700">
                            {collectionName}
                          </a>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <ChevronRightIcon
                          className="flex-shrink-0 h-5 w-5 text-teal-400"
                          aria-hidden="true"
                        />
                        <Link
                          href={{
                            pathname: "/details",
                            query: {
                              collection: collectionName,
                              tokenId: tokenId
                            }
                          }}>
                          <a
                            className="ml-4 text-sm font-medium text-teal-500 hover:text-teal-700"
                            aria-current="page">
                            {tokenName}
                          </a>
                        </Link>
                      </div>
                    </li>
                  </ol>
                </nav>
                <section className="my-6 lg:my-12 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="block aspect-w-16 aspect-h-16 overflow-hidden cursor-pointer pointer-events-none">
                      {imageArray?.length > 0 ? (
                        <ImageWithFallback
                          src={imageArray[largeImageIndex].href}
                          key={`pic_${imageArray[largeImageIndex].href}`}
                          fallbackSrc={openscadPngUrl.href}
                          alt="Focused image"
                          className="object-cover object-center"
                        />
                      ) : (
                        <div>
                          <LoadingDisplay loadingType="imageRendering" />
                        </div>
                      )}
                    </div>
                    <div className="flex h-48 w-48">
                      {imageArray.map((image, index) => (
                        <ImageWithFallback
                          src={image}
                          key={`${image}__${index}`}
                          fallbackSrc={openscadPngUrl.href}
                          alt="Rendered image for NFT"
                          onClick={() => {
                            setLargeImageIndex(index);
                          }}
                          className="object-cover cursor-pointer mr-4 my-4"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="lg:ml-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-700 font-mono ">{tokenName}</h2>
                      <h3 className="text-lg font-bold text-red-400 font-mono">
                        <Link
                          href={{
                            pathname: "/collection",
                            query: { name: collectionName }
                          }}>
                          {collectionName}
                        </Link>
                      </h3>
                    </div>
                    <div className="mt-4">
                      <h4>
                        Owner:
                        <Link
                          href={{
                            pathname: "/owner",
                            query: { address: tokenOwner }
                          }}>
                          <a className="text-red-400">
                            {`${shortenEthAddress(tokenOwner)}${viewerIsOwner ? " (you)" : ""}`}
                          </a>
                        </Link>
                      </h4>
                    </div>
                    <div>
                      <div className="flow-root md:mt-16">
                        <TraitListDetails activeToken={tokenList[0]} />
                      </div>
                    </div>
                    <div className="flex gap-x-2">
                      {openscadStlExists && (
                        <div>
                          <button
                            onClick={openModal}
                            className="mt-12 items-center px-4 py-2 border border-transparent font-bold font-mono rounded-md text-white text-md bg-teal-500 shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600">
                            <a>View in 3D</a>
                          </button>
                          <StlModal
                            showModal={showModal}
                            setShowModal={setShowModal}
                            tokenStlUrl={openscadStlUrl}
                            modelColor={tokenList[0].colorHex}
                          />
                        </div>
                      )}
                      {viewerIsOwner && blenderPngExists && (
                        <a
                          href={blenderPngUrl}
                          download
                          target="_blank"
                          className="mt-12 items-center px-4 py-2 border border-transparent font-bold font-mono rounded-md text-white text-md bg-teal-500 shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600">
                          Download PNG
                        </a>
                      )}
                      {viewerIsOwner && openscadStlExists && (
                        <a
                          href={openscadStlUrl}
                          download
                          target="_blank"
                          className="mt-12 items-center px-4 py-2 border border-transparent font-bold font-mono rounded-md text-white text-md bg-teal-500 shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600">
                          Download STL
                        </a>
                      )}
                    </div>
                  </div>
                </section>
              </>
            );
        }
      })()}
    </Page>
  );
};
