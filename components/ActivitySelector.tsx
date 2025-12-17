'use client';

import { motion } from 'framer-motion';
import {
  Dumbbell,
  Book,
  Music,
  Users,
  Utensils,
  Palette,
  Gamepad2,
  Zap,
  Coffee,
  Sun,
  Moon,
  Wind,
} from 'lucide-react';

interface ActivityOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const ACTIVITIES: ActivityOption[] = [
  { id: 'exercise', name: 'Exercise', icon: <Dumbbell size={32} /> },
  { id: 'reading', name: 'Reading', icon: <Book size={32} /> },
  { id: 'music', name: 'Music', icon: <Music size={32} /> },
  { id: 'socializing', name: 'Socializing', icon: <Users size={32} /> },
  { id: 'eating', name: 'Eating', icon: <Utensils size={32} /> },
  { id: 'art', name: 'Art', icon: <Palette size={32} /> },
  { id: 'gaming', name: 'Gaming', icon: <Gamepad2 size={32} /> },
  { id: 'work', name: 'Work', icon: <Zap size={32} /> },
  { id: 'coffee', name: 'Coffee Break', icon: <Coffee size={32} /> },
  { id: 'outdoor', name: 'Outdoor', icon: <Sun size={32} /> },
  { id: 'relaxing', name: 'Relaxing', icon: <Moon size={32} /> },
  { id: 'meditation', name: 'Meditation', icon: <Wind size={32} /> },
];

interface ActivitySelectorProps {
  selectedActivities: string[];
  onActivityToggle: (activityId: string) => void;
}

export default function ActivitySelector({
  selectedActivities,
  onActivityToggle,
}: ActivitySelectorProps) {
  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-8 text-gray-800 dark:text-white">
        What are you doing?
      </h2>
      <p className="text-center text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
        Select one or more activities
      </p>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
        {ACTIVITIES.map((activity, index) => (
          <motion.button
            key={activity.id}
            onClick={() => onActivityToggle(activity.id)}
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.15 + index * 0.05,
              type: 'spring',
              stiffness: 100,
            }}
            className={`p-2 md:p-4 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 md:gap-2 relative ${
              selectedActivities.includes(activity.id)
                ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-400 dark:hover:border-purple-400'
            }`}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-lg md:text-2xl">{activity.icon}</div>
            <span className="text-xs md:text-sm font-semibold text-center line-clamp-2">
              {activity.name}
            </span>
            {selectedActivities.includes(activity.id) && (
              <motion.div
                className="absolute w-4 md:w-5 h-4 md:h-5 bg-white rounded-full text-green-500 flex items-center justify-center -top-2 -right-2 text-xs font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                ✓
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
