import BacklogTable from "@/components/specforge/BacklogTable";
import Toolbar from "@/components/specforge/Toolbar";

export default function BacklogPage() {
  return (
    <>
      <Toolbar />
      <div className="content-scroll">
        <BacklogTable />
      </div>
    </>
  );
}
