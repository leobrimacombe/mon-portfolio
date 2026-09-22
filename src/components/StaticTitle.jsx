// Static 2D fallback for the 3D hero, shown when the 3D scene is turned off
// (performance mode). Fixed behind the content, mirroring the 3D layout: white
// "PORTFOLIO" over a neon-blue "LEO BRIMACOMBE".
export const StaticTitle = () => (
  <div className="fixed inset-0 z-0 flex flex-col items-center justify-center pointer-events-none px-4 select-none">
    <h1 className="font-sync font-black text-white text-center leading-none text-[clamp(2rem,11vw,7rem)]">
      PORTFOLIO
    </h1>
    <p
      className="font-sync font-black text-center leading-none text-[clamp(1.5rem,8.5vw,5.5rem)] mt-2"
      style={{ color: 'rgb(0, 76, 241)', textShadow: '0 0 22px rgba(0, 76, 241, 0.55)' }}
    >
      LEO BRIMACOMBE
    </p>
  </div>
);
