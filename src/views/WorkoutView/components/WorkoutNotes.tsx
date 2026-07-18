export default function WorkoutNotes() {
  return (
    <div
      className="w-full h-fit module-wrapper"
      //   style={{
      //     borderTop: '4px solid var(--accent-primary)',
      //   }}
    >
      <p className="text-white/80 font-bold text-xs mb-2">NOTES</p>
      <textarea
        placeholder="Add notes about this workout..."
        className="w-full h-[100px] bg-[var(--dark-two)] border-2 border-[var(--contrast-one)] rounded-md p-2 text-white resize-none"
      />
    </div>
  );
}
