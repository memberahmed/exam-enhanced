import SideNav from "@/components/comman/side-nav/side-nav";

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-x-2 dir-rtl md:gap-x-4">
        {/* Side Navigation */}
        <div className="md:w-4/12 lg:w-3/12 w-full">
          {" "}
          <SideNav />
        </div>

        {/* Children */}
        <div className="md:w-8/12 lg:w-9/12 w-full">{children}</div>
      </div>
    </>
  );
}
