import { createEvent, restore } from 'effector';

export const toggleBurger = createEvent<boolean>();

export const $isBurgerOpen = restore(toggleBurger, false);
