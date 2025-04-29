import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-base-900 h-screen flex">
      <div className="p-12 flex flex-col justify-center items-center w-full">
        <span className="text-white font-bold text-2xl text-center mb-10">
          ⚠️ 본 페이지는 임시페이지로 실제 구현에서는 로그인 유저별로
          방어페이지와 평가페이지가 분리될 예정임 ⚠️
        </span>

        <div className="p-10 space-x-24">
          <Link href="/defend">
            <button className="bg-primary-300 p-6 rounded-lg w-max text-white font-bold cursor-pointer">
              방어페이지로 이동 →
            </button>
          </Link>
          <Link href={"/eval-assessment"}>
            <button className="bg-primary-600 p-6 rounded-lg w-max text-white font-bold cursor-pointer">
              평가페이지로 이동 →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
