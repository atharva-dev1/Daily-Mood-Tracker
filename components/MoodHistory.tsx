'use client';

import { motion } from 'framer-motion';
import { Smile, Frown, Meh, Heart, Angry, Eye, Trash2 } from 'lucide-react';

interface MoodEntry {
  id: string;
  mood: string;
  activities: string[];
  timestamp: string;
  date: string;
}

const MOOD_ICONS: Record<string, React.ReactNode> = {
  happy: <Smile size={24} className="text-yellow-500" />,
  sad: <Frown size={24} className="text-blue-500" />,
  neutral: <Meh size={24} className="text-gray-500" />,
  loved: <Heart size={24} className="text-red-500" />,
  angry: <Angry size={24} className="text-red-700" />,
  tired: <Eye size={24} className="text-purple-600" />,
};

const MOOD_LABELS: Record<string, string> = {
  happy: 'Happy',
  sad: 'Sad',
  neutral: 'Neutral',
  loved: 'Loved',
  angry: 'Angry',
  tired: 'Tired',
};

interface MoodHistoryProps {
  entries: MoodEntry[];
  onDelete: (id: string) => void;
}

export default function MoodHistory({ entries, onDelete }: MoodHistoryProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No mood entries yet. Start tracking your mood!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Your Mood History
      </h2>
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-start justify-between"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="mt-1">{MOOD_ICONS[entry.mood]}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {MOOD_LABELS[entry.mood]}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {entry.date}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {entry.timestamp}
                  </span>
                </div>
                {entry.activities.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {entry.activities.map((activity) => (
                      <span
                        key={activity}
                        className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 text-xs px-2 py-1 rounded-full"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(entry.id)}
              className="ml-4 p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
              title="Delete entry"
            >
              <Trash2 size={20} className="text-red-500" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
