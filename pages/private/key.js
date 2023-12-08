import { ethers } from "ethers";
import useBalanceOf from "hooks/data/useBalanceOf";
import useTokensForOwner from "hooks/data/useTokensForOwner";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Key() {
  const router = useRouter();
  const { pkey } = router.query;
  const [userAddress, setUserAddress] = useState(undefined);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const { data: nftBalance = null } = useBalanceOf(userAddress);
  const { data: tokensForOwner = null } = useTokensForOwner(userAddress);

  useEffect(() => {
    try {
      if (typeof pkey === "string") {
        const computedAddress = ethers.utils.computeAddress(pkey);
        setUserAddress(computedAddress);
      }
      if (nftBalance !== null && tokensForOwner !== null) setLoadingStatus("loaded");
    } catch (err) {
      setLoadingStatus("errored");
    }
  }, [pkey, nftBalance, tokensForOwner]);

  return (
    <div class="bg-red-300 h-screen flex flex-col items-center gap-4">
      <div class="max-w-7xl mx-auto lg:pt-36 sm:pt-10">
        <img
          class="w-64 h-64 rounded-full mx-auto"
          src="/images/nav_logo_updated.svg"
          alt="Ethentic Logo"
          width="400"
          height="400"
        />
      </div>
      <div className="font-mono relative py-0 md:py-24 lg:py-32 text-center  space-y-6 container overflow-hidden">
        {(() => {
          switch (loadingStatus) {
            case "errored":
              return <h1>Errored.</h1>;
            case "loading":
              return <h1>Loading...</h1>;
            case "loaded":
              return nftBalance > 0 ? (
                <>
                  <p className="break-words">Your address: {userAddress}</p>
                  <p>Congratulations! You have received an Ethentic NFT.</p>
                  <p>
                    Import the below private key into Metamask or another wallet to claim your
                    token.
                  </p>
                  <p>
                    You can use the transfer function on OpenSea to send the token to your wallet.
                  </p>
                  <p className="break-words">
                    PRIVATE KEY: <span className="text-white">{pkey}</span>
                  </p>
                </>
              ) : (
                <h1>Nothing on this address.</h1>
              );
          }
        })()}
      </div>
    </div>
  );
}
