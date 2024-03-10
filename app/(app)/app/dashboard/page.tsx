import Branding from "@/components/Branding";
import ContentBlock from "@/components/ContentBlock";
import PetDetails from "@/components/PetDetails";
import PetList from "@/components/PetList";
import SearchForm from "@/components/SearchForm";
import Stats from "@/components/Stats";

const DashboardPage = () => {
  return (
    <main>
      <div className="flex items-center justify-between py-8 text-white">
        <Branding />
        <Stats />
      </div>

      <div className="grid h-[600px] grid-cols-3 grid-rows-[45px_1fr] gap-4">
        <div className="col-span-1 col-start-1 row-span-1 row-start-1">
          <SearchForm />
        </div>

        <div className="col-span-1 col-start-1 row-span-full row-start-2">
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>

        <div className="col-span-full col-start-2 row-span-full row-start-1">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
