import { useMemo, useState } from "react";
import ASK from './Assets/ASK.gif';

// Replace these with your actual image imports
import IMAGE1 from './Assets/01.png';
import IMAGE2 from './Assets/02.JPEG';
import IMAGE3 from './Assets/03.png';

const FloatingIcons = ({ visible }) => {
  const icons = ['❤️', '💖', '✨', '🌸', '💕', '🌹', '💌'];

  // Generate 20 random icons with unique positions and speeds
  const randomIcons = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      char: icons[Math.floor(Math.random() * icons.length)],
      left: Math.random() * 100, // Random horizontal start
      delay: Math.random() * 10,  // Random start time
      duration: 5 + Math.random() * 10, // Random fall speed (5s to 15s)
      size: 1 + Math.random() * 1.5, // Random size
    }));
  }, []);

  return (
    <div className={`bg-icons ${visible ? 'visible' : ''}`}>
      {randomIcons.map((icon, i) => (
        <span
          key={i}
          className="floating-icon"
          style={{
            left: `${icon.left}%`,
            animationDelay: `${icon.delay}s`,
            animationDuration: `${icon.duration}s`,
            fontSize: `${icon.size}rem`
          }}
        >
          {icon.char}
        </span>
      ))}
    </div>
  );
};

function App() {
  const [yesCount, setYesCount] = useState(0);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [cardsSettled, setCardsSettled] = useState(false);

  const yesssssButtonSize = yesCount * 5 + 16;

  const handleYesClick = () => {
    setYesCount(yesCount + 1);
  };

  const handleYesssssClick = () => {
    setShowEnvelope(true);
    setTimeout(() => {
      setEnvelopeOpened(true);
    }, 100);
    // Cards settle down after envelope closes
    setTimeout(() => {
      setCardsSettled(true);
    }, 3200);
  };

  const handleTryAgain = () => {
    setYesCount(0);
  };

  const handleCardClick = () => {
    if (currentCard < 3) {
      setCurrentCard(currentCard + 1);
    } else {
      setCurrentCard(0);
    }
  };

  const getYesButtonText = () => {
    const phrases = [
      "seriously",
      "are you sure",
      "give it another thought?",
    ];

    return phrases[Math.min(yesCount - 1, phrases.length - 1)];
  };

  const cards = [
    {
      type: 'letter',
      content: (
        <div className="mt-4 letter-content">
          <p className="letter-title">You just made me the happiest person! 🎉💕</p>
          <p className="letter-text">
            I knew you'd say yes! You mean the world to me, and I can't wait to spend this Valentine's Day (and many more) with you.
          </p>
          <p className="letter-text">
            You make every day feel special, and I'm so grateful to have you in my life.
          </p>
          <p className="letter-text">
            Here's to us and all the beautiful moments we'll share together! 💖
          </p>
          <p className="tap-hint">Tap to see more ✨</p>
        </div>
      )
    },
    {
      type: 'image',
      content: <img src={IMAGE1} alt="Memory 1" className="card-image" />
    },
    {
      type: 'image',
      content: <img src={IMAGE2} alt="Memory 2" className="card-image" />
    },
    {
      type: 'image',
      content: <img src={IMAGE3} alt="Memory 3" className="card-image" />
    }
  ];

  const getCardPosition = (index) => {
    const diff = (index - currentCard + 4) % 4;

    if (diff === 0) {
      // Current card - on top
      return {
        zIndex: 20,
        translateY: 0,
        scale: 1,
        opacity: 1
      };
    } else {
      // Stacked cards behind
      return {
        zIndex: 20 - diff,
        translateY: diff * 8,
        scale: 1 - diff * 0.03,
        opacity: 1
      };
    }
  };

  return (
    <main className="main">
      <FloatingIcons visible={showEnvelope} />
      {showEnvelope ? (
        <div className="envelope-scene">
          <div className={`wrapper ${envelopeOpened ? 'active' : ''}`}>
            <div className="lid one"></div>
            <div className="lid two"></div>
            <div className="envelope"></div>

            <div className={`cards-stack ${cardsSettled ? 'settled' : ''}`}>
              {cards.map((card, index) => {
                const pos = getCardPosition(index);
                return (
                  <div
                    key={index}
                    className="card"
                    style={{
                      zIndex: pos.zIndex,
                      transform: `translateY(${pos.translateY}px) scale(${pos.scale})`,
                      opacity: pos.opacity,
                    }}
                    onClick={handleCardClick}
                  >
                    {card.content}
                  </div>
                );
              })}
            </div>
          </div>

          {cardsSettled && (
            <p className="reset-hint">Tap cards to see more! {currentCard === 3 ? '(Tap again to restart 🔄)' : '✨'}</p>
          )}
        </div>
      ) : yesCount >= 4 ? (
        <div className="special-message-container">
          <div className="max-w-md mx-4 text-center">
            <p className="mb-6 text-3xl md:text-4xl">Oh... 😥</p>
            <p className="mb-4 text-lg md:text-xl">
              Wait, I thought you'd be more excited about this! Maybe you didn't mean to click that one?
              Perhaps you want to reconsider... 😊
            </p>
            <button
              onClick={handleTryAgain}
              className="mt-6 rounded-full cursor-pointer border border-[#ff8787] bg-[#ff8787] py-3 px-12 text-lg text-white transition-all hover:bg-white hover:text-[#ff8787]"
            >
              Let me try again!
            </button>
          </div>
        </div>
      ) : (
        <>
          <img
            className="h-[200px]"
            style={{ width: "400px", height: "240px" }}
            src={ASK}
            alt="Valentine"
          />
          <h1 className="px-4 my-4 text-2xl text-center md:text-4xl">Aduke, <br /> Will You Be My Valentine?</h1>

          <div className="flex flex-wrap items-center justify-center gap-6 px-4 mb-8 text-center">
            <button
              onClick={handleYesClick}
              className="rounded-full cursor-pointer flex items-center border border-[#ff8787] bg-[#ff8787] py-3 px-12 text-white transition-all hover:bg-white hover:text-[#ff8787]"
            >
              {yesCount === 0 ? "Yes" : getYesButtonText()}
            </button>
            <button
              onClick={handleYesssssClick}
              style={{
                fontSize: `${yesssssButtonSize}px`,
                padding: `${yesssssButtonSize * 0.4}px ${yesssssButtonSize * 1}px`
              }}
              className="rounded-full cursor-pointer border border-[#c2255c] bg-[#c2255c] text-white shadow-lg transition-all hover:bg-white hover:text-[#c2255c]"
            >
              YESSSSSSS
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default App;
