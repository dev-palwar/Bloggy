import Blog from "@/Components/Card";

export default function page() {
  return (
    <>
      <div className="container">
        <div className="home-section flex justify-evenly">
          <div className="Blog-section flex flex-col">
            <Blog />
            <Blog />
            <Blog />
            <Blog />
            <Blog />
            <Blog />
            <Blog />
            <Blog />
            <Blog />
          </div>
          <div className="Alert-section flex flex-col h-[100vh] w-[45vh] border sticky top-0"></div>
        </div>
      </div>
    </>
  );
}
