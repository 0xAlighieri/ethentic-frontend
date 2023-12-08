export default function ChatMessage(props) {
  return (
    <div class="chat-message">
      <div class={`flex items-end ${props.user.role == 'sender' ? 'justify-end' : ''}`}>
        <div
          class={`flex flex-col space-y-2 text-lg max-w-xs mx-2 ${
            props.user.role == 'sender' ? 'order-1 items-end' : 'order-2 items-start'
          }`}>
          <div>
            <span
              class={`px-4 py-2 rounded-lg inline-block ${
                props.user.role == 'sender'
                  ? 'rounded-br-none bg-teal-600 text-white'
                  : 'rounded-bl-none bg-gray-300 text-gray-600'
              }`}>
              {props.text}
            </span>
          </div>
        </div>
        {props.renderPic == true && (
          <img
            src={props.user.profilePic}
            alt={props.user.name}
            class={`w-12 h-12 rounded-xl ${props.user.role == 'sender' ? 'order-2' : 'order-1'}`}
          />
        )}
      </div>
    </div>
  );
}
