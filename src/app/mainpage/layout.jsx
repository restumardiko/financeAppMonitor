import Navbar from "../../components/navbar/navbar";

export default function MainPage({ children }) {
  return (
    <div>
      <div>{children}</div>
      <Navbar />
    </div>
  );
}
