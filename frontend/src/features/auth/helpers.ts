"use server"

import { signIn as naSignIn } from "auth"

export async function signIn(...args: ArgumentTypes<typeof naSignIn>) {
  await naSignIn(...args)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-function-type
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never
