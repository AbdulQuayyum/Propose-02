import { useMemo, useState } from "react";
import IMAGE1 from './Assets/01.png';
import IMAGE2 from './Assets/02.JPEG';
import IMAGE3 from './Assets/03.png';
import ASK from './Assets/ASK.gif';

const FloatingIcons = ({ visible }) => {
  const icons = ['❤️', '💖', '✨', '🌸', '💕', '🌹', '💌'];
  const randomIcons = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      char: icons[Math.floor(Math.random() * icons.length)],
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 5 + Math.random() * 10,
      size: 1 + Math.random() * 1.5,
    }));
  }, []);

  return (
    <div className={`bg-icons ${visible ? 'visible' : ''}`}>
      {randomIcons.map((icon, i) => (
        <span key={i} className="floating-icon" style={{
          left: `${icon.left}%`,
          animationDelay: `${icon.delay}s`,
          animationDuration: `${icon.duration}s`,
          fontSize: `${icon.size}rem`
        }}>
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

  // State for the "sliding" position of the small Yes button
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const yesssssButtonSize = yesCount * 5 + 16;

  const handleYesClick = () => {
    setYesCount(yesCount + 1);
    moveButton();
  };

  // This function makes the button slide away on hover
  const moveButton = () => {
    const randomX = Math.random() * 200 * (Math.random() > 0.5 ? 1 : -1);
    const randomY = Math.random() * 200 * (Math.random() > 0.5 ? 1 : -1);
    setNoButtonPos({ x: randomX, y: randomY });
  };

  const handleYesssssClick = () => {
    setShowEnvelope(true);
    setTimeout(() => setEnvelopeOpened(true), 100);
    setTimeout(() => setCardsSettled(true), 3200);
  };

  const handleTryAgain = () => {
    setYesCount(0);
    setNoButtonPos({ x: 0, y: 0 });
  };

  const handleCardClick = () => {
    setCurrentCard((prev) => (prev < 3 ? prev + 1 : 0));
  };

  const getYesButtonText = () => {
    const phrases = ["seriously", "are you sure", "give it another thought?"];
    return phrases[Math.min(yesCount - 1, phrases.length - 1)];
  };

  const cards = [
    {
      type: 'letter',
      content: (
        <div className="mt-4 letter-content">
          <p className="letter-title">You just made me the happiest person! 🎉💕</p>
          <p className="letter-text">I knew you’d say yesssss! You mean the world to me.</p>
          <p className="letter-text">I love you head to toe, inside and out. I love you for all that you are.</p>
          <p className="letter-text">I can’t wait to spend this Valentine with you.</p>
          <p className="letter-text">You make everyday special and I’m so grateful to have you in my life. </p>
          <p className="letter-text">Here’s to us and all the beautiful moments we’ll share together! 💖</p>
          <p className="letter-text">You’re sooooo beautiful my love 😻</p>
          <p className="tap-hint">Tap to see more ✨</p>
        </div>
      )
    },
    { type: 'image', content: <img src={IMAGE1} alt="Memory 1" className="card-image" /> },
    { type: 'image', content: <img src={IMAGE2} alt="Memory 2" className="card-image" /> },
    { type: 'image', content: <img src={IMAGE3} alt="Memory 3" className="card-image" /> }
  ];

  const getCardPosition = (index) => {
    const diff = (index - currentCard + 4) % 4;
    return {
      zIndex: 20 - diff,
      translateY: diff === 0 ? 0 : diff * 8,
      scale: 1 - diff * 0.03,
      opacity: 1
    };
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
                  <div key={index} className="card"
                    style={{
                      zIndex: pos.zIndex,
                      transform: `translateY(${pos.translateY}px) scale(${pos.scale})`,
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
            <p className="reset-hint">Tap cards to see more! ✨</p>
          )}
        </div>
      ) : yesCount >= 4 ? (
        <div className="special-message-container">
          <div className="max-w-md mx-4 text-center">
            <p className="mb-6 text-3xl md:text-4xl">Oh... 😥</p>
            <p className="mb-4 text-lg md:text-xl">    Wait, I thought you'd be more excited about this! Maybe you didn't mean to click that one?
              Perhaps you want to reconsider... 😊</p>
            <button onClick={handleTryAgain} style={{ backgroundColor: '#8D262F' }} className="px-12 py-3 mt-6 text-white rounded-full">
              Let me try again!
            </button>
          </div>
        </div>
      ) : (
        <>
          <img style={{ width: "400px", height: "240px" }} src={ASK} alt="Valentine" />
          <h1 className="px-4 my-4 text-2xl text-center md:text-4xl">Aduke, <br /> Will You Be My Valentine?</h1>
          <div className="relative flex flex-wrap items-center justify-center w-full h-32 gap-6 px-4 mb-8 text-center">
            <button
              onMouseEnter={moveButton}
              onClick={handleYesClick}
              style={{
                backgroundColor: '#EE8778',
                borderColor: '#EE8778',
                transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                position: 'relative',
                zIndex: 10
              }}
              className="flex items-center px-12 py-3 text-white border rounded-full cursor-pointer"
            >
              {yesCount === 0 ? "Yes" : getYesButtonText()}
            </button>
            <button
              onClick={handleYesssssClick}
              style={{
                fontSize: `${yesssssButtonSize}px`,
                padding: `${yesssssButtonSize * 0.4}px ${yesssssButtonSize * 1}px`,
                backgroundColor: '#EC3430',
                borderColor: '#EC3430'
              }}
              className="text-white border rounded-full shadow-lg cursor-pointer"
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
