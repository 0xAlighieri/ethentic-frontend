import ChatMessage from './ChatMessage';

const ChatHeaderButton = (props) => {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={props.svgPath} />
        </svg>
      </button>
    </a>
  );
};

const ChatHeader = (props) => {
  return (
    <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
      <div class="relative flex items-center space-x-4">
        <div class="relative">
          <span class="absolute text-green-500 right-0 bottom-0">
            <svg width="20" height="20" fill="crimson">
              <circle cx="8" cy="8" r="8"></circle>
            </svg>
          </span>
          <img
            src={props.chatOwner.profilePic}
            alt={props.chatOwner.name}
            class="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
          />
        </div>
        <div class="flex flex-col leading-tight">
          <div class="text-2xl mt-1 flex items-center">
            <span class="text-gray-700 mr-3">{props.chatOwner.name}</span>
          </div>
          <span class="text-lg text-gray-600">{props.chatOwner.tagline}</span>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <ChatHeaderButton
          href={props.chatOwner.twitter}
          svgPath="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
        />
        <ChatHeaderButton svgPath="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        <ChatHeaderButton svgPath="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </div>
    </div>
  );
};

export default function ChatLog(props) {
  return (
    <div>
      <div class="flex justify-center bg-white">
        <div class="flex flex-1 p:2 sm:p-6 justify-center items-stretch flex-col h-screen max-w-4xl">
          <ChatHeader chatOwner={props.chatOwner} />
          <div
            id="messages"
            class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            {props.messages.map((message) => (
              <ChatMessage user={message.user} text={message.text} renderPic={!message.noPic} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
