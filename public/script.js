const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const nicknameForm = document.getElementById('nicknameForm');
const nicknameInput = document.getElementById('nickname');
const confirmNickname = document.getElementById('confirmNickname');

confirmNickname.addEventListener('click', function (e) {
  e.preventDefault();
  if (nicknameInput.value) {
    socket.emit('nickname', nicknameInput.value);
    form.style.display = "flex";
    nicknameForm.style.display = "none";
    input.focus();
  }
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', { nickname: nicknameInput.value, message: input.value });
    input.value = '';
  }
});

socket.on('chat message', function (msg) {
  const item = document.createElement('li');
  item.textContent = msg.nickname + ': ' + msg.message;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
