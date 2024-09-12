"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useUserState } from '../hooks/useGlobalState';
import { useRouter } from 'next/navigation';
import { FileTextIcon, LogOutIcon, PersonStandingIcon } from 'lucide-react'
import { PersonIcon } from '@radix-ui/react-icons'

const Header = () => {
  const router = useRouter();
  const [ user ] = useUserState();

  return (
    <header className="bg-white text-black py-4">
      <div className="container mx-auto px-4 max-w-screen-lg">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <Image src="/icon.png" width={133} height={40} alt="logo" />
            </Link>
          </div>
          <div className="ml-4 group">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary inline-block font-thin">
              NEXT TECH BLOG
            </h1>
            <div className="relative h-1 mx-auto mt-2 md:mt-4 overflow-hidden w-full">
              <div className="absolute inset-0 bg-primary transform -translate-x-full group-hover:animate-slide-right" />
            </div>
          </div>
          {user.isFetched && (
            <>
              {!user.isSignedIn && (
                <div>
                  <Button 
                    variant="default" 
                    className="text-white text-base font-normal rounded"
                    onClick={() => router.push('/signin')}
                  >
                    Sign in
                  </Button>
                  <Button 
                    variant="outline" 
                    className="ml-2 text-base font-normal rounded border-[1.5px] border-primary"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
              {user.isSignedIn && (
                <div className="flex items-center gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarFallback><PersonIcon /></AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel className="font-bold">{user.name}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <FileTextIcon className="mr-2 h-4 w-4" /> 記事の管理
                      </DropdownMenuItem>
                      <Link href="/signout">
                        <DropdownMenuItem>
                          <LogOutIcon className="mr-2 h-4 w-4" /> サインアウト
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button 
                    variant="default" 
                    className="ml-2 text-white text-base font-normal rounded w-[100px]"
                  >
                    Add new
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header