export default function StoriesControls({ onPrev, onNext, onPause, onResume }) {
  return (
    <div className="absolute inset-0 flex">
      <div className="w-[30%] h-full z-10" onClick={onPrev} onMouseDown={onPause} onMouseUp={onResume} onTouchStart={onPause} onTouchEnd={onResume} />
      <div className="w-[70%] h-full z-10" onClick={onNext} onMouseDown={onPause} onMouseUp={onResume} onTouchStart={onPause} onTouchEnd={onResume} />
    </div>
  );
}
