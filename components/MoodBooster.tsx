'use client';

import { motion } from 'framer-motion';
import { Laugh, Lightbulb, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const JOKES = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "What do you call a fake noodle? An impasta!",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "What do you call a bear with no teeth? A gummy bear!",
  "Why don't eggs tell jokes? They'd crack each other up!",
  "What did the ocean say to the beach? Nothing, it just waved!",
  "Why did the coffee file a police report? It got mugged!",
  "What do you call a dinosaur that is noisy? Dino-snore!",
  "Why is no one friends with Dracula? Because he's a pain in the neck!",
  "What did one wall say to the other? I'll meet you at the corner!",
  "Why did the math book look sad? Because it had too many problems!",
  "What do you call a sleeping bull? A dozer!",
  "Why did the cookie go to the hospital? Because it felt crumbly!",
  "What do you call a pig that does karate? A pork chop!",
  "Why did the student do multiplication in the garden? Because they wanted to grow their roots!",
];

const QUOTES = [
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    text: "Your time is limited, do not waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Do not let yesterday take up too much of today.",
    author: "Will Rogers",
  },
  {
    text: "You learn more from failure than from success.",
    author: "Unknown",
  },
  {
    text: "It is not whether you get knocked down, it is whether you get up.",
    author: "Vince Lombardi",
  },
  {
    text: "Life is what happens when you are busy making other plans.",
    author: "John Lennon",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "It is never too late to be what you might have been.",
    author: "George Eliot",
  },
];

interface MoodBoosterProps {
  onMoodChange: (newMood: string) => void;
}

export default function MoodBooster({ onMoodChange }: MoodBoosterProps) {
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'jokes' | 'quotes'>('jokes');

  const nextJoke = () => {
    setCurrentJokeIndex((prev) => (prev + 1) % JOKES.length);
  };

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-lg border-2 border-purple-300 dark:border-purple-700"
    >
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Laugh className="text-purple-600 dark:text-purple-300" size={28} />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Mood Booster
        </h2>
      </div>

      <p className="text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-300 mb-4 md:mb-6">
        Need a lift? Read some jokes and inspiring quotes! 🌟
      </p>

      {/* Tab Toggle */}
      <div className="flex gap-2 md:gap-3 mb-4 md:mb-6">
        <motion.button
          onClick={() => setActiveTab('jokes')}
          className={`flex-1 py-2 md:py-3 px-2 md:px-4 rounded-xl font-semibold transition-all text-xs md:text-sm ${
            activeTab === 'jokes'
              ? 'bg-purple-500 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          😄 Jokes
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('quotes')}
          className={`flex-1 py-2 md:py-3 px-2 md:px-4 rounded-xl font-semibold transition-all text-xs md:text-sm ${
            activeTab === 'quotes'
              ? 'bg-purple-500 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Lightbulb size={16} className="inline mr-1 md:mr-2" />
          Quotes
        </motion.button>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 md:mb-6"
      >
        {activeTab === 'jokes' ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 min-h-[100px] md:min-h-[120px] flex flex-col justify-center">
            <p className="text-base md:text-lg lg:text-xl text-gray-800 dark:text-white font-medium mb-3 md:mb-4 leading-relaxed">
              {JOKES[currentJokeIndex]}
            </p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Joke {currentJokeIndex + 1} of {JOKES.length}
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 min-h-[100px] md:min-h-[120px] flex flex-col justify-center">
            <p className="text-base md:text-lg text-gray-800 dark:text-white font-medium mb-3 md:mb-4 leading-relaxed italic">
              {`"${QUOTES[currentQuoteIndex].text}"`}
            </p>
            <p className="text-xs md:text-sm text-purple-600 dark:text-purple-300 font-semibold">
              {`— ${QUOTES[currentQuoteIndex].author}`}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Quote {currentQuoteIndex + 1} of {QUOTES.length}
            </p>
          </div>
        )}
      </motion.div>

      {/* Next Button */}
      <motion.button
        onClick={activeTab === 'jokes' ? nextJoke : nextQuote}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 md:py-3 px-3 md:px-4 rounded-xl transition-all flex items-center justify-center gap-2 mb-3 md:mb-4 shadow-lg text-sm md:text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Next {activeTab === 'jokes' ? 'Joke' : 'Quote'}
        <ChevronRight size={18} />
      </motion.button>

      {/* Mood Change Prompt */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-3 md:p-4 mb-4">
        <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-2 md:mb-3 font-semibold">
          Feeling better? Update your mood! 🚀
        </p>
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          <motion.button
            onClick={() => onMoodChange('happy')}
            className="py-2 px-2 md:px-3 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg font-bold transition-all text-xs md:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            😊 Happy
          </motion.button>
          <motion.button
            onClick={() => onMoodChange('neutral')}
            className="py-2 px-2 md:px-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-bold transition-all text-xs md:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            😐 Neutral
          </motion.button>
          <motion.button
            onClick={() => onMoodChange('loved')}
            className="py-2 px-2 md:px-3 bg-red-400 hover:bg-red-500 text-white rounded-lg font-bold transition-all text-xs md:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ❤️ Loved
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
