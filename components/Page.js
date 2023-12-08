import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Page(props) {
  return (
    <div>
      <Head>
        <title>Ethentic - NFTs you can hold.</title>
        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content="Ethentic - NFTs you can hold."></meta>
        <meta
          name="description"
          content="In a 2D world of bits and bytes, Ethentic breaks the mold with the first of its kind: A platform for generative, 3D-printable NFTs."></meta>

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://ethentic.art/"></meta>
        <meta property="og:title" content="Ethentic - NFTs you can hold."></meta>
        <meta
          property="og:description"
          content="In a 2D world of bits and bytes, Ethentic breaks the mold with the first of its kind: A platform for generative, 3D-printable NFTs."></meta>
        <meta property="og:image" content="https://ethentic.art/images/showroom.png"></meta>

        {/* <!-- Twitter --> */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:url" content="https://ethentic.art/"></meta>
        <meta name="twitter:title" content="Ethentic - NFTs you can hold."></meta>
        <meta
          name="twitter:description"
          content="In a 2D world of bits and bytes, Ethentic breaks the mold with the first of its kind: A platform for generative, 3D-printable NFTs."></meta>
        <meta name="twitter:image" content="https://ethentic.art/images/showroom.png"></meta>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://ethentic.art/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://ethentic.art/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://ethentic.art/images/favicon-16x16.png"
        />
        <link rel="manifest" href="https://ethentic.art/site.webmanifest" />
        <link rel="mask-icon" href="https://ethentic.art/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>
      <div className="flex flex-col h-screen font-mono text-gray-500">
        <Navbar className="z-50" />
        <main className="flex-grow">{props.children}</main>
        <Footer />
      </div>
    </div>
  );
}
