import ContactForm from '../components/contact_form';
import { PlayIcon, DownloadIcon } from '@heroicons/react/solid'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import NavBar from '../components/navigation'
import fs from 'fs';
import matter from 'gray-matter';

export const getStaticProps = async (context) => {
  const files = fs.readdirSync(`${process.cwd()}/data/posts`);
  const posts = files.slice(0,3).map((fileName) => {
    const file = fs.readFileSync(`data/posts/${fileName}`).toString();

    const { data, content } = matter(file);
    const frontmatter = { title: data.title, description: data.description, date: data.updatedAt, img_src: data.img_src };

    return {
      slug: fileName.replace('.md', ''),
      frontmatter,
    };
  });

  return {
    props: { 
      context,
      posts
    },
  };
}

const content = {
  "en-US": {
    language: "Select Language",
    companyprofile: "Download Our Company Profile",
  }, 
  "id-ID": {
    language: "Pilih Bahasa",
  }
}

export default function Home(props) {
  const router = useRouter();

  const { locale } = props.context;
  const localeContent = content[locale] || content['en-US'];

  const changeLocale = () => {
    if (locale !== "id-ID"){
      router.push(router.asPath, router.asPath,  { locale: "id-ID" })
    } else {
      router.push(router.asPath, router.asPath, { locale: "en-US" });
    }
  }

  return (
    <div>
      <section className='h-screen flex md:flex-row flex-col'>
        <div className='flex-1'>
          <NavBar/>
          
        </div>
        <div className='w-2/5 bg-secondary'>
          <div className='p-8 flex justify-end'>
            {router.pathname == '/' && (
              <div className='flex items-center'>
                <div className='flex items-center justify-center md:ml-10 md:flex-col'>
                  <span className='hidden w-12 mr-3 text-xs text-right md:w-auto xs:inline-block md:text-base'>{localeContent.language}</span>

                  <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none md:w-20"
                    onClick={changeLocale}
                  >
                    <input type="checkbox" name="toggle" 
                      className='absolute z-10 block w-5 h-5 bg-white border-4 border-white rounded-full appearance-none cursor-pointer md:w-10 md:h-10 checked:right-0 opacity-40'
                      checked={locale === "id-ID"}
                      readOnly
                    />
                    <div className='relative block h-5 overflow-hidden rounded-full cursor-pointer md:h-10'>
                      <label htmlFor="toggle" />
                      <div className='absolute w-full h-full'>
                        <Image
                          src="/indo_flag.svg"
                          alt="indo"
                          layout="fill"
                          objectFit="cover"
                          priority
                        />
                        <div className={locale === "id-ID" ? 'hidden': 'block'}>
                          <Image
                            src="/us_flag.svg"
                            alt="english"
                            layout="fill"
                            objectFit="cover"
                            priority
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <hr className='h-px bg-gray-400 border-0'/>
      <section>
        <div className='flex justify-between p-8'>
          <h2 className='text-lg'>Latest Projects</h2>
          <div className='text-md hover:underline'><Link href='/project'>-> View all</Link></div>
        </div>

        <hr className='h-px bg-gray-400 border-0'/>

        <div className='flex justify-evenly divide-x'>
          {props.posts.map((post, idx) => {
            return (
              <ProjectEntry 
                key={idx}
                slug={post.slug} 
                description={post.frontmatter.description}
                title={post.frontmatter.title}
                date={post.frontmatter.date}
                img_src={post.frontmatter.img_src} />
            );
          })}
        
        </div>
      </section>

      <hr className='h-px bg-gray-400 border-0'/>

      <section>
        <div className='flex'>
          <div className='w-1/2 bg-secondary'>Image22</div>
          <div>llooo22</div>
        </div>
        <div className='flex'>
          <div className='w-1/2 p-10'> <ContactForm locale={locale}/></div>
          <div className='w-1/2 bg-secondary'>llooo</div>
        </div>

      
      </section>

      <hr className='h-px bg-gray-400 border-0'/>

      <footer className=''>
        <div className='flex flex-col pt-8 mx-10 md:mx-16 md:grid md:grid-cols-2 md:pt-11'>
          <div>
            <div className='flex flex-row items-center gap-x-2 md:gap-x-5'>
              <div id='logo' className='relative w-10 h-10 md:w-20 md:h-20'>
                <Image
                  src='/ckbLogo.png'
                  alt='logo'
                  layout='fill'
                  objectFit="contain"
                  quality={30}
                />
              </div>
              <span className='md:text-lg'>PT Cipta Khasanah Blasting</span>
            </div>
            <p className='pl-5 mt-5 text-sm'>
              Jl. Raya Anyer No.122 Cilegon – Banten <br/>
              Telp: (0254) 312114<br/>
              Fax: (0254) 310084<br/>
              Email: witarso.ng_dp@yahoo.co.id
            </p>
          </div>
          <div className='pl-5 mt-5 text-sm md:pl-0 md:text-right'>
             <p className='mt-2 md:mb-5 md:mt-0'>{localeContent.companyprofile}</p>
             <a className='relative block w-20 h-48 md:float-right group md:w-36' href="/company_profile.pdf" download="Dwiprima Company Profile">
                <Image
                  src='/img/companyprofile.png'
                  className='group-hover:opacity-60'
                  alt="Click to download Company Profile"
                  layout="fill"
                  objectFit="scale-down"
                  placeholder='blur'
                  blurDataURL='/img/companyprofile.png'
                  quality={10}
                />
              <div className='absolute w-full text-center opacity-0 group-hover:opacity-100 top-1/3'>
                <DownloadIcon className='inline w-12 h-12 p-3 border rounded-3xl'/>
              </div>
             </a>
          </div>
          <div className='col-span-2 mt-5 md:mt-16'>
            <hr/>
            <p className='py-5 text-xs'>
              <span>© Copyright PT Dwiprima Karyaguna. All Rights Reserved.</span>
              <span className='block md:inline md:float-right'>{localeContent.footnote}</span>
            </p>
          </div>
        </div>
      </footer>
      
      
    </div>
  )
}


const ProjectEntry = ({ slug, description, img_src, title, date }) => (
  <Link href={`/project/${slug}`}>
    <div className='flex-1 flex p-5 flex-col hover:border hover:border-gray-400 hover:cursor-pointer'>
      <div className='relative h-56'>
        <Image
          src={img_src}
          alt='blog_image'
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className='flex flex-col'>
        <p className='mb-3 text-lg'>{title}</p>
        <p className='text-sm text-gray-500 grow'>{description}</p>
        <p className='text-sm text-blue-500'>{date}</p>
      </div>
    </div>
  </Link>
);
