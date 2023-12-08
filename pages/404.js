import Page from "components/Page";
import Link from "next/link";

export default function Custom404() {
  return (
    <Page>
      <div className="relative lg:mb-40 mt-40 justify-items-center">
        <div className="justify-items-center">
          <img className="lg:h-32 h-28 m-auto mb-8" src="/images/sym_alone_logo_white.svg" />
        </div>

        <h2 className="text-center text-lg leading-8 font-bold tracking-tight text-teal-400 sm:text-4xl font-mono">
          404 - Not Found
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500 lg:mt-8 font-mono">
          Whoops. Looks like you took a wrong turn!
        </p>
        <div className="text-center mt-12">
          <Link href="/">
            <button className="px-4 py-2 border border-transparent font-bold font-mono rounded-md text-white text-md bg-teal-500 shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600">
              <a>Head back to safety</a>
            </button>
          </Link>
        </div>
      </div>
    </Page>
  );
}
