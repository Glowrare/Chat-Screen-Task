const sendBtn = document.querySelectorAll('.chattext-inputbtn');

sendBtn.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    updateScreens(el);
    scrolltoBottom();
  });
});

const createElementWrapper = (el) => {
  return document.createElement(el);
};
const appendElementWrapper = (parent, el) => {
  return parent.appendChild(el);
};

const createLiTag = createElementWrapper('li');
const createDivTag = createElementWrapper('div');

const updateScreens = (btn) => {
  let sender = '';
  let receiver = '';
  if (btn.id === 'slToOQBtn') {
    sender = 'olivers-screen';
    receiver = 'saras-screen';
  } else {
    sender = 'saras-screen';
    receiver = 'olivers-screen';
  }

  const chatInput = document
    .querySelector(`.${sender} .chattext-inputbox`)
    .value.trim();
  const contactInitials = document.querySelector(
    `.${receiver} .chat-header .initials`
  );
  const sentScreen = document.querySelector(`.${sender} .chatgroup`);
  const receivedScreen = document.querySelector(`.${receiver} .chatgroup`);

  if (chatInput !== '') {
    const newLog = new messageFormat(
      chatInput,
      sender,
      receiver,
      contactInitials
    );
    newLog.msgItem();
    console.log(msgArray);
    const res = fecthNewChatItem();
    checkLastChatDate(sentScreen, receivedScreen);
    appendElementWrapper(sentScreen, res.sent);
    appendElementWrapper(receivedScreen, res.recvd);
    document.querySelector(`.${sender} .chattext-inputbox`).value = '';
  }
};

const msgArray = [
  {
    msg: "Hey Sara. I took care of it!! Ra's is not going to be a problem for a while",
    time: '11:32',
    date: '22/05/2020',
    sender: 'OLIVER',
    receiver: 'SARA',
    senderScreen: 'olivers-screen',
    receiverScreen: 'saras-screen',
    initials: 'OQ',
  },
  {
    msg: " Yaay!! 💃 That's awesome, Ollie. I'm going share the news with the Legends now!",
    time: '11:33',
    date: '22/05/2020',
    sender: 'OLIVER',
    receiver: 'SARA',
    senderScreen: 'saras-screen',
    receiverScreen: 'olivers-screen',
    initials: 'SL',
  },
  {
    msg: 'Nate says we owe you BIG! 🍺',
    time: '11:38',
    date: '22/05/2020',
    sender: 'OLIVER',
    receiver: 'SARA',
    senderScreen: 'saras-screen',
    receiverScreen: 'olivers-screen',
    initials: 'SL',
  },
  {
    msg: 'Haha! My pleasure 😁',
    time: '11:39',
    date: '22/05/2020',
    sender: 'OLIVER',
    receiver: 'SARA',
    senderScreen: 'olivers-screen',
    receiverScreen: 'saras-screen',
    initials: 'OQ',
  },
  {
    msg: 'Hi over there!',
    time: '02:15',
    date: '24/05/2020',
    sender: 'OLIVER',
    receiver: 'SARA',
    senderScreen: 'olivers-screen',
    receiverScreen: 'saras-screen',
    initials: 'OQ',
  },
  {
    msg: "Cant's talk now. Explain later!!",
    time: '02:20',
    date: '24/05/2020',
    sender: 'SARA',
    receiver: 'OLIVER',
    senderScreen: 'saras-screen',
    receiverScreen: 'olivers-screen',
    initials: 'SL',
  },
];

const getChatMessageBody = (item) => {
  const initials = createDivTag.cloneNode(true);
  initials.setAttribute('class', 'initials');
  initials.textContent = item.initials;

  const chatMessageWrapper = createDivTag.cloneNode(true);
  chatMessageWrapper.setAttribute('class', 'xchgcontent');

  const chatBody = createElementWrapper('p');
  chatBody.setAttribute('class', 'chat-body');
  chatBody.textContent = item.msg;

  const sentTime = createElementWrapper('small');
  sentTime.setAttribute('class', 'dark-grey-clr');
  sentTime.textContent = `Message sent by ${item.time}`;

  appendElementWrapper(chatMessageWrapper, chatBody);
  appendElementWrapper(chatMessageWrapper, sentTime);

  const sentChat = createLiTag.cloneNode(true);
  const recvdChat = createLiTag.cloneNode(true);

  sentChat.setAttribute('class', 'chatxchg sentchat');
  appendElementWrapper(sentChat, chatMessageWrapper);

  recvdChat.setAttribute('class', 'chatxchg recvdchat');
  appendElementWrapper(recvdChat, initials);
  appendElementWrapper(recvdChat, chatMessageWrapper.cloneNode(true));

  const msgBody = {
    recvd: recvdChat,
    sent: sentChat,
  };
  return msgBody;
};

const fecthNewChatItem = () => {
  const itemIndex = msgArray.length - 1;
  const newMsg = getChatMessageBody(msgArray[itemIndex]);
  return newMsg;
};

const getStartChatMessageBody = () => {
  msgArray.forEach((x) => {
    const msg = getChatMessageBody(x);

    const sentScreen = document.querySelector(`.${x.senderScreen} .chatgroup`);
    const receivedScreen = document.querySelector(
      `.${x.receiverScreen} .chatgroup`
    );

    const chatDate = newChatDate(true, x);

    const lastChatDateContainer = document.querySelectorAll('.chatdate');
    const lastChatDate =
      lastChatDateContainer[lastChatDateContainer.length - 1];

    if (
      lastChatDateContainer.length < 1 ||
      lastChatDate.textContent !== x.date
    ) {
      appendElementWrapper(sentScreen, chatDate);
      appendElementWrapper(receivedScreen, chatDate.cloneNode(true));
    }

    appendElementWrapper(sentScreen, msg.sent);
    appendElementWrapper(receivedScreen, msg.recvd);
  });
  scrolltoBottom();
};

class messageFormat {
  constructor(chatBody, sender, receiver, initials) {
    this.msgTime = fetchTime();
    this.chatBody = chatBody;
    this.sender = '';
    this.receiver = '';
    this.senderScreen = sender;
    this.receiverScreen = receiver;
    this.initials = initials;
    this.msgDate = fetchDate();
  }
  formatSender() {
    return (this.sender = this.senderScreen.slice(0, -8).toUpperCase());
  }
  formatReceiver() {
    return (this.receiver = this.receiverScreen.slice(0, -8).toUpperCase());
  }
  msgItem() {
    return msgArray.push({
      msg: this.chatBody,
      time: this.msgTime,
      date: this.msgDate,
      sender: this.formatSender(),
      receiver: this.formatReceiver(),
      senderScreen: this.senderScreen,
      receiverScreen: this.receiverScreen,
      initials: this.initials.textContent,
    });
  }
}

const fetchDate = () => {
  const today = new Date();
  const dd = today.getDate();
  let mm = today.getMonth() + 1;
  if (mm < 10) {
    mm = `0${mm}`;
  }
  const yyyy = today.getFullYear();
  const date = `${dd}/${mm}/${yyyy}`;
  return date;
};

const fetchTime = () => {
  const today = new Date();
  const hh = today.getHours();
  let mm = today.getMinutes();
  if (mm < 10) {
    mm = `0${mm}`;
  }
  const time = `${hh}:${mm}`;
  return time;
};

const newChatDate = (existing, x = {}) => {
  let newChatTag = createLiTag.cloneNode(true);
  newChatTag.setAttribute('class', 'chatdate');
  if (existing) {
    newChatTag.textContent = x.date;
  } else {
    newChatTag.textContent = fetchDate();
  }
  return newChatTag;
};

const checkLastChatDate = (sentScreen, receivedScreen) => {
  let lastChatDateContainer = document.querySelectorAll('.chatdate');
  let lastChatDate = lastChatDateContainer[lastChatDateContainer.length - 1];
  let todaysDate = fetchDate();
  if (lastChatDate.textContent !== todaysDate) {
    let newDate = newChatDate(false);
    appendElementWrapper(sentScreen, newDate);
    appendElementWrapper(receivedScreen, newDate.cloneNode(true));
  }
};

const scrolltoBottom = () => {
  let screenPos = document.querySelectorAll(`.chatwall`);
  screenPos.forEach((el) => {
    const isScrolledToBottom =
      el.scrollHeight - el.clientHeight <= el.scrollTop + 1;
    if (!isScrolledToBottom) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  });
};

getStartChatMessageBody();
