import ThemeToggler from "@/ui/ThemeToggler";

function DashboardHeader() {
  return (
    <header className="bg-card flex h-19 items-center justify-between">
      <div />
      <input
        type="search"
        className="bg-input text-ink rounded-7 h-11 w-72.5 px-5 font-medium"
        placeholder="Search anything..."
      />
      <div className="pr-5">
        <ThemeToggler />
      </div>
    </header>
  );
}

export default DashboardHeader;
