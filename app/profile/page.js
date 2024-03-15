"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  console.log(session);
  return (
    <div className="flex justify-center items-center h-[60vh] text-center text-black font-bold">
      {session ? (
        <div>
          <div className="mt-4">
            Signed in as <span className="text-blue-500">{session.user.email}</span> <br />
            Name: <span className="text-blue-500">{session.user.name}</span>
          </div>
          <div className="mt-4 flex justify-center">
            <img src={session.user.image} alt="User" className="rounded-full w-20 h-20" />
          </div>
          <button 
            onClick={() => signOut()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <br />
          <button 
            onClick={() => signIn("github")} 
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Sign in with Github
          </button>
        </div>
      )}
    </div>
  )
}
