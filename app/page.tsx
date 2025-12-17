'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MoodSelector from '@/components/MoodSelector';
import ActivitySelector from '@/components/ActivitySelector';
import MoodHistory from '@/components/MoodHistory';
import MoodBooster from '@/components/MoodBooster';
import ParticleBackground from '@/components/ParticleBackground';

interface MoodEntry {
  id: string;
  mood: string;
  activities: string[];
  timestamp: string;
  date: string;
}

const ACTIVITY_MAP: Record<string, string> = {
  exercise: 'Exercise',
  reading: 'Reading',
  music: 'Music',
  socializing: 'Socializing',
  eating: 'Eating',
  art: 'Art',
  gaming: 'Gaming',
  work: 'Work',
  coffee: 'Coffee Break',
  outdoor: 'Outdoor',
  relaxing: 'Relaxing',
  meditation: 'Meditation',
};

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load entries from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('moodEntries');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setIsSubmitted(false);
    // Track when user changes mood from booster
    if (moodId !== selectedMood) {
      // Reset submitted flag so it doesn't show from previous entry
      setIsSubmitted(false);
    }
  };

  const handleActivityToggle = (activityId: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  const handleSubmit = () => {
    if (!selectedMood) {
      alert('Please select a mood first!');
      return;
    }

    const now = new Date();
    const date = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const timestamp = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      activities: selectedActivities.map((id) => ACTIVITY_MAP[id] || id),
      timestamp,
      date,
    };

    setEntries((prev) => [newEntry, ...prev]);
    setSelectedMood(null);
    setSelectedActivities([]);
    setIsSubmitted(true);

    // Hide success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const clearAllEntries = () => {
    if (confirm('Are you sure you want to clear all mood entries?')) {
      setEntries([]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-3 md:p-6 lg:p-8 relative overflow-hidden"
    >
      <ParticleBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 100 }}
          className="text-center mb-8 md:mb-12 py-6 md:py-10 lg:py-12"
        >
          {/* Decorative top line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-6 md:mb-8"
          />
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-3 md:mb-4 drop-shadow-lg">
            Daily Mood Tracker
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-200 px-3 md:px-4 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Track your emotions and activities to understand your daily patterns
          </motion.p>

          {/* Decorative bottom line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent mt-6 md:mt-8"
          />

          {/* Motivational quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-5 md:mt-7"
          >
            <p className="text-sm md:text-base text-purple-600 dark:text-purple-300 font-semibold italic">
              ✨ Understand yourself better, one mood at a time ✨
            </p>
          </motion.div>
        </motion.div>

        {/* Success Message */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-800 dark:text-green-100 px-4 py-3 rounded-lg mb-6 text-center"
          >
            ✓ Mood entry saved successfully!
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Left Column - Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-2 space-y-4 md:space-y-6 lg:space-y-8"
          >
            {/* Mood Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-lg"
            >
              <MoodSelector
                selectedMood={selectedMood}
                onMoodSelect={handleMoodSelect}
              />
            </motion.div>

            {/* Mood Booster - Shows when user selects Sad */}
            {selectedMood === 'sad' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                <MoodBooster onMoodChange={handleMoodSelect} />
              </motion.div>
            )}

            {/* Activity Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-lg"
            >
              <ActivitySelector
                selectedActivities={selectedActivities}
                onActivityToggle={handleActivityToggle}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              onClick={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-xl text-base md:text-lg transition-all shadow-lg"
            >
              Save Mood Entry
            </motion.button>
          </motion.div>

          {/* Right Column - History */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-lg sticky top-4">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                  Mood History
                </h2>
                {entries.length > 0 && (
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                    {entries.length}
                  </span>
                )}
              </div>

              <div className="max-h-[400px] md:max-h-[600px] overflow-y-auto">
                <MoodHistory entries={entries} onDelete={handleDeleteEntry} />
              </div>

              {entries.length > 0 && (
                <motion.button
                  onClick={clearAllEntries}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-3 md:mt-4 py-2 px-3 md:px-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-xs md:text-sm"
                >
                  Clear All
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
