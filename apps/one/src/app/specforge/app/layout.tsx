import Sidebar from '@/components/specforge/Sidebar';
import TopBar from '@/components/specforge/TopBar';
import StatusBar from '@/components/specforge/StatusBar';
import { Providers } from '@/components/specforge/Providers';
import WorkItemModal from '@/components/specforge/WorkItemModal';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="app-layout">
        <TopBar />
        <div className="app-body">
          <Sidebar />
          <div className="main-content">
            {children}
          </div>
        </div>
        <StatusBar />
      </div>
      <WorkItemModal />
    </Providers>
  );
}
