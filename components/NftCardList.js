import NftCard from "components/NftCard";
import ReactPaginate from "react-paginate";
import React, { useState, useEffect } from "react";
import LoadingDisplay from "./LoadingDisplay";

const loadingGallery = () => {
  return (
    <section className="my-12 lg:my-20 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-2xl justify-items-center">
      <div className="bg-white shadow sm:rounded-lg h-auto m-auto">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex">
            <h3 className="text-lg leading-6 font-medium text-gray-900">NFT Gallery Loading...</h3>
          </div>
          <div>
            <img src="/images/spinning_circles.svg" alt="Loader SVG" className="h-16 m-auto my-6" />
          </div>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Gathering relevant contract info from Ethereum Blockchain. Hang tight!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default (data) => {
  const [offset, setOffset] = useState(0);
  const [paginateData, setPaginateData] = useState([]);
  const [perPage] = useState(9);
  const [pageCount, setPageCount] = useState(0);
  const { collectionName, allTokenIds } = data;

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };

  useEffect(() => {
    const chunk = allTokenIds.slice(offset, offset + perPage);
    const postData = chunk.map((pd) => (
      <NftCard key={pd} tokenId={pd} collectionName={collectionName} />
    ));
    setPaginateData(postData);
    setPageCount(Math.ceil(allTokenIds.length / perPage));
  }, [offset, allTokenIds]);

  return (
    <div>
      {paginateData.length > 0 ? (
        <div>
          <div className="text-red-400 mb-8">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
          <ul
            role="list"
            className="grid sm:grid-cols-2 gap-x-16 gap-y-16 xs:grid-cols-1 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {paginateData}
          </ul>
        </div>
      ) : (
        <LoadingDisplay loadingType="nftGallery" />
      )}
    </div>
  );
};
