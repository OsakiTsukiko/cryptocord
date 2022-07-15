const shell = require("electron").shell

class CheckBox {
    element;

    get isChecked () {
        return this.element.getAttribute("checked") == "true";
    }

    check () {
        this.element.setAttribute("checked", "true");
        this.element.classList.remove("ch-box-unchecked");
        this.element.classList.add("ch-box-checked");
    }

    uncheck () {
        this.element.setAttribute("checked", "false");
        this.element.classList.remove("ch-box-checked");
        this.element.classList.add("ch-box-unchecked");
    }

    toggle () {
        if ( this.isChecked == true ) this.uncheck();
        else this.check();
    }

    constructor ( element ) {
        this.element = element;
        // cant figure out how to set the
        // onclick event to this.toggle
        // inside the class
    }
}

class CheckBoxUtils {
    static toggle ( element ) {
        if ( element.getAttribute("checked") == "true" ) {
            element.setAttribute("checked", "false");
            element.classList.remove("ch-box-checked");
            element.classList.add("ch-box-unchecked");
        } else {
            element.setAttribute("checked", "true");
            element.classList.remove("ch-box-unchecked");
            element.classList.add("ch-box-checked");
        }
    }
}

module.exports = {
    openURL: function (URL) {
        shell.openExternal(URL);
    },

    CheckBox: CheckBox,
    CheckBoxUtils: CheckBoxUtils,

    checkInp: function (element, remove_spaces) {
        let value = element.value;
        if ( remove_spaces ) value.replaceAll(' ', '');
        if ( value == undefined || value == "" ) return false;
        // might add more checks..
        return true;
    },

    loadScreen: function ( screen_class_name ) {
        let screens = document.getElementsByClassName("screen");
        for ( screen of screens ) {
            screen.classList.add("screen-hidden");
        }
        screens = document.getElementsByClassName(screen_class_name);
        for ( screen of screens ) {
            screen.classList.remove("screen-hidden");
        }
    }
}