'use client';

import { createEvent, restore } from '@lib/state-engine';

export const toggleBurger = createEvent<boolean>();

export const $isBurgerOpen = restore(toggleBurger, false);
