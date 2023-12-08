import Link from "next/link";
import Page from "components/Page";
import useAllTokensForCollection from "../hooks/data/useAllTokensForCollection";
import useMaxTotalSupply from "../hooks/data/useMaxTotalSupply";
import usePrice from "../hooks/data/usePrice";
import { collections } from "../data/collections";

export default () => {
  const { data: allTokenIds = [] } = useAllTokensForCollection();
  const { data: maxTotalSupply = "..." } = useMaxTotalSupply();
  const { data: tokenPrice = "..." } = usePrice("1");

  return (
    <Page>
      <div className=" my-12 lg:my-20 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-center  leading-8 font-bold tracking-tight text-red-400 text-3xl font-mono my-20 ">
          All Collections
        </h2>
        <ul role="list" className="grid gap-x-8 gap-y-16 grid-cols-1 sm:gap-x-6  xl:gap-x-8">
          {collections.map((collection) => (
            <Link
              href={{
                pathname: "/collection",
                query: { name: collection.name }
              }}
              key={`link-${collection.collectionId}`}>
              <li
                key={collection.source}
                className="relative border rounded-lg cursor-pointer hover:shadow-md transition-shadow">
                <div className="group block  aspect-w-16 aspect-h-9  bg-red-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-red-100 focus-within:ring-red-500 overflow-hidden cursor-pointer">
                  <img
                    src={collection.source}
                    alt=""
                    className="object-cover pointer-events-none"
                  />
                </div>
                <ul
                  role="list"
                  className="grid grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-2 xl:gap-x-8"
                  key={`ul-${collection.collectionId}`}>
                  <div className="my-4 mx-4">
                    <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none font-mono">
                      {collection.name}
                    </p>
                    <p className="block text-sm font-medium text-red-500 pointer-events-none font-mono">
                      {collection.artist}
                    </p>
                  </div>
                  <div className="my-4 mx-4">
                    <p className="mt-2 block text-sm font-medium text-gray-500 truncate pointer-events-none font-mono">
                      Price: <span className="text-teal-500"> Ξ {tokenPrice.slice(0, 6)}</span>
                    </p>
                    <p className="block text-sm font-medium text-gray-500 pointer-events-none font-mono">
                      Minted:{" "}
                      <span className="text-teal-500">
                        {" "}
                        {allTokenIds.length}/{maxTotalSupply}{" "}
                      </span>
                    </p>
                  </div>
                </ul>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </Page>
  );
};
