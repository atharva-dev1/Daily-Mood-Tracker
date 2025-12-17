'use client';

import { motion } from 'framer-motion';
import { Smile, Frown, Heart, Meh, Angry, Eye } from 'lucide-react';

interface MoodOption {
  id: string;
  name: string;
  emoji: React.ReactNode;
  color: string;
}

const MOODS: MoodOption[] = [
  {
    id: 'happy',
    name: 'Happy',
    emoji: <Smile size={48} />,
    color: 'from-yellow-400 to-orange-400',
  },
  {
    id: 'sad',
    name: 'Sad',
    emoji: <Frown size={48} />,
    color: 'from-blue-400 to-indigo-400',
  },
  {
    id: 'neutral',
    name: 'Neutral',
    emoji: <Meh size={48} />,
    color: 'from-gray-400 to-slate-400',
  },
  {
    id: 'loved',
    name: 'Loved',
    emoji: <Heart size={48} />,
    color: 'from-red-400 to-pink-400',
  },
  {
    id: 'angry',
    name: 'Angry',
    emoji: <Angry size={48} />,
    color: 'from-red-600 to-orange-600',
  },
  {
    id: 'tired',
    name: 'Tired',
    emoji: <Eye size={48} />,
    color: 'from-purple-400 to-indigo-500',
  },
];

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (moodId: string) => void;
}

export default function MoodSelector({
  selectedMood,
  onMoodSelect,
}: MoodSelectorProps) {
  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-8 text-gray-800 dark:text-white">
        How are you feeling today?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 lg:gap-6">
        {MOODS.map((mood, index) => (
          <motion.button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.1 + index * 0.08,
              type: 'spring',
              stiffness: 120,
            }}
            className={`relative p-3 md:p-4 lg:p-6 rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 md:gap-3 ${
              selectedMood === mood.id
                ? `bg-gradient-to-br ${mood.color} shadow-lg scale-105`
                : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`text-lg md:text-2xl lg:text-5xl ${
                selectedMood === mood.id ? 'text-white' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {mood.emoji}
            </div>
            <span
              className={`font-semibold text-xs md:text-sm ${
                selectedMood === mood.id ? 'text-white' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {mood.name}
            </span>
            {selectedMood === mood.id && (
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-white"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
