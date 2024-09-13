import type { FunctionComponent } from "../common/types";
import ColorFilter from "../components/ui/ColorFilter.tsx";
import ManaCostFilter from "../components/ui/ManaCostFilter.tsx";
import BasicLayout from "../components/layout/Basic.tsx";
export const Settings = (): FunctionComponent => {

	return (
		<BasicLayout>
			
		<div className=" grid grid-rows-2 w-screen ">
			<ColorFilter />
			<ManaCostFilter />
			</div>
		</BasicLayout>
	);
};

