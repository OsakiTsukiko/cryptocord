const { CheckBox } = require('./utils');

document.getElementById("login_token_inp").addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("login_enter_btn").click();
    }
})

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

module.exports = {
    rememberMe: rememberMe
}