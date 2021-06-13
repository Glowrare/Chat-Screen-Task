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

const createElementWrapper = (el) => {
  return document.createElement(el);
};
const appendElementWrapper = (parent, el) => {
  return parent.appendChild(el);
};

const createLiTag = createElementWrapper('li');
const createDivTag = createElementWrapper('div');

const newChatDate = () => {
  let newChatTag = createLiTag.cloneNode(true);
  newChatTag.setAttribute('class', 'chatdate');
  newChatTag.textContent = fetchDate();
  return newChatTag;
};

const getChatMessage = (contactInitials, sentChat, recvdChat, chatInput) => {
  let initials = createDivTag.cloneNode(true);
  initials.setAttribute('class', 'initials');
  initials.textContent = contactInitials.textContent;

  let chatMessageWrapper = createDivTag.cloneNode(true);
  chatMessageWrapper.setAttribute('class', 'xchgcontent');

  let chatBody = createElementWrapper('p');
  chatBody.setAttribute('class', 'chat-body');
  chatBody.textContent = chatInput;

  let sentTime = createElementWrapper('small');
  sentTime.setAttribute('class', 'dark-grey-clr');
  sentTime.textContent = `Message sent by ${fetchTime()}`;

  appendElementWrapper(chatMessageWrapper, chatBody);
  appendElementWrapper(chatMessageWrapper, sentTime);

  sentChat.setAttribute('class', 'chatxchg sentchat');
  appendElementWrapper(sentChat, chatMessageWrapper);

  recvdChat.setAttribute('class', 'chatxchg recvdchat');
  appendElementWrapper(recvdChat, initials);
  appendElementWrapper(recvdChat, chatMessageWrapper.cloneNode(true));
};

const updateScreen = (btn) => {
  let sender = '';
  let receiver = '';
  if (btn.id === 'slToOQBtn') {
    sender = 'olivers-screen';
    receiver = 'saras-screen';
  } else {
    sender = 'saras-screen';
    receiver = 'olivers-screen';
  }

  let chatInput = document
    .querySelector(`.${sender} .chattext-inputbox`)
    .value.trim();
  let contactInitials = document.querySelector(
    `.${receiver} .chat-header .initials`
  );
  let sentScreen = document.querySelector(`.${sender} .chatgroup`);
  let receivedScreen = document.querySelector(`.${receiver} .chatgroup`);

  let sentChat = createLiTag.cloneNode(true);
  let recvdChat = createLiTag.cloneNode(true);

  if (chatInput !== '') {
    getChatMessage(contactInitials, sentChat, recvdChat, chatInput);
    checkLastChatDate(sentScreen, receivedScreen);
    appendElementWrapper(sentScreen, sentChat);
    appendElementWrapper(receivedScreen, recvdChat);
    document.querySelector(`.${sender} .chattext-inputbox`).value = '';
  }
};

const checkLastChatDate = (sentScreen, receivedScreen) => {
  let lastChatDateContainer = document.querySelectorAll('.chatdate');
  let lastChatDate = lastChatDateContainer[lastChatDateContainer.length - 1];
  let todaysDate = fetchDate();
  if (lastChatDate.textContent !== todaysDate) {
    let newDate = newChatDate();
    appendElementWrapper(sentScreen, newDate);
    appendElementWrapper(receivedScreen, newDate.cloneNode(true));
  }
};

const sendBtn = document.querySelectorAll('.chattext-inputbtn');
sendBtn.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    updateScreen(el);
    scrolltoBottom();
  });
});
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
