import octomMark from "@/assets/octom-mark.svg";

function Logo({ dir = "row" }: { dir?: "row" | "col" }) {
  return (
    <div
      className={`flex items-center gap-3 focus-visible:outline-none ${dir === "row" ? "flex-row" : "flex-col"}`}
    >
      <img src={octomMark} alt="" className="h-9 w-8" />
      <span className="text-ink font-bold">OCTOM.</span>
    </div>
  );
}

export default Logo;
