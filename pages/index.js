import { injected } from "ethereum/connectors";
import Page from "components/Page";
import React, { useState } from "react";
import MintModal from "components/MintModal";
import Link from "next/link";
import { useWeb3Provider } from "hooks/api/useWeb3Provider";
import GeneralErrorHandlingBox from "components/GeneralErrorHandlingBox";
import Roadmap from "components/Roadmap";
import useSaleActive from "hooks/data/useSaleActive";

import { PrinterIcon, VariableIcon, SparklesIcon } from "@heroicons/react/outline";

const transferFeatures = [
  {
    id: 1,
    name: "Procedually Generated",
    description: "Each NFT is crafted and curated by the collection's on-chain Algorithm.",
    icon: VariableIcon
  },
  {
    id: 2,
    name: "3D-Printable",
    description:
      "The Causeways NFTs are designed to be fabricated in the physical world. With the completion of the sale, NFT holders can purchase physical prints of their NFT from Ethentic.",
    icon: PrinterIcon
  },
  {
    id: 3,
    name: "Inspired by Legend",
    description:
      "The Giant's Causeway has its origin staked in volcanic fissures and folklore. With the premiere of Causeways, Ethentic bridges the gap between myth and materiality.",
    icon: SparklesIcon
  }
];
const communicationFeatures = [
  {
    id: 4,
    name: "Generated at Mint",
    description:
      "The 3D model, and all related images are generated after the NFT has been minted, \
      allowing our collections to have a truly random distribution of traits and characteristics."
  },

  {
    id: 5,
    name: "On-Chain Traits",
    description:
      "By having the seed, traits, and art algorithm stored on-chain anyone can render \
      the art out in its 3D form and bring it to life, no matter what happens to servers, IPFS \
      pinning services, or anything of the sort."
  }
];

const people = [
  {
    name: "Johnny F. Prints",
    role: "Algo-Mastermind",
    imageUrl: "../images/jfp_green.png",
    quote: "Ask not what your printer can do for you - ask what you can do for your printer."
  },
  {
    name: "Spoolius Caesar",
    role: "Rogue Renderer",
    imageUrl: "../images/pantheon-min.png",
    quote: "I came, I saw, I rendered."
  }
];

const genesisRoadmap = [
  {
    completed: true,
    copy: "Launch website and social medias.",
    id: 1
  },
  {
    completed: true,
    copy: "Create and test Ethentic Smart Contract.",
    id: 2
  },
  {
    completed: true,
    copy: "Architect and implement digital rendering automation backend.",
    id: 3
  },
  {
    completed: true,
    copy: "Partner with industry-leading filament company.",
    id: 4
  },
  {
    completed: true,
    copy: "Partner with local filament distributor.",
    id: 5
  },
  {
    completed: false,
    copy: "Offset carbon footprint of sale. 🌳",
    id: 6
  },
  {
    completed: true,
    copy: "Launch the Ethentic public sale.",
    id: 7
  },
  {
    completed: false,
    copy: "Start shipping redeemed prints.",
    id: 8
  }
];

const oneDotOneRoadmap = [
  {
    completed: false,
    copy: "Partner with artist for next sale.",
    id: 1
  },
  {
    completed: false,
    copy: "Work with artist to create digital renders of their work.",
    id: 2
  },
  {
    completed: false,
    copy: "Develop CLI tool for checking printability.",
    id: 3
  },
  {
    completed: false,
    copy: "Optimize/Expand 3D-printer farm.",
    id: 4
  },
  {
    completed: false,
    copy: "Offset carbon footprint of sale. 🌳",
    id: 5
  },
  {
    completed: false,
    copy: "Launch NILON community pre-sale.",
    id: 6
  },
  {
    completed: false,
    copy: "Launch 1.1 public sale.",
    id: 7
  }
];

export default function Index() {
  const { activate, account, chainId, chainIdStatus } = useWeb3Provider();
  const { data: isSaleActive } = useSaleActive();

  const [showMintModal, setShowMintModal] = useState(false);
  const featuredCollection = "Causeways";

  const openMintModal = () => {
    setShowMintModal((prev) => !prev);
  };

  return (
    <Page>
      <div className="antialiased">
        <div className="sm:visible md:hidden">
          <video
            autoPlay
            muted
            loop
            webkit-playsinline="true"
            playsInline
            className="object-cover w-full h-full">
            <source src="../videos/ethentic_hero_720p.mp4" type="video/mp4" />
          </video>
        </div>

        <header className="header relative lg:overflow-hidden">
          <div className="absolute inset-0 z-negative lg:opacity-100 opacity-50 max-height-lg hidden md:block">
            <video
              autoPlay
              muted
              loop
              webkit-playsinline="true"
              playsInline
              className="object-cover w-full h-full">
              <source src="../videos/ethentic_hero_720p.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="container mx-auto lg:mt-96 lg:px-16 px-4 py-4">
            <div className="md:pl-8 md:border-l border-white sm:mt-40 md:mt-10">
              <h1 className="md:text-6xl text-2xl font-extrabold font-mono m-0 md:leading-none text-red-300">
                NFTs You Can Hold
              </h1>
              <p className="my-4 text-md sm:text-xl text-gray-500 font-mono">
                3D printable assets with generative, on-chain digital traits.
              </p>
              <div>
                {(() => {
                  switch (!!account) {
                    case true:
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
                            <div>
                              <button className="mt-8 mr-4 text-md items-center px-4 py-2 border border-transparent font-bold font-mono rounded-md text-teal-500  border-teal-500 shadow-sm hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600">
                                <Link
                                  href={{
                                    pathname: "/collection",
                                    query: { name: featuredCollection }
                                  }}>
                                  View featured collection
                                </Link>
                              </button>
                              {!!isSaleActive && Date.now() / 1000 > 1657801800 ? (
                                <button
                                  onClick={openMintModal}
                                  className="mt-8 items-center px-4 py-2 border border-transparent font-bold font-mono rounded-md text-white text-md bg-teal-500 shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600">
                                  Buy now 🐵
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="mt-8 items-center px-4 py-2 border border-transparent font-bold font-mono rounded-md text-gray-500 text-md bg-gray-200 shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
                                  Sale not active... 🔜
                                </button>
                              )}
                            </div>
                          );
                      }
                    case false:
                      return (
                        <button
                          onClick={async () => await activate(injected)}
                          className="mt-8 items-center px-4 py-2 border border-transparent font-bold font-mono rounded-md text-white text-md bg-orange-400 shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                          Connect Metamask 🦊
                        </button>
                      );
                  }
                })()}
                <MintModal
                  showMintModal={showMintModal}
                  setShowMintModal={setShowMintModal}
                  collectionName={featuredCollection}
                />
              </div>
            </div>
          </div>
        </header>
        <section className=" mt-20 lg:mt-24">
          <div className="py-16 overflow-hidden lg:py-24 bg-color-match-othrographic">
            <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
              <div className="relative mb-32 lg:mb-40">
                <div className="justify-items-center">
                  <img
                    className="lg:h-32 h-28 m-auto mb-8"
                    src="/images/sym_alone_logo_white.svg"
                  />
                </div>

                <h2 className="text-center text-xl leading-8 font-bold tracking-tight text-teal-400 sm:text-4xl font-mono">
                  Welcome to Ethentic.
                </h2>
                <p className="mt-4 max-w-3xl mx-auto text-center  text-md sm:text-xl text-gray-500 mb-4 lg:mt-8 font-mono">
                  In a 2D world of bits and bytes, Ethentic breaks the mold with the first of its
                  kind:
                </p>
                <p className="mt-2 max-w-3xl mx-auto text-center text-md sm:text-xl text-red-400 lg:mt-4 font-mono">
                  A platform for generative, 3D-printable NFTs.
                </p>
              </div>

              <div className="relative mt-12 lg:mt-24 grid lg:grid-cols-2 lg:gap-8 lg:items-center font-mono ">
                <div className="relative order-last lg:order-first">
                  <h4 className="text-md font-regular text-gray-500">Collection I:</h4>
                  <h3 className="text-2xl font-semibold tracking-tight sm:text-2xl text-red-400">
                    The Causeways
                  </h3>

                  <dl className="mt-10 space-y-10">
                    {transferFeatures.map((item) => (
                      <div key={item.id} className="relative">
                        <dt>
                          <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-200 text-white">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <p className="ml-16 text-lg leading-6 font-medium text-red-300">
                            {item.name}
                          </p>
                        </dt>
                        <dd className="mt-2 ml-16 text-md sm:text-lg text-base text-gray-500">
                          {item.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div
                  className="mt-10 mx-4 relative lg:mt-0  width-class-orthographic h-4/5"
                  aria-hidden="true">
                  <img
                    src="/images/orthographic_home3_mobile.png"
                    alt=""
                    className="object-fill pointer-events-none mb-32 block lg:hidden"
                  />
                  <img
                    src="/images/orthographic_home3.png"
                    alt=""
                    className="object-fill pointer-events-none sm:mb-12 hidden lg:block"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="example-selector overflow-hidden bg-no-repeat py-24 ">
          <div className="py-8 overflow-hidden lg:py-4 xs:mb-2 xl:mb-12 custom-h-1 ">
            <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-5xl">
              <div className="relative my-12 sm:mt-16 lg:mt-24 font-mono">
                <div className="lg:grid lg:grid-flow-row-dense  lg:gap-8 lg:items-center">
                  <div className="lg:col-start-1  py-8 px-8 rounded-lg transparency-7">
                    <h3 className="text-xl sm:text-2xl font-semibold text-red-400 tracking-tight  ">
                      Certified on Ethereum
                    </h3>
                    <p className="mt-3 text-md sm:text-lg text-gray-500 max-w-prose">
                      All Ethentic prints are reproducible using information stored on the
                      blockchain.
                    </p>

                    <dl className="mt-10 space-y-10 max-w-prose">
                      {communicationFeatures.map((item) => (
                        <div key={item.id} className="relative">
                          <dt>
                            <p className=" text-lg leading-6 font-medium text-red-400">
                              {item.name}
                            </p>
                          </dt>
                          <dd className="mt-2 text-md text-md sm:text-lg text-base text-gray-500">
                            {item.description}
                          </dd>
                        </div>
                      ))}
                      <Link href="/about">
                        <button className="mt-8 items-center px-4 py-2 border border-transparent font-bold font-mono rounded-md text-white text-md bg-red-300 shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600">
                          Learn More
                        </button>
                      </Link>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="mt-12 lg:mt-24 grid lg:grid-cols-2 lg:gap-10  font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl ">
            <Roadmap title="Genesis Roadmap" roadmapItems={genesisRoadmap} />
            <Roadmap title="1.1 Roadmap" roadmapItems={oneDotOneRoadmap} />
          </div>
        </section>
        <section>
          <div className="bg-white">
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
              <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
                <div className="space-y-5 sm:space-y-4">
                  <h2 className="text-2xl font-bold text-red-300 tracking-tight sm:text-4xl">
                    The Archivists
                  </h2>
                  <p className="text-md sm:text-lg text-gray-500">
                    Meet the dynamic duo behind the Ethentic project.
                  </p>
                </div>
                <div className="lg:col-span-2">
                  <ul
                    role="list"
                    className="space-y-12 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-2 lg:gap-x-16">
                    {people.map((person) => (
                      <li key={person.name}>
                        <div className="space-y-4">
                          <div className="aspect-w-4 aspect-h-4">
                            <img
                              className="object-cover shadow-lg rounded-lg"
                              src={person.imageUrl}
                              alt=""
                            />
                          </div>
                          <div className="text-md leading-6  font-medium space-y-1">
                            <h3 className="text-red-300 font-bold">{person.name}</h3>
                            <p className="text-teal-500">{person.role}</p>
                          </div>
                          <div className="text-md">
                            <p className="text-gray-500 italic">{person.quote}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="bg-teal-400">
            <div className="mx-auto py-12 px-4 max-w-2xl sm:px-6 lg:px-8 lg:py-24 ">
              <div className="space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 ">
                <div className=" text-center sm:inline-flex items-end lg:block sm:text-center lg:text-left">
                  <h2 className="text-4xl font-bold text-white tracking-tight sm:text-4xl bg-red-300 sm:w-24 sm:h-24 text-center py-8">
                    N
                  </h2>
                  <h2 className="text-4xl font-bold text-white tracking-tight sm:text-4xl bg-red-400 sm:w-24 sm:h-24 text-center  py-8">
                    I
                  </h2>
                  <h2 className="text-4xl font-bold text-white tracking-tight sm:text-4xl bg-red-500 sm:w-24 sm:h-24 text-center  py-8">
                    L
                  </h2>
                  <h2 className="text-4xl font-bold text-white tracking-tight sm:text-4xl bg-red-600 sm:w-24 sm:h-24  text-center  py-8">
                    O
                  </h2>
                  <h2 className="text-4xl font-bold text-white tracking-tight sm:text-4xl bg-red-700 sm:w-24 sm:h-24  text-center  py-8">
                    N
                  </h2>
                </div>
                <div className="md:col-span-2">
                  <p className=" text-md sm:text-lg text-teal-800 font-medium font-mono">
                    Included in the mint of The Causeways NFT is membership to NILON - the community
                    that will lay the foundation for Web3D and the future of Ethentic. NILON members
                    will craft the lore behind the Ethentic Anthology and have insider access to all
                    of the platform's future collections.
                  </p>
                  <p className=" text-md sm:text-lg text-teal-800 font-medium font-mono my-4">
                    Moreover, members receive exclusive access to the NILON channel in the Ethentic
                    Discord, and will be elligible for exclusive NFT mints that will be unavailable
                    to the general public.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
}
