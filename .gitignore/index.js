const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "!tcl";
var HotText = 'MDN';
var URL = "https://discordapp.com/oauth2/authorize?client_id=528225706996531221&scope=bot&permissions=8";
var Discord_link = "https://discord.gg/UXuN7y9"

client.login("NTI4MjI1NzA2OTk2NTMxMjIx.DyPEzw.fpvlEP0Io9gg6aRZxAsHiY-VOtc");

client.on("ready", () => {
    console.log("je suis prêt !")
    client.user.setGame("Gérer TheCirLab");
});

client.on('message', message =>{
    if(message.content === prefix+"ping"){
        message.channel.sendMessage('je suis bien connecté ! :thumbsup:');
        console.log('Répondu au test avec succès');
    
    }

    if(message.content === prefix + "invite"){
        var invite_embed = new Discord.RichEmbed()
        .setColor("#FF9900")
        .setTitle("Lien pour rejoindre le serveur d'origine , à savoir TheCirLab ! :sunglasses:")
        .setURL(Discord_link)
        message.channel.sendMessage(invite_embed)
    }

    if(message.content === prefix + "botinvite"){
        var invite_bot = new Discord.RichEmbed()
        .setColor("#FF9900")
        .setTitle("Lien pour inviter le bot dans ton serveur ! :smiley:")
        .setURL(URL)
        message.channel.sendMessage(invite_bot)
    }

    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#0066FF")
        .setTitle("Voici la liste les commandes utilisables !")
        .setDescription("Le préfix de base pour activer les commandes est le suivant : **!tcl**")
        .addField("!tclhelp", "Affiche la liste des commandes utilisables")
        .addField("!tclstats", "Affiche tes stats")
        .addField("!tclinfo", "Affiche les informations sur le bot ainsi que du serveur")
        .addField("!tclinvite", "Affiche le lien vers le serveur discord de TheCirLab")
        .addField("!tclbotinvite", "Affiche un lien pour inviter le bot TheBotLab dans ton serveur")
        .addField("!tclmute", "Mute une personne | Réservé aux admins !")
        .addField("!tclunmute", "Unmute une personne | Réservé aux admins !")
        .addField("!tclclear nombre", "clear un nombre spécifié de messages | réservées aux modos / Admins !")
        .addField("!tclkick @utilisateur", "kick une personne du serveur | Réservé aux modos / Admins !")
        .addField("!tclban @utilisateur", "Ban une personne du serveur | Réservé aux modos / Admins ! ")
        .setFooter("TheBotLab , bot officiel de TheCirLab")
        message.channel.sendMessage(help_embed);
        console.log("Un utilisateur a utilisé !tclhelp")  
    }

    if(message.content.startsWith(prefix + "kick")){
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de kick des membres :confused:");

        if(message.mentions.users.size === 0){
            return message.channel.send("Mentionnez l'utilisateur a kick !")
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick){
            return message.channel.send("Je ne sais pas si l'utilisateur existe ! :confused:")
        }

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")){
            return message.channel.send("Je ne possède pas la permission pour kick ! :confused:") 
        }
        
        kick.kick().then(member => {
            message.channel.send(`${member.user.username} a été kick par ${message.author.username}`);
        });
    }

    if(message.content.startsWith(prefix + "ban")){
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de ban des membres :confused:");

        if(message.mentions.users.size === 0){
            return message.channel.send("Mentionnez l'utilisateur a ban !")
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!kick){
            return message.channel.send("Je ne sais pas si l'utilisateur existe ! :confused:")
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")){
            return message.channel.send("Je ne possède pas la permission pour ban ! :confused:") 
        }
        
        ban.ban().then(member => {
            message.channel.send(`${member.user.username} a été ban par ${message.author.username}`);
        });
    }

    if (message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("Vous n'avez pas la permission");
                   
           let args = message.content.split(" ").slice(1);
                    
          if(!args[0]) return message.channel.send("il faut préciser un nombre de message à supprimer")
                      
        message.channel.bulkDelete(args[0]).then(() => {                    
          message.channel.send(`${args[0]} messages ont été supprimés`);
        })
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute !`);
        });
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute !`);
        });
    }

    if(message.content === prefix + "info") {
        var info_embed = new Discord.RichEmbed()
        .setColor("#33FF99")
        .setTitle("Voici les informations sur moi et le serveur !")
        .addField(" :robot: Nom :", `${client.user.tag}`, true)
        .addField("Descriminateur du bot :hash:", `#${client.user.discriminator}`)
        .addField("ID :id: ", `${client.user.id}`)
        .addField("Nombre de membres présents sur le serveur :", message.guild.members.size)
        .addField("Nombre de catégories ainsi que de salons", message.guild.channels.size)
        .setFooter("Informations du serveur TheCirLab")
        message.channel.sendMessage(info_embed)
    }

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "stats":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()

        .setColor("#CC0033")
        .setTitle(`Information de l'utilisateur : ${message.author.username}`)
        .addField(`ID de l'utilisateur :id:`, msgauthor, true)
        .addField("Date de création du compte :", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Voici les statistiques de cet utilisateur !")
        message.channel.sendMessage({embed: stats_embed})
        break;
    }
});
