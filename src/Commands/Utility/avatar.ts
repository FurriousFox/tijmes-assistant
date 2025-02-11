import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../Interfaces/index.ts";

declare module "discord.js" {
  interface APIInteractionDataResolvedGuildMember {
    joined_at: Date;
  }
}

export const command = new Command({
  category: "utility",
  usage: "[user]",
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get the avator of a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to get the avatar of")
        .setRequired(false),
    )
    .addBooleanOption((option) =>
      option.setName("silent").setDescription("Silently execute"),
    ),
  run: (_client, interaction) => {
    const user = interaction.options.get("user")?.user || interaction.user;

    const silent = !!interaction.options.get("silent");

    interaction.sendEmbed({
      title: user.globalName,
      image: {
        url: user.displayAvatarURL({ size: 4096, extension: "png" }),
      },
      ephemeral: silent,
      deleteButton: !silent,
    });
  },
});
