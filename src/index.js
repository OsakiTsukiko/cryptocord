const twemoji = require('twemoji');

const { CheckBox, CheckBoxUtils, loadScreen } = require('./js/utils');
const utils = require('./js/utils');
const more = require('./js/more');
const main_screen = require('./js/main_screen');

const window_actions = require('./js/window_actions');
const ls = window.localStorage;

const { Client, Interaction } = require('discord.js-selfbot-v13');
let client = new Client({
  checkUpdate: false
});
// All partials are loaded automatically

window.onload = function () {
  if ( ls.getItem("token") == undefined || ls.getItem("token") == "" )
    loadScreen("login-screen");
  else {
    loadScreen("loading-screen");
    client.login(ls.getItem("token")).catch((err) => {
      console.error("Client Login Err", err);
      ls.removeItem("token");
      loadScreen("login-screen");
    });
  }
}

function login () {
  if ( utils.checkInp(document.getElementById("login_token_inp")) ) {
    document.getElementById("login_enter_btn").classList.remove("ub-error");
    utils.loadScreen("loading-screen");
    let token = document.getElementById("login_token_inp").value;
    document.getElementById("login_token_inp").value = "";
    if ( more.rememberMe.isChecked ) {
      ls.setItem("token", token)
    }

    client.login(token).catch((err) => {
      console.error("Client Login Err", err);
      ls.removeItem("token");
      loadScreen("login-screen");
    });

    token = undefined;

  } else {
    document.getElementById("login_enter_btn").classList.add("ub-error");
  }
}

// DiscordJS

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.username}`);
  loadScreen("main-screen");
  main_screen.doMainScreen(client);

  // console.log(client.users.cache.find(user => user.id === "251313248979124226"))
})
