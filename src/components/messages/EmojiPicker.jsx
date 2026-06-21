import { useState } from 'react';

const emojis = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','🥰','😘','😗','😙','😚','🙂','🤗','🤩','🤔','🤨','😐','😑','😶','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🙃','🤑','😲','☹️','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😰','😱','🥵','🥶','😳','🤪','😵','😡','😠','🤬','👋','🤚','🖐','✋','🖖','👌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','🖕','👇','👍','👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','✍️','💅','🤳','💪','🦵','🦶','👂','🦻','👃','🧠','🦷','👀','👅','👄'];

export default function EmojiPicker({ onSelect }) {
  const [activeCategory, setActiveCategory] = useState('smileys');

  return (
    <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 w-72">
      <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
        {emojis.map((emoji, i) => (
          <button
            key={i}
            onClick={() => onSelect(emoji)}
            className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded p-1 text-lg"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
