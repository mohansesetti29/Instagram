import { createContext, useContext, useState } from 'react';

const StoryContext = createContext(null);

export function StoryProvider({ children }) {
  const [activeStory, setActiveStory] = useState(null);
  const [viewedStories, setViewedStories] = useState({});

  const openStory = (userId, storyId) => {
    setActiveStory({ userId, storyId });
  };

  const closeStory = () => {
    setActiveStory(null);
  };

  const markViewed = (userId, storyId) => {
    setViewedStories(prev => ({
      ...prev,
      [`${userId}_${storyId}`]: true,
    }));
  };

  return (
    <StoryContext.Provider value={{ activeStory, openStory, closeStory, viewedStories, markViewed }}>
      {children}
    </StoryContext.Provider>
  );
}

export const useStory = () => useContext(StoryContext);
