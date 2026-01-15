function FilterCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
      <div className="w-full rounded-2xl bg-gradient-to-br from-amber-50/95 via-orange-50/90 to-rose-50/85 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.6)] ring-1 ring-white/50 backdrop-blur-sm dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-800/90 dark:ring-white/10">
        <div className="flex items-center justify-between px-5 pt-4">
          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Filter</div>
          <div className="rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white shadow-sm dark:bg-slate-100 dark:text-slate-900">{title}</div>
        </div>
        <div className="px-5 pb-5 pt-4">
          {children}
        </div>
      </div>
  );
}

export default FilterCard;
