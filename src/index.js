const twemoji = require('twemoji');

const { CheckBox, CheckBoxUtils, loadScreen, closePopup, openAddUserPopup } = require('./js/utils');
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

function addUser () {
  document.getElementById("add-user-inp").classList.remove("text-inp-error");
  document.getElementById("add-user-inp").placeholder = document.getElementById("add-user-inp").getAttribute("default-placeholder");

  if ( utils.checkInp(document.getElementById("add-user-inp")) ) {
    document.getElementById("add-user-enter-btn").classList.remove("ub-error");
    document.getElementById("add-user-enter-btn").disabled = true;
    let user_id = document.getElementById("add-user-inp").value;
    document.getElementById("add-user-inp").value = "";

    // force cache user
    client.users.fetch(user_id, { force: true })
    .then((user) => {
      if ( user.id == client.user.id ) throw('cannot add yourself');
      console.log(user);
      let userlist = ls.getItem('userlist-' + client.user.id);
      if ( userlist == undefined ) userlist = "[]";
      userlist = JSON.parse(userlist);
      if ( !userlist.includes(user.id) )
        userlist.unshift(user.id);
      userlist = JSON.stringify(userlist);
      ls.setItem('userlist-' + client.user.id, userlist);
      main_screen.session_userlist.unshift(user);
      main_screen.refresh();

      closePopup('add-user-popup');
    }).catch((err) => {
      console.error(err);
      document.getElementById("add-user-enter-btn").disabled = false;
      document.getElementById("add-user-inp").classList.add("text-inp-error");
      document.getElementById("add-user-inp").placeholder = "Invalid User ID"
    })
  } else {
    document.getElementById("add-user-enter-btn").classList.add("ub-error");
  }
}

// DiscordJS

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.username}`);
  loadScreen("main-screen");
  main_screen.doMainScreen(client);

  // console.log(client.users.cache.find(user => user.id === "251313248979124226"))
})

// client.users.cache.get("<user id>");
// not force cached

/* document.body.addEventListener("keydown", function(event) {
  if (event.keyCode == 13) {
      alert("Hello! You pressed the enter key!");
  }
}); */

// ^ could be useful for esc on popup e=menu

document.getElementById('query-userlist').addEventListener("keyup", () => {
  main_screen.refresh(document.getElementById('query-userlist').value);
});
