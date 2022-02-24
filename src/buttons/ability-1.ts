import { MessageEmbed } from "discord.js";
import { ButtonData } from "../interfaces";

module.exports = {
    id: "ability-1",
    execute: async helper => {
        await helper.respond(
            new MessageEmbed().setAuthor({
                name: `🔮  Ability 1`,
            })
        );
    }
} as ButtonData;