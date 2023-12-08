export default (data) => {
  const { loadingType = "" } = data;

  return (
    <section className="my-12 lg:my-20 font-mono relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-2xl justify-items-center">
      <div className="bg-white shadow sm:rounded-lg h-auto m-auto">
        <div className="px-4 py-5 sm:p-6">
          {(() => {
            switch (loadingType) {
              case "nftGallery":
                return (
                  <>
                    <div className="flex">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        NFT Gallery Loading...
                      </h3>
                    </div>
                    <div>
                      <img
                        src="/images/spinning_circles.svg"
                        alt="Loader SVG"
                        className="md:h-16 m-auto my-6  h-8 sm:h-12"
                      />
                    </div>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>Gathering relevant contract info from Ethereum Blockchain. Hang tight!</p>
                    </div>
                  </>
                );
              case "imageRendering":
                return (
                  <>
                    <div>
                      <img
                        src="/images/spinning_circles.svg"
                        alt="Loader SVG"
                        className="md:h-16 m-auto my-6  h-8 sm:h-12"
                      />
                    </div>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>Hang tight! The image is still rendering.</p>
                    </div>
                  </>
                );
              case "modelRendering":
                return (
                  <>
                    <div>
                      <img
                        src="/images/spinning_circles.svg"
                        alt="Loader SVG"
                        className="md:h-16 m-auto my-6  h-8 sm:h-12"
                      />
                    </div>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>Hang tight! The 3D model is still rendering.</p>
                    </div>
                  </>
                );
              case "muted":
                return (
                  <div>
                    <img
                      src="/images/spinning_circles.svg"
                      alt="Loader SVG"
                      className="md:h-16 m-auto my-6 h-8 sm:h-12"
                    />
                  </div>
                );

              default:
                return (
                  <>
                    <div className="flex">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Page Loading...
                      </h3>
                    </div>
                    <div>
                      <img
                        src="/images/spinning_circles.svg"
                        alt="Loader SVG"
                        className="md:h-16 m-auto my-6  h-8 sm:h-12"
                      />
                    </div>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>Hang tight! We are grabbing some info from the Ethereum Blockchain.</p>
                    </div>
                  </>
                );
            }
          })()}
        </div>
      </div>
    </section>
  );
};
