import React, { useState } from 'react';
import { Heart, Volume2, VolumeX, CheckCircle, X } from 'lucide-react';

const questions = [
  {
    question:
      'What is your favorite memory of us together, and why does it stand out to you?',
    options: [
      'Our first date – it was such an exciting, special moment.',
      'A spontaneous trip we took – it felt adventurous and fun.',
      'The time we celebrated a big milestone together – I felt so proud of us.',
      "Every day we spend together – it's all meaningful to me.",
    ],
  },
  {
    question:
      'If you could plan a perfect day for just the two of us, what would it look like?',
    options: [
      'A cozy day at home, cooking together and watching movies.',
      'A romantic beach getaway, walking along the shore.',
      'An adventurous day exploring new places or hiking.',
      'A fancy dinner followed by a surprise night out.',
    ],
  },
  {
    question:
      'What small things do I do that make you feel loved and appreciated?',
    options: [
      "When you text me randomly to say you're thinking of me.",
      'When you remember little details about my preferences.',
      'When you take care of things without being asked.',
      'When you hold my hand or give me small gestures of affection.',
    ],
  },
  {
    question: 'What are some goals or dreams you have for our future together?',
    options: [
      'Traveling to new places and creating unforgettable memories.',
      'Building a home together where we can make a life filled with love.',
      "Growing together as individuals and supporting each other's dreams.",
      'Starting a family or making plans for our future commitments.',
    ],
  },
  {
    question:
      'What do you think has been our biggest strength as a couple, and how can we build on it?',
    options: [
      'Our communication – being open with each other.',
      'Our shared sense of humor – we always know how to make each other laugh.',
      "Our support for one another's goals and aspirations.",
      'Our ability to overcome challenges together and come out stronger.',
    ],
  },
];

const memories = [
  {
    url: 'https://i.pinimg.com/originals/2c/bd/7a/2cbd7abe621811bb0f65272e8ffd2d47.jpg',
    date: 'July 07, 2023',
    description:
      "The moment I saw you for the first time, something inside me shifted. It was like everything around us faded, and all I could focus on was you. In that instant, I knew I was falling in love. It wasn't just your smile or the way you carried yourself; it was the feeling that surged through me—warm, undeniable, and real. From that moment, I couldn't imagine a world without you in it.",
  },
  {
    url: 'https://i.pinimg.com/originals/6f/af/6d/6faf6d7972eb8c8e5049edc5b465e67f.jpg',
    date: 'September 07, 2024',
    description:
      'A year had passed, and life had taken us in different directions. But when we met again, it was as if no time had passed at all. Seeing you for the second time, I felt that familiar spark reignite, only stronger. It was like falling in love all over again, but this time, with even more depth and certainty. In that moment, I realized that my feelings for you had never faded—they had only grown with time. It was as if the universe was giving me a second chance to fall in love with you, and I knew I would hold on tighter this time.',
  },
  {
    url: 'https://i.pinimg.com/originals/6f/c9/ce/6fc9ce6feb5067b3cbb6a5c19ddc2de1.jpg',
    date: 'October 02, 2024',
    description:
      "Our first date felt like a dream come true. We spent the entire day together, and from the moment it started, everything just felt right. We laughed over the smallest things, enjoying each other's company as if we had known each other for years. Holding your hand for the first time sent a rush of warmth through me, and it felt so natural, like we were meant to be this close. Later, we watched a movie, but I barely paid attention because being with you was the highlight of my day. Every moment with you felt magical, and I knew this was just the beginning of something beautiful.",
  },
  {
    url: 'https://pbs.twimg.com/media/GMyCuqwbsAAmiui.jpg',
    date: 'October 26, 2024',
    description:
      "Our first trip together was unforgettable. The journey lasted three hours, but with you by my side, it felt like it flew by in just ten minutes. Time seemed to lose its meaning as we talked, laughed, and shared stories. The excitement of traveling with you, experiencing something new together, made everything so effortless and joyful. Every glance, every word, and every smile felt like it was deepening our connection. By the time we reached our destination, I realized it wasn't about where we were going—it was about being with you, and that made every moment priceless.",
  },
];

const noButtonTexts = [
  ['NO', '😢'],
  ['Are you sure?', '😭'],
  ['Really sure?', '💔'],
  ['Think again!', '🥺'],
  ['Last chance!', '😿'],
  ['Surely not?', '😰'],
  ['You might regret this!', '😢'],
  ['Give it another thought!', '😭'],
  ['Are you absolutely sure?', '💔'],
  ['This could be a mistake!', '🥺'],
  ['Have a heart!', '😿'],
];

const feedbackResponses = [
  'Perfect choice! You know me so well! 💖',
  "Aww, that's exactly what I was thinking! 🥰",
  'You understand me completely! 💝',
  "That's such a sweet answer! 💕",
  "You're making my heart flutter! 💓",
  'I love how well you know me! 💗',
  "That's the perfect answer! 🌹",
  "You're so thoughtful! 💘",
  "You always know what's in my heart! 💞",
  'That makes me so happy! 🥰',
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showProposal, setShowProposal] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [noButtonText, setNoButtonText] = useState(noButtonTexts[0][0]);
  const [selectedMemory, setSelectedMemory] = useState<
    (typeof memories)[0] | null
  >(null);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [showEmoji, setShowEmoji] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState('');
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [proposalImage, setProposalImage] = useState(
    'https://c.tenor.com/JXDclK7BkJoAAAAd/tenor.gif'
  );

  const handleAnswer = (selectedIndex: number) => {
    setSelectedAnswers([...selectedAnswers, selectedIndex]);
    setShowFeedback(true);

    const randomResponse =
      feedbackResponses[Math.floor(Math.random() * feedbackResponses.length)];
    setCurrentFeedback(randomResponse);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowProposal(true);
      }
    }, 2000);
  };

  const handleNoHover = () => {
    const buttonWidth = 150;
    const buttonHeight = 60;
    const containerWidth = 400;
    const containerHeight = 300;

    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;

    const minX = screenCenterX - containerWidth / 2;
    const maxX = screenCenterX + containerWidth / 2 - buttonWidth;
    const minY = screenCenterY - containerHeight / 2;
    const maxY = screenCenterY + containerHeight / 2 - buttonHeight;

    const newX = Math.max(
      minX,
      Math.min(Math.random() * (maxX - minX) + minX, maxX)
    );
    const newY = Math.max(
      minY,
      Math.min(Math.random() * (maxY - minY) + minY, maxY)
    );

    setPosition({ x: newX, y: newY });

    const nextTextIndex = (noCount + 1) % noButtonTexts.length;
    setNoButtonText(noButtonTexts[nextTextIndex][0]);
  };

  const handleNoClick = () => {
    setNoCount((count) => count + 1);
    const nextTextIndex = (noCount + 2) % noButtonTexts.length;
    setNoButtonText(noButtonTexts[nextTextIndex][0]);
    setCurrentEmoji(noButtonTexts[nextTextIndex][1]);
    setYesButtonSize((prev) => Math.min(prev + 0.15, 2));

    const sadImages = [
      'https://gifdb.com/images/high/cute-sad-peach-cat-on-floor-ctnvwnkm9ip6dnug.gif',
      'https://c.tenor.com/KkDb5-sgVZkAAAAC/sad-anxious.gif',
      'https://media.tenor.com/Ag1n3k48Q-0AAAAC/sad-peachcat.gif',
      'https://media.tenor.com/Fa3jCXxTWnoAAAAM/sad.gif',
    ];
    setProposalImage(sadImages[noCount % sadImages.length]);

    setShowEmoji(true);
    setTimeout(() => setShowEmoji(false), 1000);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;
    if (audio) {
      isPlaying ? audio.pause() : audio.play();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-purple-100 flex flex-col">
      <audio
        id="bgMusic"
        loop
        autoPlay
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <div className="flex-grow p-4">
        {!showProposal && !showFinal && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8 mt-10 transform hover:scale-[1.02] transition-all">
              <div className="relative">
                <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
                <div className="absolute top-0 right-0 w-full h-2 bg-pink-100 rounded-full overflow-hidden mt-16">
                  <div
                    className="h-full bg-pink-500 transition-all duration-500"
                    style={{
                      width: `${
                        ((currentQuestion + 1) / questions.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="w-full h-48 mb-8 mt-12 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="https://www.icegif.com/wp-content/uploads/icegif-3795.gif"
                  alt="Decorative"
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>

              <p className="text-xl mb-6 text-gray-700">
                {questions[currentQuestion].question}
              </p>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-lg transition-all transform hover:scale-[1.02] ${
                      showFeedback
                        ? index === questions[currentQuestion].correctIndex
                          ? 'bg-green-100 border-2 border-green-500'
                          : selectedAnswers[currentQuestion] === index
                          ? 'bg-pink-100 border-2 border-pink-500'
                          : 'bg-gray-50'
                        : 'bg-white border-2 border-pink-200 hover:border-pink-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="flex-grow">{option}</span>
                      {showFeedback &&
                        index === questions[currentQuestion].correctIndex && (
                          <CheckCircle className="text-green-500 ml-2" />
                        )}
                    </div>
                  </button>
                ))}
              </div>
              {showFeedback && (
                <div className="mt-4 text-center text-lg font-medium text-pink-600 animate-fade-in">
                  {currentFeedback}
                </div>
              )}
            </div>
          </div>
        )}

        {showProposal && !showFinal && (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="bg-white p-10 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all">
              <h1 className="text-5xl font-bold text-pink-600 mb-8 text-center">
                Will you be my Valentine?
              </h1>

              <div className="w-full h-64 mb-8 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={proposalImage}
                  alt="Proposal"
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                  onMouseEnter={() =>
                    setProposalImage(
                      'https://media.tenor.com/LRDMe1QpqFYAAAAC/cat-cute.gif'
                    )
                  }
                />
              </div>

              <div className="flex justify-center gap-6 relative">
                <button
                  onClick={() => {
                    setProposalImage(
                      'https://media.tenor.com/images/7c5d459025243b3f5626e85a022e381a/tenor.gif'
                    );
                    setTimeout(() => setShowFinal(true), 1500);
                  }}
                  style={{ transform: `scale(${yesButtonSize})` }}
                  className="px-12 py-6 bg-pink-500 text-white text-xl rounded-lg hover:bg-pink-600 transition-all shadow-lg hover:shadow-xl"
                >
                  Yes 💖
                </button>
                <div className="relative">
                  <button
                    onClick={handleNoClick}
                    className="px-12 py-6 bg-gray-500 text-white text-xl rounded-lg hover:bg-gray-600 transition-colors shadow-lg"
                  >
                    {noButtonTexts[noCount % noButtonTexts.length][0]}
                  </button>
                  {showEmoji && (
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">
                      {currentEmoji}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {showFinal && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden">
            <div className="text-center max-w-3xl mx-auto bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-2xl z-10">
              <h1 className="text-5xl font-bold text-pink-600 mb-8">
                Thank you, my love! ❤️
              </h1>

              <div className="w-full h-64 mb-8 rounded-lg overflow-hidden">
                <img
                  src="https://c.tenor.com/jvB-w4_GIk8AAAAC/happy-cute.gif"
                  alt="Decorative"
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>

              <p className="text-xl mb-12 text-gray-700 leading-relaxed">
                Happy Valentine's Day, my love! 💖 You light up my world like no
                one else can 🌟. Every moment with you feels magical ✨. I am so
                grateful to have you by my side, today and always 💑. You are my
                everything, and I can't wait for all the beautiful memories we
                will create together 💕. I love you more than words can say 😘❤️
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {memories.map((memory, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedMemory(memory)}
                    className="relative overflow-hidden rounded-xl aspect-square shadow-lg group"
                  >
                    <img
                      src={memory.url}
                      alt={`Memory ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
            {[...Array(30)].map((_, i) => (
              <Heart
                key={i}
                className="absolute animate-bounce text-pink-500"
                style={{
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 100}vh`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                  opacity: 0.6 + Math.random() * 0.4,
                  transform: `scale(${0.5 + Math.random()})`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {selectedMemory && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              >
                <X size={24} />
              </button>
              <img
                src={selectedMemory.url}
                alt="Memory"
                className="w-full h-[50vh] object-contain bg-black"
              />
            </div>
            <div className="p-8">
              <p className="text-lg font-semibold text-pink-600 mb-4">
                {selectedMemory.date}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {selectedMemory.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 mt-auto">
        <a
          href="https://www.instagram.com/_madhav.chaturvedi_/"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-pink-600 hover:bg-white hover:text-pink-700 transition-all shadow-lg hover:shadow-xl mx-auto max-w-fit"
        >
          Made with ❤️ By Madhav Chaturvedi
        </a>
      </div>
    </div>
  );
}

export default App;
