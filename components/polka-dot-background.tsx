export function PolkaDotBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Large scattered dots - Pink (6%) */}
      <div className="absolute top-[8%] left-[5%] w-3 h-3 rounded-full bg-[#FFBCC6] opacity-60" />
      <div className="absolute top-[15%] right-[12%] w-4 h-4 rounded-full bg-[#FFBCC6] opacity-50" />
      <div className="absolute top-[12%] left-[45%] w-2 h-2 rounded-full bg-[#FFBCC6] opacity-70" />
      <div className="absolute top-[45%] left-[8%] w-4 h-4 rounded-full bg-[#FFBCC6] opacity-40" />
      <div className="absolute top-[65%] left-[12%] w-2 h-2 rounded-full bg-[#FFBCC6] opacity-60" />
      <div className="absolute top-[85%] left-[25%] w-3 h-3 rounded-full bg-[#FFBCC6] opacity-50" />
      <div className="absolute top-[78%] right-[5%] w-2 h-2 rounded-full bg-[#FFBCC6] opacity-70" />
      <div className="absolute bottom-[8%] right-[30%] w-2.5 h-2.5 rounded-full bg-[#FFBCC6] opacity-60" />
      <div className="absolute bottom-[25%] right-[10%] w-2.5 h-2.5 rounded-full bg-[#FFBCC6] opacity-50" />
      
      {/* Silver dots - Quick Silver (30% ratio but subtle) */}
      <div className="absolute top-[25%] left-[18%] w-2.5 h-2.5 rounded-full bg-[#E7E7E5]" />
      <div className="absolute top-[35%] right-[8%] w-3 h-3 rounded-full bg-[#E7E7E5]" />
      <div className="absolute top-[55%] right-[15%] w-2.5 h-2.5 rounded-full bg-[#E7E7E5]" />
      <div className="absolute top-[75%] right-[20%] w-3.5 h-3.5 rounded-full bg-[#E7E7E5]" />
      <div className="absolute bottom-[15%] left-[5%] w-3.5 h-3.5 rounded-full bg-[#E7E7E5]" />
      <div className="absolute top-[40%] left-[3%] w-2 h-2 rounded-full bg-[#E7E7E5]" />
      <div className="absolute top-[20%] right-[3%] w-3 h-3 rounded-full bg-[#E7E7E5]" />
      
      {/* Tiny green accent dots - Green Pea (4%) */}
      <div className="absolute top-[5%] right-[25%] w-1.5 h-1.5 rounded-full bg-[#729C80] opacity-40" />
      <div className="absolute top-[60%] left-[4%] w-1.5 h-1.5 rounded-full bg-[#729C80] opacity-30" />
      <div className="absolute bottom-[35%] right-[4%] w-1.5 h-1.5 rounded-full bg-[#729C80] opacity-40" />
    </div>
  )
}
