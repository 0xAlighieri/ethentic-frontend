import { useResourceExists } from "../hooks/api/useResourceExists.js";
import { getBlenderJpgUrl, getOpenscadPngUrl } from "../util/urls.js";
import Link from "next/link";
import LoadingDisplay from "./LoadingDisplay";

const collectionId = 0; // NB: hardcoded until we can get from contract

// TODO: get openscad preview image instead if the JPG is not loaded
export default (data) => {
  const { tokenId, collectionName } = data;
  const [blenderJpgExists, blenderJpgUrl] = useResourceExists(
    getBlenderJpgUrl(collectionId, tokenId)
  );
  const [openscadPngExists, openscadPngUrl] = useResourceExists(
    getOpenscadPngUrl(collectionId, tokenId)
  );

  return (
    <Link
      href={{
        pathname: "/details",
        query: { collection: collectionName, tokenId }
      }}
      key={tokenId}>
      <li
        key={tokenId}
        className="relative border rounded-lg cursor-pointer hover:shadow-md transition-shadow">
        <div className="group block aspect-w-16 aspect-h-16 overflow-hidden cursor-pointer">
          {blenderJpgExists ? (
            <img src={blenderJpgUrl} className="object-cover pointer-events-none" />
          ) : openscadPngExists ? (
            <img src={openscadPngUrl} className="object-cover pointer-events-none" />
          ) : (
            <div>
              <LoadingDisplay loadingType="muted" />
            </div>
          )}
        </div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-1 xl:gap-x-8">
          <div className="my-4 mx-4">
            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none font-mono">
              ID: {tokenId}
            </p>
          </div>
        </ul>
      </li>
    </Link>
  );
};
