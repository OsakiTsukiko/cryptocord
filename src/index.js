const utils = require('./js/utils');
const window_actions = require('./js//window_actions');
const { CheckBox, CheckBoxUtils } = require('./js/utils');
const ls = window.localStorage;

let rememberMe = new CheckBox(document.getElementById("remember_me_check"))
rememberMe.element.onclick = function () {
  if ( rememberMe.element.getAttribute("checked") == "true" ) {
    rememberMe.element.setAttribute("checked", "false");
    rememberMe.element.classList.remove("ch-box-checked");
    rememberMe.element.classList.add("ch-box-unchecked");
  } else {
    rememberMe.element.setAttribute("checked", "true");
    rememberMe.element.classList.remove("ch-box-unchecked");
    rememberMe.element.classList.add("ch-box-checked");
  }
}

// ^^^
// BRUH
// Is there a better way, tried lotta stuff
// nothing seems works
// even sth like:
// rememberMe.element.onclick = CheckBox.toggle(rememberMe.element)
// I even tried making another class for "utils"
// (left the class is) and doing sth like this:
// rememberMe.element.onclick = CheckBoxUtils.toggle(rememberMe.element)

const { Client } = require('discord.js-selfbot-v13');
const client = new Client(); // All partials are loaded automatically

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

// client.login('token');

function login () {
    
}