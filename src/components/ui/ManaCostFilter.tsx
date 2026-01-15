import Card from "./FilterCard";
import { useManaCostStore,ManaCostState } from "../../store/manacostState"


// const demoAGraphData = [
//   {
//     key: 0,
//     path: "M7 95H5C2.23858 95 0 97.2386 0 100H12C12 97.2386 9.76142 95 7 95Z",
//   },
//   {
//     key: 1,
//     path: "M27 100V97C27 93.6863 24.3137 91 21 91C17.6863 91 15 93.6863 15 97V100H27Z",
//   },
//   {
//     key: 2,
//     path: "M42 100V92C42 88.6863 39.3137 86 36 86C32.6863 86 30 88.6863 30 92V100H42Z",
//   },
//   {
//     key: 3,
//     path: "M57 100V87C57 83.6863 54.3137 81 51 81C47.6863 81 45 83.6863 45 87V100H57Z",
//   },
//   {
//     key: 4,
//     path: "M72 100V82C72 78.6863 69.3137 76 66 76C62.6863 76 60 78.6863 60 82V100H72Z",
//   },
//   {
//     key: 5,
//     path: "M87 100V78C87 74.6863 84.3137 72 81 72C77.6863 72 75 74.6863 75 78V100H87Z",
//   },
//   {
//     key: 6,
//     path: "M102 100V73C102 69.6863 99.3137 67 96 67C92.6863 67 90 69.6863 90 73V100H102Z",
//   },
//   {
//     key: 7,
//     path: "M117 100V68C117 64.6863 114.314 62 111 62C107.686 62 105 64.6863 105 68V100H117Z",
//   },
//   {
//     key: 8,
//     path: "M132 100V63C132 59.6863 129.314 57 126 57C122.686 57 120 59.6863 120 63V100H132Z",
//   },
//   {
//     key: 9,
//     path: "M147 100V59C147 55.6863 144.314 53 141 53C137.686 53 135 55.6863 135 59V100H147Z",
//   },
//   {
//     key: 10,
//     path: "M162 100V54C162 50.6863 159.314 48 156 48C152.686 48 150 50.6863 150 54V100H162Z",
//   },
//   {
//     key: 11,
//     path: "M177 100V49C177 45.6863 174.314 43 171 43C167.686 43 165 45.6863 165 49V100H177Z",
//   },
//   {
//     key: 12,
//     path: "M192 100V44C192 40.6863 189.314 38 186 38C182.686 38 180 40.6863 180 44V100H192Z",
//   },
//   {
//     key: 13,
//     path: "M207 100V40C207 36.6863 204.314 34 201 34C197.686 34 195 36.6863 195 40V100H207Z",
//   },
//   {
//     key: 14,
//     path: "M222 100V35C222 31.6863 219.314 29 216 29C212.686 29 210 31.6863 210 35V100H222Z",
//   },
//   {
//     key: 15,
//     path: "M237 100V30C237 26.6863 234.314 24 231 24C227.686 24 225 26.6863 225 30V100H237Z",
//   },
// ];


// function DemoAGraph({ value }: { value: number }) {
//   return (
//     <div className="m-auto">
//       <svg
//         className=""
//         height="100"
//         fill="none"
//         viewBox="0 0 250 100"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <g id="background">
//           {demoAGraphData.map(({ key, path }) => (
//             <path d={path} fill="#DCDCDD" key={key} />
//           ))}
//         </g>
//         <g id="foreground" clipPath="url(#highlight)">
//           {demoAGraphData.map(({ key, path }) => (
//             <path d={path} fill="#F5B728" key={key} />
//           ))}
//         </g>
//         <defs>
//           <clipPath id="highlight">
//             <rect width={value * 18.75} height="100" fill="white" />
//           </clipPath>
//         </defs>
//       </svg>
//     </div>
//   );
// }

function ManaCostFilter() {
  const manaCostFilter = useManaCostStore((state:ManaCostState) => state.cost)
  const updateManaCostState = useManaCostStore((state:ManaCostState) => state.update)
  const sliderPercent = (manaCostFilter / 16) * 100;
  const bubbleLeft = Math.min(95, Math.max(5, sliderPercent));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, Math.min(16, parseInt(event.target.value, 10)));
    updateManaCostState(newValue);
  };

  return (
    <Card title="Mana Cost Filter">
      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
        <span>Max mana value</span>
        <div className="flex items-center gap-2 rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white shadow-sm dark:bg-slate-100 dark:text-slate-900">
          <span>{manaCostFilter}</span>
          <img src={`https://svgs.scryfall.io/card-symbols/${manaCostFilter}.svg`} alt={`Mana value ${manaCostFilter}`} className="h-4 w-4" />
        </div>
      </div>
      <div className="relative mt-6 px-2 pb-8 pt-6">
        <div
          className="absolute -top-1 rounded-full bg-slate-900/90 px-2 py-0.5 text-xs font-semibold text-white shadow-sm dark:bg-slate-100 dark:text-slate-900"
          style={{
            left: `${bubbleLeft}%`,
            transform: "translateX(-50%)",
          }}
        >
          {manaCostFilter}
        </div>
        <div
          className="absolute left-2 right-2 top-1/2 h-2 -translate-y-1/2 rounded-full bg-white/80 shadow-inner dark:bg-slate-800"
        ></div>
        <div
          className="absolute left-2 top-1/2 h-2 -translate-y-1/2 rounded-full bg-amber-400 dark:bg-amber-300"
          style={{
            right: `calc(100% - ${sliderPercent}%)`,
          }}
        ></div>
        <div
          className="absolute top-1/2 grid h-6 w-6 place-items-center"
          style={{
            left: `${bubbleLeft}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="grid h-6 w-6 place-items-center rounded-full bg-white shadow-md dark:bg-slate-100">
            <div
              className="h-3 w-3 rounded-full bg-slate-900 dark:bg-slate-900"
              style={{
                boxShadow: "0 0 0 4px rgba(251, 191, 36, 0.35)",
              }}
            />
          </div>
        </div>
        <input
          type="range"
          className="absolute w-full h-full opacity-0"
          id="demoAInput"
          name="demoAInput"
          min={0}
          max={16}
          step={1}
          value={manaCostFilter}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>0</span>
        <span>16+</span>
      </div>
    </Card>
  );
}
export default ManaCostFilter;
