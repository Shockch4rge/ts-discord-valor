import { SlashCommandBuilder } from '@discordjs/builders';

import { ButtonHelper } from '../helpers/ButtonHelper';
import { MenuHelper } from '../helpers/MenuHelper';
import { SlashCommandHelper } from '../helpers/SlashCommandHelper';

export type SlashCommandData = {
	ephemeral?: boolean;
	builder: SlashCommandBuilder;
	guard?: {
		test: (helper: SlashCommandHelper) => Promise<void>;
		fail: (error: Error, helper: SlashCommandHelper) => Promise<void>;
	};
	execute: (helper: SlashCommandHelper) => Promise<void>;
};

export type ButtonData = {
	id: string;
	execute: (helper: ButtonHelper) => Promise<void>;
};

export type MenuData = {
	id: string;
	params?: {
		defer?: boolean;
		ephemeral?: boolean;
	};
	guard?: {
		test: (helper: MenuHelper) => Promise<void>;
		fail: (error: Error, helper: MenuHelper) => Promise<void>;
	};
	execute: (helper: MenuHelper) => Promise<void>;
};
