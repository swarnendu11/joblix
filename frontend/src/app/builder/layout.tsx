import Sidebar from '@/components/builder/Sidebar';

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mesh-bg flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
