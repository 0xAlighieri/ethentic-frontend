import { injected } from "ethereum/connectors";
import { useWeb3Provider } from "hooks/api/useWeb3Provider";
import Link from "next/link";
import Blockie from "./Blockie";
import { shortenEthAddress } from "util/misc";
import ChainAlertBanner from "components/ChainAlertBanner";
import InstallMetamaskBtnSmall from "components/InstallMetamaskBtnSmall";

export default function Navbar() {
  const { activate, active, account, chainId, metamaskInstalled } = useWeb3Provider();

  const onClick = async () => {
    await activate(injected);
  };

  const social = [
    { name: "Discord", href: "https://discord.gg/pWZEgBB2Zy" },
    { name: "Twitter", href: "https://twitter.com/3thentic" }
  ];

  const internalNav = [
    { name: "About", href: "/about" },
    { name: "Collections", href: "/collections" }
  ];

  return (
    <header className="bg-red-300 font-mono">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <Link key={"home"} href="/">
              <a className="lg:mr-20">
                <img className="h-14 w-auto" src="/images/nav_logo_updated.svg" />
              </a>
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {internalNav.map((link) => (
                <Link key={link.name} href={link.href}>
                  <a className="text-base font-medium text-red-700 hover:text-red-900">
                    {link.name}
                  </a>
                </Link>
              ))}
              {social.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-red-700 hover:text-red-900">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {active && account ? (
              <Link
                key="owner"
                href={{
                  pathname: "/owner",
                  query: { address: account }
                }}>
                <a>
                  <div className="inline-block bg-white flex items-center py-2 px-6 text-base border-transparent text-red-700 rounded-md hover:bg-red-50">
                    <Blockie address={account} />
                    <span role="img" aria-label="active" className="text-sm">
                      {shortenEthAddress(account)}
                    </span>
                  </div>
                </a>
              </Link>
            ) : metamaskInstalled ? (
              <button
                type="button"
                onClick={onClick}
                className="inline-block bg-white py-2 px-8 border border-transparent rounded-md text-base font-medium text-red-700 hover:bg-red-50">
                Connect Wallet
              </button>
            ) : (
              <InstallMetamaskBtnSmall />
            )}
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {internalNav.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-indigo-50">
              {link.name}
            </a>
          ))}
          {social.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-white hover:text-indigo-50">
              {link.name}
            </a>
          ))}
        </div>
      </nav>
      {chainId != "1" ? <ChainAlertBanner /> : <div></div>}
    </header>
  );
}
