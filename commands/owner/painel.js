const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { db , owner , tk } = require("../../database/index");


module.exports = {
    name:"painel",
    description:"painel de controle do bot",
    type: ApplicationCommandType.ChatInput,
    run: async(client, interaction) => {
        if(owner !== interaction.user.id) return interaction.reply({content:`Você não tem permissão de usar este comando.`, ephemeral: true });
        const system = await db.get("system");
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setAuthor({name: "Painel de Controle", iconURL: client.user.avatarURL()})
                .setDescription(`Olá, **${interaction.member.displayName}**! ⚙️\nEste é o painel de controle do sistema de tickets.\nAqui você pode configurar as categorias, editar mensagens, alterar emojis, ajustar permissões e muito mais.`)
                .addFields(
                    {
                        name:"Status:",
                        value:`${system ? "`Ligado`" : "`Desligado`"}`,
                        inline: true
                    },
                    {
                        name:"Versão:",
                        value:`\`1.0.0\``,
                        inline: true
                    },
                    {
                        name:"Ping:",
                        value:`\`${client.ws.ping}ms\``,
                        inline: true
                    },
                )
                .setColor("#00FFFF")
            ],
            components: [
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId("systemtrueorfalse")
                    .setEmoji(system ? "1385800780392562808" : "1385801172539015329")
                    .setStyle(system ? 3 : 4),
                    new ButtonBuilder()
                    .setCustomId("configpanel")
                    .setLabel("Configurar Painel")
                    .setStyle(1)
                    .setEmoji("1303484389279399936"),
                    new ButtonBuilder()
                    .setCustomId("definition")
                    .setLabel("Definições")
                    .setStyle(2)
                    .setEmoji("1303484377442943098"),
                    new ButtonBuilder()
                   .setLabel("Adicionar Bot")
                   .setStyle(5)
                   .setURL("https://ggmax.com.br/perfil/Kaique_4")
                   .setEmoji("1303484360359678004")
                )
            ],
            ephemeral: true
        });
    }
}