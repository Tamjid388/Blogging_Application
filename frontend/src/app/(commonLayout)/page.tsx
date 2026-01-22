import { userService } from "@/services/user.service";
import { cookies } from "next/headers";

export default async function Home() {
const {data}=await userService.getSession()
console.log(data?.user);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center  py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1
          className="
text-4xl font-bold m-4"
        >
          Home Page
        </h1>
        <h1
          className="
text-4xl font-bold m-4 text-indigo-600"
        >
          {data?.user?.name}
        </h1>
      </main>
    </div>
  );
}
