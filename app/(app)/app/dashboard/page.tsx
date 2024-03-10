import Branding from "@/components/Branding";
import Stats from "@/components/Stats";

const DashboardPage = () => {
  return (
    <main>
      <div className="flex items-center justify-between py-8 text-white">
        <Branding />
        <Stats />
      </div>
    </main>
  );
};

export default DashboardPage;
