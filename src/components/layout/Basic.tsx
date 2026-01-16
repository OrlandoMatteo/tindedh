import Menu from '../ui/Menu.tsx'
import TopBar from "../ui/TopBar.tsx";
function BasicLayout({ children }: { children: React.ReactNode }) {
    return(
		<div className="relative h-[100svh] overflow-hidden">
			{/* TopBar section */}
			<div className="fixed left-0 right-0 top-0 z-0 h-[calc(max(12dvh,64px)+env(safe-area-inset-top))]">
				<TopBar />
			</div>
			{/* Page content */}
			<div className="box-border flex h-[100svh] flex-col overflow-y-auto pt-[calc(max(12dvh,64px)+env(safe-area-inset-top))] pb-[calc(max(10dvh,56px)+env(safe-area-inset-bottom))]">
				{children}
			</div>
			{/* Menu section */}
			<div className="fixed bottom-0 left-0 right-0 z-0 h-[calc(max(10dvh,56px)+env(safe-area-inset-bottom))]">
				<Menu />
			</div>
        </div>
    );
}

export default BasicLayout;
