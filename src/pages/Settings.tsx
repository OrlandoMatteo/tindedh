import type { FunctionComponent } from "../common/types";
import ColorFilter from "../components/ui/ColorFilter.tsx";
import ManaCostFilter from "../components/ui/ManaCostFilter.tsx";
import BasicLayout from "../components/layout/Basic.tsx";
export const Settings = (): FunctionComponent => {

	return (
		<BasicLayout>

            <div className="relative flex-1 min-h-0 overflow-y-auto bg-indigo-900 dark:bg-slate-900 w-full">
				<div className="mx-auto grid w-full max-w-5xl gap-6 px-5 py-6 md:grid-cols-2">
					<ColorFilter />
					<ManaCostFilter />
				</div>
			</div>
		</BasicLayout >
	);
};
