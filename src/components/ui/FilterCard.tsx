function FilterCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
      <div className="p-2 bg-white bg-opacity-20 shadow-md rounded-md inline-block m-4">
        <div className="px-3 font-bold text-xl pb-4">{title}</div>
        {children}
      </div>
  );
}

export default FilterCard;