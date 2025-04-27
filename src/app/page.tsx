import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/defend"}>Go to Defend</Link>
      <Link href={"/eval-assessment"}>Go to Evaluation</Link>
    </div>
  );
}
