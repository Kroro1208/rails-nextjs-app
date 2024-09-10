import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <header className="bg-white text-black p-5">
      <div className="container mx-auto px-4 max-w-screen-lg">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <Image src="/icon.png" width={100} height={30} alt="logo" />
            </Link>
          </div>
          <div className="text-center items-center">
            <h1 className="text-5xl font-bold text-primary">NEXT TECH BLOG</h1>
            <div className="w-32 h-1 bg-primary mx-auto mt-4" />
        </div>
          <div>
            <Button variant="default" className="mr-2">
              Sign in
            </Button>
            <Button variant="outline">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header