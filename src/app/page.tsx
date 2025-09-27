import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Link href="/login" className="bg-red-500">
        log in
      </Link>
      <br />
      <Link href="/signUp" className="bg-amber-500">
        sign up
      </Link>
    </div>
  );
}
