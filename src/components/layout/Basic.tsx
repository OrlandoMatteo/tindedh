import Menu from '../ui/Menu.tsx'
import TopBar from "../ui/TopBar.tsx";
function BasicLayout({ children }: { children: React.ReactNode }) {
    return(
		<div className="flex flex-col h-screen">
			{/* TopBar section */}
			<div className="h-[12vh]">
				<TopBar />
			</div>
            {/* MtgCard section (grows to fill available space) */}
                {children}
            {/* Menu section */}
            <div className="h-[10vh]">
                <Menu />
            </div>
        </div>
    );
}

export default BasicLayout;

