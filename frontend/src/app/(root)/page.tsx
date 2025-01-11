import { About } from "./components/about";
import { HowDoesItWork } from "./components/how-does-it-work";
import { WhatWillILearn } from "./components/what-will-i-learn";

export default function IndexPage() {
  return (
    <div className="lg:px-4 py-6">
      <About />
      <HowDoesItWork />
      <WhatWillILearn />
    </div>
  )
}
