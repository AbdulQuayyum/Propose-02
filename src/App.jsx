import React, { useState } from "react"

import ASK from './Assets/ASK.gif'
import YES from './Assets/YES.gif'

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 10 + 22;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <main className="main">
      {yesPressed ? (
        <>
          <img src={YES} />
          <div className="text-4xl my-4 ">YAYYYYY!!!!!!!!!</div>
        </>
      ) : (
        <>
          <img
            className="h-[200px]"
            style={{ width: "400x", height: "240px" }}
            src={ASK}
          />
          <h1 className="text-4xl my-4 ">Will You Be My Girlfriend?</h1>
          <div className="">
            <button
              className="rounded-full cursor-pointer border border-[#a7efb8] bg-[#a7efb8] py-3 px-12 text-sm text-white transition-all hover:bg-white hover:text-[#a7efb8] dark:bg-white dark:text-[#a7efb8] dark:hover:bg-[#a7efb8] dark:hover:text-white"
              style={{ fontSize: yesButtonSize, height: yesButtonSize * 2 }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>

            <button
              onClick={handleNoClick}
              className="rounded-full cursor-pointer border border-[#c90d0d] bg-[#c90d0d] ml-8 py-3 px-8 text-sm text-white transition-all hover:bg-white hover:text-[#c90d0d] dark:bg-white dark:text-[#c90d0d] dark:hover:bg-[#c90d0d] dark:hover:text-white">
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </main>
  )
}

export default App
