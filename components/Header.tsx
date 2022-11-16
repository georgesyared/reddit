import Image from 'next/image';
import React from 'react';
import { Bars3Icon, ChevronDownIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import  { BellIcon, ChatBubbleBottomCenterIcon, ChatBubbleBottomCenterTextIcon, GlobeAltIcon, PlusIcon, SparklesIcon, SpeakerWaveIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

type Props = {}

export default function Header({}: Props) {

    const { data: session } = useSession()

  return (
    <div className='sticky top-0 flex items-center bg-white px-4 py-2 shadow-md'>
    <div className='relative h-10 w-20 flex-shrink-0 cursor-pointer'>
        <Link href="/">
        <Image src='https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo.png'
               objectFit='contain'
               layout='fill'
        />
        </Link>
    </div>

    <div className='mx-7 flex items-center xl:min-w-[300px]'>
        <HomeIcon className='h-5 w-5'/>
        <p className='flex-1 ml-2 hidden lg:inline' >Home</p>
        <ChevronDownIcon  className='h-5 w-5'/>
    </div>

    {/* {Search} */}
    <form className='flex flex-1 items-center space-x-2 rounded-sm border
    border-gray-200 bg-gray-100 px-3 py-1'>
        <MagnifyingGlassIcon className='h-6 w-6 text-gray-400'/>
        <input className='flex-1 bg-transparent outline-none'
         type='text' placeholder='Search Reddit' />
        <button type="submit" hidden />
    </form>

    <div className='text-gray space-x-2 text-gray-500 hidden lg:inline-flex'>
        <SparklesIcon className='icon' />
        <GlobeAltIcon className='icon' />
        <VideoCameraIcon className='icon' />
        <hr className='h-10 border border-gray-100' />
        <ChatBubbleBottomCenterTextIcon className='icon'  />
        <BellIcon className='icon' />
        <PlusIcon className='icon' />
        <SpeakerWaveIcon className='icon' />
    </div>

    <div className='ml-5 flex items-center lg:hidden'>
        <Bars3Icon className='icon' />
    </div>
    {session ? (
          <div onClick={()=> signOut()}
          className='hidden lg:flex items-center cursor-pointer p-2
          space-x-2 border-gray-100 border'>
      <div className='relative h-5 w-5 flex-shrink-0'>
          <Image src='https://links.papareact.com/23l'
          objectFit='contain'
          layout='fill'
          height={5} width={5} alt='' />
      </div>
      
      <div className='flex text-xs'>
      <p className='truncate'>{session?.user?.name}</p>
      <p className='text-gray-400'>Sign Out</p>
      </div>

      <ChevronDownIcon className='icon' /> 
      </div>
    ) : (
        <div onClick={()=> signIn()}
        className='hidden lg:flex items-center cursor-pointer p-2
        space-x-2 border-gray-100 border'>
    <div className='relative h-5 w-5 flex-shrink-0'>
        <Image src='https://links.papareact.com/23l'
        objectFit='contain'
        layout='fill'
        height={5} width={5} alt='' />
    </div>
    <p className='text-gray-400'>Sign In</p>
    </div>
    )}
    </div>
  )
}