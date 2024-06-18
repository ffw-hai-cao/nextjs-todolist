import NavUser from "./NavUser";
import Header from "./Header";

const Layout = ({ children }: any) => {
  return (
    <div className="flex font-mono">
      <NavUser />
      <main className="ml-24 w-full h-screen bg-[#f2f2f2]">
        <Header />
        <div className="main-content p-4 bg-[#f2f2f2]">
          <div className="container m-auto lg:w-7/12">
          { children }
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;