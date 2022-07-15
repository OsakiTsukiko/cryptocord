const titlebarIcon = document.getElementById("title-icon")

module.exports = {
    openAvatarURL: function ( url ) {
        window.open(url, "_blank", "width=512,height=512");
    },

    doMainScreen: function ( client ) {
        let avatar = client.user.displayAvatarURL() + "?size=512";
        titlebarIcon.src = avatar;
        let oc_avatar = document.getElementById("oc-owner-icon");
        oc_avatar.src = avatar;
        oc_avatar.onclick = function () {
            module.exports.openAvatarURL(avatar);
        }
    }
}