
import type { FunctionComponent } from "../common/types";
import BasicLayout from "../components/layout/Basic";
import MtgCard from '../components/ui/MtgCard'
export const Home = (): FunctionComponent => {

	return (
		<BasicLayout>
			{/* MtgCard section (grows to fill available space) */}
			<div className="flex-1 flex justify-center items-center bg-indigo-900 w-screen relative">
				<MtgCard />
			</div>
		</BasicLayout>

	);
};
