
import type { FunctionComponent } from "../common/types";
import MtgCard from '../components/ui/MtgCard'
export const Home = (): FunctionComponent => {

	return (
		<div className=" flex justify-center items-center bg-indigo-900 ">
			<MtgCard></MtgCard>
		</div>
	);
};
