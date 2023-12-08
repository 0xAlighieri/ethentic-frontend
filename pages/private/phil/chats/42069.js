import ChatLog from "components/Chat/ChatLog";

const users = {
  phil: {
    name: "Phil Laments",
    tagline: "Floor Manager",
    profilePic: "/images/phil_yellow.png",
    twitter: "https://twitter.com/PhilLaments",
    role: "sender"
  },
  gman: {
    name: "????",
    profilePic: "/images/jfp_green.png",
    role: "receiver"
  }
};

const messages = [
  {
    user: users.gman,
    text: "hey phil, cind told me to contact u. i assume u know what im talking about??"
  },
  {
    user: users.phil,
    text: "is this app secure?"
  },
  {
    user: users.gman,
    text: "yup shuld be"
  },
  {
    user: users.phil,
    text: "ok had to ask heh. ya she said u wanted some models?"
  },
  {
    user: users.gman,
    text: "thats right"
  },
  {
    user: users.phil,
    text: "cool, ya I have a bunch I am trying to get off my hands",
    noPic: true
  },
  {
    user: users.phil,
    text: "these things are gonna sell for way more when they come out"
  },
  {
    user: users.gman,
    text: "how do u get them?"
  },
  {
    user: users.phil,
    text: "I work on the factory floor, use ur imagination lol"
  },
  {
    user: users.gman,
    text: "lol ok i imagine you steal them"
  },
  {
    user: users.phil,
    text: "u sound like a cop"
  },
  {
    user: users.gman,
    text: "LOL nah, the opposite. anyway how many can i get"
  },
  {
    user: users.phil,
    text: "i got the payment already.  u paid for 2 so i can send those, just gimme ur address"
  },
  {
    user: users.gman,
    text: "ok"
  },
  {
    user: users.phil,
    text: "i told u theyre gonna go liike hotcakes when they sell"
  },
  {
    user: users.gman,
    text: "i agree, gota go now, chat later"
  },
  //*some time passes*
  {
    user: users.phil,
    text: "hey man been a while, i need to send them to u now, i need them off my hands before im caught",
    noPic: true
  },
  // *some time passes*
  {
    user: users.phil,
    text: "hey u there",
    noPic: true
  },
  {
    user: users.phil,
    text: "man i gotta delete this chat, they're on to me",
    noPic: true
  },
  {
    user: users.phil,
    text: "this is heat. reach me on my twitter DMs with ur address",
    noPic: true
  },
  {
    user: users.phil,
    text: "bye"
  }
];

export default function () {
  return <ChatLog chatOwner={users.phil} users={users} messages={messages} />;
}
