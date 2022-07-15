const { Interaction } = require('discord.js-selfbot-v13');
const { UIListUser } = require('./utils');
const titlebarIcon = document.getElementById("title-icon");

const user_list = []
const UIListUsers_list = []

module.exports = {
    openAvatarURL: function ( url ) {
        window.open(url, "_blank", "width=512,height=512");
    },

    doMainScreen: async function ( client ) {
        let avatar = client.user.displayAvatarURL() + "?size=512";
        titlebarIcon.src = avatar;
        let oc_avatar = document.getElementById("oc-owner-icon");
        oc_avatar.src = avatar;
        oc_avatar.onclick = function () {
            module.exports.openAvatarURL(avatar);
        }
        document.getElementById("oc-owner-tag-name").innerText = client.user.username;
        document.getElementById("oc-owner-tag-discriminator").innerText = "#" + client.user.discriminator;
        
        let status = client.user.presence.status;
        // console.log(status)
        if ( status == "online" )
            document.getElementById("oc-owner-tag-discriminator").classList.add("bg-online")
        else if ( status == "idle" )
            document.getElementById("oc-owner-tag-discriminator").classList.add("bg-idle")
        else if ( status == "dnd" )
            document.getElementById("oc-owner-tag-discriminator").classList.add("bg-dnd")
        else if ( status == "invisible" || status == "offline" )
            document.getElementById("oc-owner-tag-discriminator").classList.add("bg-offline")
        else 
        document.getElementById("oc-owner-tag-discriminator").classList.add("bg-default")

        if ( client.user.presence.activities.length == 0 ) {
            document.getElementById("oc-owner-status-cont").style.display = "none";
        } else {
            let activity = client.user.presence.activities[0];
            if ( activity.type == "CUSTOM" ) {
                let emoji;
                if ( activity.emoji.animated ) emoji = "⚠️";
                else emoji = activity.emoji.name;
            
                document.getElementById("oc-owner-tag-emoji").innerHTML = twemoji.parse(emoji);      
                document.getElementById("oc-owner-tag-state").innerText = activity.state;
            }
        }
        
        /* client.guilds.cache.forEach((guild) => {
            console.log(guild.members) 
        }) */

        client.users.cache.forEach(async (user) => {
            if ( user.id != client.user.id ) {
                let fuser = await client.users.fetch(user.id, { force: true });
                user_list.push(fuser);
                console.log(fuser);
                // console.log(fuser.username, fuser.banner || fuser.accentColor);
                console.log(fuser.hexAccentColor);
                console.log(fuser.bannerURL())
                let ui_user = new UIListUser(
                    fuser.id, 
                    fuser.displayAvatarURL() + "?size=512", 
                    // fuser.tag,
                    fuser.username, 
                    fuser.hexAccentColor,
                    fuser.bannerURL(),
                    // fuser.presence.status
                );

                document.getElementById("user-list").innerHTML += ui_user.getHtml;
                ui_user.update();
                UIListUsers_list.push(ui_user);
            }
        })
    }
}