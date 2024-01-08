import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { Button } from '../ui/button'
import { FaGithub } from 'react-icons/fa'

const Login = () => {
  return (
    <div className="w-full h-screen">
      <div className="absolute inset-0">
        <Image
          src={
            'https://repository-images.githubusercontent.com/299409710/b42f7780-0fe1-11eb-8460-e459acd20fb4'
          }
          alt={'bg'}
          fill
        />
      </div>
      <div className="relative z-10 w-[500px] h-[50vh] bg-black/50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md px-8 py-4 flex items-center justify-center">
        <Button
          className="mt-4 flex items-center gap-2 w-full bg-red-600 text-white h-[56px] hover:bg-red-400"
          onClick={() => signIn('github')}
        >
          <FaGithub className="w-7 h-7" /> Sign in with github
        </Button>
      </div>
    </div>
  )
}
export default Login
