export default function GradientBorder({ children, className = '' }) {
  return (
    <div className={`story-gradient p-[2px] rounded-full ${className}`}>
      <div className="bg-white dark:bg-black rounded-full p-[2px]">
        {children}
      </div>
    </div>
  );
}
