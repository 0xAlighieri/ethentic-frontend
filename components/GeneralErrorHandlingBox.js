import { ExclamationIcon } from "@heroicons/react/outline";
import InstallMetamaskBtn from "components/InstallMetamaskBtn";
import { useWeb3React } from "@web3-react/core";
import { injected } from "ethereum/connectors";

export default (data) => {
  const { errorType, additionalInfo = "" } = data;
  const { activate } = useWeb3React();
  switch (errorType) {
    case "noTokensMintedOrMetamaskNotConnected":
      return (
        <section className="my-12 lg:my-20 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-2xl">
          <div className="bg-white shadow sm:rounded-lg h-auto m-auto">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex">
                <ExclamationIcon className="h-6 w-6 mr-2 text-orange-400"></ExclamationIcon>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  No tokens minted yet, or Metamask not connected.
                </h3>
              </div>

              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  No tokens from this collection have been minted yet, or your MetaMask is not
                  connected. Please connect to view collection.{" "}
                </p>
                <p>
                  <span className="font-bold">
                    You can connect with Metamask in the navigation bar at the top of the page using
                    the <span className="text-teal-400">Connect Wallet</span> button.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      );

    case "allTokenIdsNull":
      return (
        <section className="my-12 lg:my-20 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-2xl">
          <div className="bg-white shadow sm:rounded-lg h-auto m-auto">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex">
                <ExclamationIcon className="h-6 w-6 mr-2 text-orange-400"></ExclamationIcon>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Whoa! Action Required!
                </h3>
              </div>

              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  There was an issue accessing token IDs from the Ethereum blockchain. Is your
                  MetaMask locked? Please unlock to view.
                </p>
              </div>
            </div>
          </div>
        </section>
      );

    case "metamaskNotDetected":
      return (
        <section className="my-12 lg:my-20 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-2xl">
          <div className="bg-white shadow sm:rounded-lg h-auto m-auto">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex">
                <ExclamationIcon className="h-6 w-6 mr-2 text-orange-400"></ExclamationIcon>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Action Required, Metamask Not Detected!
                </h3>
              </div>

              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Metamask is not installed. Please install Metamask to view minted NFTs from this
                  collection.
                </p>
                <InstallMetamaskBtn />
              </div>
            </div>
          </div>
        </section>
      );

    case "noNftsOwned":
      return (
        <section className="my-12 lg:my-20 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-2xl">
          <div className="bg-white shadow sm:rounded-lg h-auto m-auto">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex">
                <ExclamationIcon className="h-6 w-6 mr-2 text-orange-400"></ExclamationIcon>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  No Ethentic NFTs owned.
                </h3>
              </div>

              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>There are no Ethentic NFTs associated with this Ethereum address.</p>
              </div>
            </div>
          </div>
        </section>
      );

    case "addressNotFound":
      return (
        <section className="my-12 lg:my-20 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-2xl">
          <div className="bg-white shadow sm:rounded-lg h-auto m-auto">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex">
                <ExclamationIcon className="h-6 w-6 mr-2 text-orange-400"></ExclamationIcon>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Address not found!</h3>
              </div>

              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  The Ethereum address <span className="text-teal-400">{additionalInfo}</span>{" "}
                  doesn't exist.
                </p>
              </div>
            </div>
          </div>
        </section>
      );

    case "tokenDoesNotExist":
      return (
        <section className="my-12 lg:my-20 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-2xl">
          <div className="bg-white shadow sm:rounded-lg h-auto m-auto">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex">
                <ExclamationIcon className="h-6 w-6 mr-2 text-orange-400"></ExclamationIcon>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Token ID not found!</h3>
              </div>

              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  There is no token in this collection with ID{" "}
                  <span className="text-teal-400">{additionalInfo}</span>.
                </p>
              </div>
            </div>
          </div>
        </section>
      );

    case "collectionDoesNotExist":
      return (
        <section className="my-12 lg:my-20 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-2xl">
          <div className="bg-white shadow sm:rounded-lg h-auto m-auto">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex">
                <ExclamationIcon className="h-6 w-6 mr-2 text-orange-400"></ExclamationIcon>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Collection not found!
                </h3>
              </div>

              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  The collection <span className="text-teal-400">{additionalInfo}</span> doesn't
                  exist.
                </p>
              </div>
            </div>
          </div>
        </section>
      );

    case "unsupportedChainId":
      return (
        <section className="my-12 lg:my-20 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-2xl">
          <div className="bg-white shadow sm:rounded-lg h-auto m-auto">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex">
                <ExclamationIcon className="h-6 w-6 mr-2 text-orange-400"></ExclamationIcon>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Unsupported Chain ID.
                </h3>
              </div>

              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  The Chain ID <span className="text-teal-400">{additionalInfo}</span> is not
                  supported by this application. Please switch to the Ethereum Mainnet.
                </p>
              </div>
            </div>
          </div>
        </section>
      );

    case "metamaskNotConnected":
      return (
        <section className="my-12 lg:my-20 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-2xl">
          <div className="bg-white shadow sm:rounded-lg h-auto m-auto">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex">
                <ExclamationIcon className="h-6 w-6 mr-2 text-orange-400"></ExclamationIcon>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Metamask is not connected!
                </h3>
              </div>

              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  It appears that Metamask is not connected. Please connect your wallet to Ethentic.
                </p>
                <button
                  onClick={async () => await activate(injected)}
                  className="mt-8 items-center px-4 py-2 border border-transparent font-bold font-mono rounded-md text-white text-md bg-orange-400 shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Connect Metamask 🦊
                </button>
              </div>
            </div>
          </div>
        </section>
      );
  }
};
