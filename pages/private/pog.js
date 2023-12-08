const entries = [
  {
    label: 'Website',
    href: 'https://ethentic.art',
    emoji: '🧑‍💻'
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/pWZEgBB2Zy',
    emoji: '💬'
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/3thentic',
    emoji: '🐦'
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/3thentic',
    emoji: '📸'
  }
];

const TreeEntry = (props) => {
  return (
    <div class="pt-6 text-center space-y-4 min-w-max">
      <a
        href={props.entry.href}
        target="_blank"
        class="flex items-start rounded-lg border border-gray-400 bg-white px-5 py-4 text-lg leading-6 font-medium shadow-md hover:shadow-xl transition ease-in-out duration-150">
        <p class="mr-3 h-6 w-6">{props.entry.emoji}</p>
        {props.entry.label}
        <div class="ml-auto mt-0.5 pl-4">
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
      </a>
    </div>
  );
};

export default function LinkTree() {
  return (
    <div class="bg-red-300 h-screen flex flex-col items-center gap-10">
      <div class="max-w-7xl mx-auto lg:pt-36 sm:pt-10">
        <img
          class="w-64 h-64 rounded-full mx-auto"
          src="/images/full_logo_nav_updated.svg"
          alt="Ethentic Logo"
          width="400"
          height="400"
        />
      </div>
      <div class="flex flex-col max-w-xs mx-auto">
        {entries.map((e) => (
          <TreeEntry entry={e} />
        ))}
      </div>
    </div>
  );
}
