export const hashtags = [
  { tag: 'travel', postCount: 845000000, relatedTags: ['travelgram', 'wanderlust', 'vacation', 'adventure'], topPosts: [] },
  { tag: 'food', postCount: 523000000, relatedTags: ['foodie', 'foodporn', 'instafood', 'yummy'], topPosts: [] },
  { tag: 'photography', postCount: 678000000, relatedTags: ['photooftheday', 'instaphoto', 'landscape', 'portrait'], topPosts: [] },
  { tag: 'fashion', postCount: 456000000, relatedTags: ['style', 'ootd', 'fashionblogger', 'outfit'], topPosts: [] },
  { tag: 'fitness', postCount: 345000000, relatedTags: ['gym', 'workout', 'health', 'motivation'], topPosts: [] },
  { tag: 'nature', postCount: 567000000, relatedTags: ['landscape', 'earth', 'wildlife', 'forest'], topPosts: [] },
  { tag: 'art', postCount: 432000000, relatedTags: ['artist', 'artwork', 'digitalart', 'painting'], topPosts: [] },
  { tag: 'music', postCount: 321000000, relatedTags: ['musician', 'singer', 'concert', 'band'], topPosts: [] },
  { tag: 'architecture', postCount: 234000000, relatedTags: ['building', 'design', 'modern', 'cityscape'], topPosts: [] },
  { tag: 'decor', postCount: 189000000, relatedTags: ['interiordesign', 'home', 'decoration', 'room'], topPosts: [] },
  { tag: 'sport', postCount: 278000000, relatedTags: ['athlete', 'training', 'competition', 'sports'], topPosts: [] },
  { tag: 'beauty', postCount: 345000000, relatedTags: ['makeup', 'skincare', 'beautytips', 'glow'], topPosts: [] },
];

export const getHashtagByTag = (tag) => hashtags.find(h => h.tag === tag);
