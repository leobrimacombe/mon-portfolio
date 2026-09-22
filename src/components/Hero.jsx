// Empty full-height hero that lets the 3D layer show through, with a scroll hint
// pinned near the bottom.
export const Hero = () => (
  <section className="h-[100svh] w-full flex flex-col justify-end p-8 pb-24 md:pb-32">
    <div className="text-center text-xs font-mono text-gray-500 animate-pulse">V scrollez V</div>
  </section>
);
