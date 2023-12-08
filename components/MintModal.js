import { useWeb3React } from "@web3-react/core";
import useMint from "hooks/payables/useMint";
import usePrice from "hooks/data/usePrice";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useMaxTokensPerMint from "hooks/data/useMaxTokensPerMint";
import Link from "next/link";
import { getEtherscanTxUrl } from "util/urls";

const minTokensPerMint = 1;

const MintModal = (data) => {
  const { account, chainId } = useWeb3React();
  const [mintStatus, setMintStatus] = useState("inactive");
  const [errorDetail, setErrorDetail] = useState("");
  const [txId, setTxId] = useState("");
  const { showMintModal, setShowMintModal, collectionName } = data;
  const [tokensToMint, setTokensToMint] = useState(1);
  const [agreeToTOS, setAgreeToTOS] = useState(false);
  const { data: maxTokensPerMint } = useMaxTokensPerMint();
  const { data: totalMintingPrice = "..." } = usePrice(`${tokensToMint}`);
  const mint = useMint(account, tokensToMint);

  const divRef = useRef(null);
  const cancelButtonRef = useRef(null);

  const toggleTOSAgreement = () => setAgreeToTOS((value) => !value);

  const decrementTokens = () => {
    tokensToMint > minTokensPerMint && setTokensToMint(tokensToMint - 1);
  };

  const incrementTokens = () => {
    tokensToMint < maxTokensPerMint && setTokensToMint(tokensToMint + 1);
  };

  const handleCloseModal = () => {
    setShowMintModal(false);
  };

  // transition state only after the modal is away from user view
  const handleFadeoutComplete = () => {
    if (["txSuccess", "userRejected", "txFailure"].includes(mintStatus)) setMintStatus("inactive");
  };

  const handleMintButtonClick = async () => {
    setMintStatus("awaitingMetamaskResponse");
    try {
      const tx = await mint(account, tokensToMint);
      setMintStatus("txPending");
      console.log(`Transaction sent with hash: ${tx.hash}`);
      setTxId(tx.hash);
      const receipt = await tx.wait(1);
      if (receipt.status === 1) {
        setMintStatus("txSuccess");
        setTxId("");
      } else {
        throw Error("Transaction failed.");
      }
    } catch (err) {
      if (err.code === 4001) {
        setMintStatus("userRejected");
      } else if (err.code === "INSUFFICIENT_FUNDS") {
        setMintStatus("txFailure");
        setTxId("");
        setErrorDetail("Insufficient funds for this transaction.");
      } else {
        setMintStatus("txFailure");
        !!err.reason && setErrorDetail(err.reason);
        setTxId("");
      }
    }
    toggleTOSAgreement();
  };

  const CloseModalButton = (buttonText) => {
    return (
      <button
        type="button"
        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:col-start-1 sm:text-sm"
        onClick={handleCloseModal}
        ref={cancelButtonRef}>
        {buttonText}
      </button>
    );
  };

  const MintModalContent = () => {
    switch (mintStatus) {
      case "inactive":
        return (
          <div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Choose the number of NFTs you would like to mint.
              </p>
              <div className="my-10 grid grid-cols-2">
                <div>
                  <label htmlFor="mintAmount" className="block text-sm font-medium text-gray-700">
                    Amount to Mint
                  </label>
                  <div className="mt-5">
                    <div class="inline-flex h-8">
                      <button
                        class="bg-teal-100 hover:bg-teal-400 text-gray-800 font-bold px-4 rounded-l py-1"
                        onClick={decrementTokens}>
                        -
                      </button>
                      <div className="border px-4 text-md self-center py-1">
                        <span>{tokensToMint}</span>
                      </div>
                      <button
                        class="bg-teal-100 hover:bg-teal-400 text-gray-800 font-bold px-4 rounded-r py-1"
                        onClick={incrementTokens}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Price:</h4>
                  <p className="text-md font-medium mt-6 text-teal-600">
                    Ξ {totalMintingPrice.slice(0, 6)}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              {!!agreeToTOS ? (
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-500 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:col-start-2 sm:text-sm"
                  onClick={handleMintButtonClick}>
                  Mint
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:col-start-2 sm:text-sm">
                  Mint
                </button>
              )}
              {CloseModalButton("Cancel")}
            </div>
          </div>
        );
      case "awaitingMetamaskResponse":
        return (
          <div className="items-center my-6">
            <img className="h-24 m-auto my-6" src="/images/spinning_circles.svg"></img>
            <p>Please confirm the transaction in MetaMask 🦊</p>
          </div>
        );
      case "userRejected":
        return (
          <div className="items-center my-6">
            <p className="my-6 text-gray-700">Transaction rejected in MetaMask. 😔</p>
            {CloseModalButton("Close")}
          </div>
        );
      case "txPending":
        return (
          <div className="items-center my-6">
            <img className="h-24 m-auto my-6" src="/images/spinning_circles.svg"></img>
            <p className="my-6 mx-6 text-gray-700">
              Transaction sent.{" "}
              <span className="text-red-400 hover:text-red-500 font-bold">
                <a
                  href={getEtherscanTxUrl(txId, chainId)}
                  target="_blank"
                  rel="noopener noreferrer">
                  View in Etherscan
                </a>
              </span>
            </p>
            <p className="my-6 mx-6 text-teal-300">Transaction pending... 🤔</p>
          </div>
        );
      case "txFailure":
        return (
          <div className="items-center my-6">
            <p className="my-6">Oh no! The transaction failed. 😔</p>
            {!!errorDetail && <p className="my-6 text-sm">Reason: {errorDetail}</p>}
            <p className="my-6 text-sm">Please check the console for more detail.</p>
            {CloseModalButton("Close")}
          </div>
        );
      case "txSuccess":
        return (
          <div className="items-center my-6">
            <p className="my-6 text-gray-700">Transaction succeeded! 😊</p>
            <Link
              href={{
                pathname: "/owner",
                query: { address: account }
              }}>
              <p className=" cursor-pointer my-6 text-red-400 hover:text-red-500 font-bold">
                <a>View your account page</a>
              </p>
            </Link>
            {CloseModalButton("Close")}
          </div>
        );
    }
  };

  return (
    <Transition.Root show={showMintModal} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto font-mono"
        initialFocus={divRef}
        open={showMintModal}
        onClose={handleCloseModal}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={handleFadeoutComplete}>
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <button ref={divRef}></button>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                    Mint NFTs from <span className="text-red-400">{collectionName}</span>
                  </Dialog.Title>
                  {MintModalContent()}
                </div>
              </div>
              <fieldset className="space-y-5">
                <legend className="sr-only">Notifications</legend>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="comments"
                      aria-describedby="comments-description"
                      name="comments"
                      type="checkbox"
                      className="focus:ring-red-300 h-4 w-4 text-red-400 border-gray-300 rounded"
                      checked={agreeToTOS}
                      onChange={toggleTOSAgreement}
                    />
                  </div>
                  <div className="ml-3 text-xs">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-700 content-center align-middle">
                      I agree to the
                      <Link href="/tos">
                        <span className=" pl-1 underline cursor-pointer text-red-800">
                          Ethentic Terms of Service.
                        </span>
                      </Link>
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MintModal;
