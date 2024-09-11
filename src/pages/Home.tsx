
import type { FunctionComponent } from "../common/types";
import MtgCard from '../components/ui/MtgCard'
import Menu from '../components/ui/Menu.tsx'
export const Home = (): FunctionComponent => {

	return (
		<div className=" flex justify-center items-center bg-indigo-900 m-2 ">
			<MtgCard></MtgCard>
			<Menu></Menu>
		</div>
	);
};
