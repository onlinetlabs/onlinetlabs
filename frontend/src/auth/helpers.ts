"use server"

import { signIn as naSignIn, signOut as naSignOut } from "."

export async function signIn(...args: ArgumentTypes<typeof naSignIn>) {
  await naSignIn(...args)
}

export async function signOut(...args: ArgumentTypes<typeof naSignOut>) {
  await naSignOut(...args)
}

// @ts-ignore
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never
