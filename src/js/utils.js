const shell = require("electron").shell

const no_typescript = 
   `⠀⣞⢽⢪⢣⢣⢣⢫⡺⡵⣝⡮⣗⢷⢽⢽⢽⣮⡷⡽⣜⣜⢮⢺⣜⢷⢽⢝⡽⣝
    ⠸⡸⠜⠕⠕⠁⢁⢇⢏⢽⢺⣪⡳⡝⣎⣏⢯⢞⡿⣟⣷⣳⢯⡷⣽⢽⢯⣳⣫⠇
    ⠀⠀⢀⢀⢄⢬⢪⡪⡎⣆⡈⠚⠜⠕⠇⠗⠝⢕⢯⢫⣞⣯⣿⣻⡽⣏⢗⣗⠏⠀
    ⠀⠪⡪⡪⣪⢪⢺⢸⢢⢓⢆⢤⢀⠀⠀⠀⠀⠈⢊⢞⡾⣿⡯⣏⢮⠷⠁⠀⠀
    ⠀⠀⠀⠈⠊⠆⡃⠕⢕⢇⢇⢇⢇⢇⢏⢎⢎⢆⢄⠀⢑⣽⣿⢝⠲⠉⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⡿⠂⠠⠀⡇⢇⠕⢈⣀⠀⠁⠡⠣⡣⡫⣂⣿⠯⢪⠰⠂⠀⠀⠀⠀
    ⠀⠀⠀⠀⡦⡙⡂⢀⢤⢣⠣⡈⣾⡃⠠⠄⠀⡄⢱⣌⣶⢏⢊⠂⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⢝⡲⣜⡮⡏⢎⢌⢂⠙⠢⠐⢀⢘⢵⣽⣿⡿⠁⠁⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠨⣺⡺⡕⡕⡱⡑⡆⡕⡅⡕⡜⡼⢽⡻⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⣼⣳⣫⣾⣵⣗⡵⡱⡡⢣⢑⢕⢜⢕⡝⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⣴⣿⣾⣿⣿⣿⡿⡽⡑⢌⠪⡢⡣⣣⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⡟⡾⣿⢿⢿⢵⣽⣾⣼⣘⢸⢸⣞⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠁⠇⠡⠩⡫⢿⣝⡻⡮⣒⢽⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`;

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

class UIListUser {
    element;

    id;
    avatar;
    tag;
    color;
    banner;
    // 300pxstatus;

    constructor ( id, avatar, tag, color, banner, /* status */ ) {
        this.id = id;
        this.avatar = avatar
        this.tag = tag
        this.color = color // (accent)
        this.banner = banner
        // this.status = status
    }

    get getHtml () {
        return `
        <div class="user" id="user-${this.id}">
            <div class="avatar-cont">
                <img id="ua-${this.id}">
            </div>
            <div class="tag-cont">
                <div id="ut-${this.id}"></div>
            </div>
        </div>
        `;
    }

    update () {
        if ( this.banner != undefined && this.banner != null && this.banner != "" ) {
            document.getElementById(`user-${this.id}`).style.background = `url('${this.banner}?size=512')`;
        } else if ( this.color != undefined && this.color != null && this.color != "" ) {
            document.getElementById(`user-${this.id}`).style.background = this.color;
        } else {
            document.getElementById(`user-${this.id}`).style.background = '#5865f2';
        }

        document.getElementById(`user-${this.id}`).style.backgroundSize = '100%';
        document.getElementById(`user-${this.id}`).style.backgroundPosition = 'center';
        
        document.getElementById(`ua-${this.id}`).src = this.avatar;
        document.getElementById(`ut-${this.id}`).innerText = this.tag;

        /* if ( this.status != null || this.status != undefined ) {
            document.getElementById(`user-${this.id}`).classList.add(`bl-${this.status}`);
            console.log(this.status)
        } */
    }
}

module.exports = {
    openURL: function (URL) {
        shell.openExternal(URL);
    },

    CheckBox: CheckBox,
    CheckBoxUtils: CheckBoxUtils,
    UIListUser: UIListUser,
    no_typescript: no_typescript,

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
    },

    closePopup: function (popup) {
        document.getElementById(popup).classList.add('popup-hidden');
    },

    openAddUserPopup: function () {
        document.getElementById("add-user-inp").classList.remove("text-inp-error");
        document.getElementById("add-user-inp").value = "";
        document.getElementById("add-user-inp").placeholder = document.getElementById("add-user-inp").getAttribute("default-placeholder");
        document.getElementById("add-user-enter-btn").classList.remove("ub-error");
        document.getElementById('add-user-popup').classList.remove('popup-hidden');
    }
}