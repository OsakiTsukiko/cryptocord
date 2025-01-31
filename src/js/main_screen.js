const { Interaction } = require('discord.js-selfbot-v13');
const { session } = require('electron');
const { UIListUser, no_typescript } = require('./utils');
const titlebarIcon = document.getElementById("title-icon");

const ls = window.localStorage;
const session_userlist = [];

module.exports = {
    openAvatarURL: function ( url ) {
        window.open(url, "_blank", "width=512,height=512");
    },

    refresh: function (query = false) {
        document.getElementById("user-list").innerHTML = "";
        for ( idx in session_userlist ) {
            let user = session_userlist[idx];
            if ( query != false && query != "" ) 
                if ( !user.username.toLowerCase().includes(query.toLowerCase()) ) continue;

            let ui_user = new UIListUser(
                user.id, 
                user.displayAvatarURL() + "?size=512", 
                // user.tag,
                user.username, 
                user.hexAccentColor,
                user.bannerURL(),
            );

            document.getElementById("user-list").innerHTML += ui_user.getHtml;
            ui_user.update();
            // UIListUsers_list.push(ui_user);
        }
        if ( document.getElementById("user-list").innerHTML == "" ) {
            document.getElementById("user-list").innerHTML = `<div class="empty"><div id="userlist-empty"></div></div>`;
            document.getElementById("userlist-empty").innerText = no_typescript;
        }
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

        /* client.users.cache.forEach(async (user) => {
            console.log("User", user);
            if ( user.id != client.user.id ) {
                
                // theese sometimes work, somethimes they dont
                // discord.js :
                // i should just make an api wrapper for selfbotting.. :))
                let fuser = await client.users.fetch(user.id, { force: true });
                user_list.push(fuser);
                console.log("Fuser", fuser);
                // console.log(fuser.username, fuser.banner || fuser.accentColor);
                // console.log("hexAccentColor", fuser.hexAccentColor);
                // console.log("bannerURL", fuser.bannerURL())
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
        }) */
        // ^^ this wont work, cuz:
        // 1st: discord limits requests,
        //      (i think... i had issues with 
        //      pending requests, unreliable)
        // 2nd: it lists random ppl uve talked about + 
        //      ppl that are rn in vc in one
        //      of the srvs u are in.. 
        //      kinda unconsistant

        if ( ls.getItem('userlist-' + client.user.id) == undefined ) {
            ls.setItem('userlist-' + client.user.id, JSON.stringify([]));
        } else {
            let userlist = JSON.parse(ls.getItem('userlist-' + client.user.id));
            for ( idx in userlist ) {
                // console.log(userlist[idx]); // Sould be an ID
                let uid = userlist[idx];
                await client.users.fetch(uid, { force: true })
                .then((user) => {
                    session_userlist.push(user);
                }).catch((err) => {
                    console.error(err);
                });
            }
            module.exports.refresh();
        }
    },

    session_userlist: session_userlist
}