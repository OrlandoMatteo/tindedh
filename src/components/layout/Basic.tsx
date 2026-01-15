import Menu from '../ui/Menu.tsx'
import TopBar from "../ui/TopBar.tsx";
function BasicLayout({ children }: { children: React.ReactNode }) {
    return(
		<div className="flex min-h-[100dvh] flex-col">
			{/* TopBar section */}
			<div className="h-[12dvh] min-h-[64px]">
				<TopBar />
			</div>
            {/* MtgCard section (grows to fill available space) */}
                {children}
            {/* Menu section */}
            <div className="h-[10dvh] min-h-[56px]">
                <Menu />
            </div>
        </div>
    );
}

export default BasicLayout;
