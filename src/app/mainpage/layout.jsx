import Navbar from "../../components/navbar/navbar";

export default function MainPage({ children }) {
  return (
    <div className="px-4 pt-6 pb-32 md:p-10 md:pb-32">
      <div>{children}</div>
      <Navbar />
    </div>
  );
}
