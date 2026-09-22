const MARQUEE_TEXT = "REACT • JS • DESIGN • INTERACTION • LARAVEL • SYMFONY • HTML • CSS • NEXT.JS • UX/UI • PHP • ";

// Infinite horizontal scrolling band of keywords (CSS `animate-marquee`); the text
// is repeated twice so the loop reads as seamless.
export const Marquee = () => (
  <div className="bg-blue-600 text-black py-2 overflow-hidden w-full">
    <div className="flex animate-marquee whitespace-nowrap">
      <span className="text-2xl md:text-4xl font-black font-sync mx-4">{MARQUEE_TEXT.repeat(6)}</span>
      <span className="text-2xl md:text-4xl font-black font-sync mx-4">{MARQUEE_TEXT.repeat(6)}</span>
    </div>
  </div>
);
