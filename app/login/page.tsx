'use client'
import { useSession,signIn,signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FaGithub, FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
export default function Component() {
    const router = useRouter();
    const { data: session } = useSession();
  
    return (
      <div className="flex justify-center items-center h-[60vh] text-center text-black">
        {session ? (
          <div className="animate-fade-in">
            <div className="mt-4">
              Signed in as{" "}
              <span className="text-lg font-[Poppins] underline underline-offset-4 text-blue-800">
                {session?.user?.email}
              </span>{" "}
              <br />
              Welcome back{" "}
              <span className="text-lg font-[Poppins] underline underline-offset-4 text-blue-800">
                {session?.user?.name}
              </span>
            </div>
            <div className="mt-4 flex justify-center">
              <img
                src={session?.user?.image || ''}
                alt="User"
                className="rounded-full w-28 h-28"
              />
            </div>
            <button
              onClick={() => {
                signOut();
                router.push("/login");
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <br />
            <div className="space-y-2">
              <button
                onClick={() => signIn("github")}
                className="flex gap-1 min-w-56 items-center mt-4 px-4 py-2 bg-[#000000] text-white rounded hover:bg-[#222222] transition duration-300 ease-in-out"
              >
                <FaGithub />
                <span>Sign in with Github</span>
              </button>
              <button
                onClick={() => signIn("google")}
                className="flex gap-1 min-w-56 items-center mt-4 px-4 py-2 bg-[#57197a] text-white rounded hover:bg-[#6f2d9b] transition duration-300 ease-in-out"
              >
                <FaGoogle />
                <span>Sign in with Google</span>
              </button>
              <button
                onClick={() => alert("Feature is in the Pipeline")}
                className="flex gap-1 min-w-56 items-center mt-4 px-4 py-2 bg-[#a72f83] text-white rounded hover:bg-[#c53d9c] transition duration-300 ease-in-out"
              >
                <FaFacebook />
                <span>Sign in with Facebook</span>
              </button>
              <button
                onClick={() => alert("Feature is in the Pipeline")}
                className="flex gap-1 min-w-56 items-center mt-4 px-4 py-2 bg-[#e94560] text-white rounded hover:bg-[#f06277] transition duration-300 ease-in-out"
              >
                <FaTwitter />
                <span>Sign in with Twitter</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }