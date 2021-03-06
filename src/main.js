/**
 * @file main.js is the root file for this ChatScreen Task
 * @author Ajibolanle Gloria
 * @see <a href="https://github.com/Glowrare">Glowrare</a>
 */

/**
 * @constant
 * @type {NodeListOf<Element>} Fetch the element list of send button for chat screens on the page
 */
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

/**
 * Get message sender and receiver with button element and update chat screens
 * @param {Element} btn Sender button element
 */
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

/**
 * Object of chat message
 * @typedef {Object} MessageItem
 * @property {string} msg - Chat message content
 * @property {string} time - Time chat was sent
 * @property {string} date - The date the chat was sent
 * @property {string} sender - Name of sender
 * @property {string} receiver - Name of receiver
 * @property {string} senderScreen - Sender's screen name
 * @property {string} receiverScreen - Receiver's screen name
 * @property {string} initials - Initials of sender
 */

/**
 * Array of chat messages log
 * @type {Array<MessageItem>}
 */

const msgArray = [
  {
    msg: "Hey Sara. I took care of it!! \n Ra's is not going to be a problem for a while",
    time: '11:32',
    date: '22/05/2020',
    sender: 'OLIVER',
    receiver: 'SARA',
    senderScreen: 'olivers-screen',
    receiverScreen: 'saras-screen',
    initials: 'OQ',
  },
  {
    msg: " Yaay!! ???? That's awesome, Ollie. \n I'm going share the news with the Legends now!",
    time: '11:33',
    date: '22/05/2020',
    sender: 'OLIVER',
    receiver: 'SARA',
    senderScreen: 'saras-screen',
    receiverScreen: 'olivers-screen',
    initials: 'SL',
  },
  {
    msg: 'Nate says we owe you BIG! ????',
    time: '11:38',
    date: '22/05/2020',
    sender: 'OLIVER',
    receiver: 'SARA',
    senderScreen: 'saras-screen',
    receiverScreen: 'olivers-screen',
    initials: 'SL',
  },
  {
    msg: 'Haha! My pleasure ????',
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

/**
 * Create formatted HTML element from chat message object passed
 *
 * @param {MessageItem} item The chat message object item to create HTML element for display
 * @returns {{recvd: Element, sent: Element}} An object of two HTML elements - The received chat message format and the sent chat message format
 */
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

/**
 * Fetch each new item in the message array and render to chat screens in the DOM
 * @returns {{recvd: Element, sent: Element}} An object of two HTML elements - The received chat message format and the sent chat message format
 */
const fecthNewChatItem = () => {
  const itemIndex = msgArray.length - 1;
  const newMsg = getChatMessageBody(msgArray[itemIndex]);
  return newMsg;
};

/**
 * Fecth each item in the existing message array and render to chat screens in the DOM
 * @returns {void}
 */
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

/**
 * Class to create the Chat Message item
 */
class messageFormat {
  /**
   * Create a message item
   * @param {string} chatBody The value of the textbox field on the DOM
   * @param {string} sender Name of chat message sender
   * @param {string} receiver Name of the recipeint of the chat message
   * @param {string} initials initials of the message sender fetched from the DOM
   */
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

  /**
   * @property {Function} formatSender Extract name of the sender from the screen name input
   * @returns {string} Sender's name formatted in uppercase
   */
  formatSender() {
    return (this.sender = this.senderScreen.slice(0, -8).toUpperCase());
  }

  /**
   * @property {Function} formatReceiver Extract name of the receiver from the screen name input
   * @returns {string} Receiver's name formatted in uppercase
   */
  formatReceiver() {
    return (this.receiver = this.receiverScreen.slice(0, -8).toUpperCase());
  }

  /**
   * @property {Function} msgItem Create an object of message item
   * @returns Push new message item object format to msgArray
   */
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

/**
 * Get today's date using JS Date costructor
 * @returns {string} Today's date in dd/mm/yyyy format
 */
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

/**
 * Get current's time using JS Date costructor
 * @returns {string} Current's time in 24:00 hrs format
 */
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

/**
 * Create new chat date format
 * @param {boolean} existing Create date from new of existing message item. If existing, true; false, otherwise
 * @param {MessageItem} [x] Existing message item object
 * @return {Element} HTML list tag element for chat screen date header
 */
const newChatDate = (existing, x = {}) => {
  const newChatTag = createLiTag.cloneNode(true);
  newChatTag.setAttribute('class', 'chatdate');
  if (existing) {
    newChatTag.textContent = x.date;
  } else {
    newChatTag.textContent = fetchDate();
  }
  return newChatTag;
};

/**
 * Check last existing chat date to append new chat date tag to screens conditionally
 * @param {Element} sentScreen Chat screen DOM interface of the chat sender
 * @param {Element} receivedScreen Chat screen DOM interface of the chat sender
 * @return {void}
 */
const checkLastChatDate = (sentScreen, receivedScreen) => {
  const lastChatDateContainer = document.querySelectorAll('.chatdate');
  const lastChatDate = lastChatDateContainer[lastChatDateContainer.length - 1];
  const todaysDate = fetchDate();
  if (lastChatDate.textContent !== todaysDate) {
    const newDate = newChatDate(false);
    appendElementWrapper(sentScreen, newDate);
    appendElementWrapper(receivedScreen, newDate.cloneNode(true));
  }
};

/**
 * Scroll to Bottom position of chat screen where there is an overflow
 */
const scrolltoBottom = () => {
  const screenPos = document.querySelectorAll(`.chatwall`);
  screenPos.forEach((el) => {
    const isScrolledToBottom =
      el.scrollHeight - el.clientHeight <= el.scrollTop + 1;
    if (!isScrolledToBottom) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  });
};

getStartChatMessageBody();
