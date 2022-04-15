import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav className='flex items-center text-sm md:text-lg gap-x-8 sm:gap-x-16 md:gap-x-32 m-5'>
      <Link href={'/'}>  
        <div className='flex gap-x-4'>
          <div id='logo' className='relative w-10 h-10 md:w-16 md:h-16'>
            <Image
              src='/ckbLogo.png'
              alt='logo'
              layout='fill'
              objectFit="contain"
              quality={30}
            />
          </div>
          <div className='flex-col justify-center text-sm hidden xxs:flex'>
            <span> Cipta </span>
            <span> Khasanah </span>
            <span> Blasting </span>
          </div>
        </div>
      </Link>
      <Link href='/'><div className={`text-center hover:underline underline-offset-8 hover:cursor-pointer ${router.pathname == '/' ? 'underline' : ''}`}>Home</div></Link>
      <Link href='/project' locale={false}><div className={`text-center hover:underline underline-offset-8 hover:cursor-pointer ${router.pathname == '/project' ? 'underline' : ''}`}>Projects</div></Link>
    </nav>
  )
}