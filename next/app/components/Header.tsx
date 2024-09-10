import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <header className="bg-white text-black p-5">
      <div className="container mx-auto px-4 max-w-screen-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/">
              <Image src="/icon.png" width={100} height={30} alt="logo" className="mx-auto md:mx-0" />
            </Link>
          </div>
          <div className="text-center items-center mb-4 md:mb-0 group">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary inline-block">
              NEXT TECH BLOG
            </h1>
            <div className="relative h-1 mx-auto mt-2 md:mt-4 overflow-hidden w-full">
              <div className="absolute inset-0 bg-primary transform -translate-x-full group-hover:animate-slide-right" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Button variant="default" className="w-full sm:w-auto">
              Sign in
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header