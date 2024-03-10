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

      <div className="grid grid-rows-[45px_300px_500px] gap-4 md:h-[600px] md:grid-cols-3 md:grid-rows-[45px_1fr]">
        <div className="md:col-span-1 md:col-start-1 md:row-span-1 md:row-start-1">
          <SearchForm />
        </div>

        <div className="md:col-span-1 md:col-start-1 md:row-span-full md:row-start-2">
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>

        <div className="md:col-span-full md:col-start-2 md:row-span-full md:row-start-1">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
