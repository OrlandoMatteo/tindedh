
import type { FunctionComponent } from "../common/types";
import BasicLayout from "../components/layout/Basic";
import MtgCard from '../components/ui/MtgCard'
export const Home = (): FunctionComponent => {

	return (
		<BasicLayout>
			{/* MtgCard section (grows to fill available space) */}
			<div className="flex flex-1 items-center justify-center bg-indigo-900 dark:bg-slate-900 w-full relative">
				<MtgCard />
			</div>
		</BasicLayout>

	);
};
