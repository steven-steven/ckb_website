import ContactForm from '../components/contact_form';
import { PlayIcon, DownloadIcon } from '@heroicons/react/solid'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import NavBar from '../components/navigation'
import fs from 'fs';
import matter from 'gray-matter';
import ReactHtmlParser from 'react-html-parser'; 

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
    heading: "Indonesia's <br/> Top <br/> Sandblasting <br/> Company",
    contact_us: "Contact Us",
    latest_projects: "Latest Projects",
    view_all: "View all",
    blurb: "We can handle large volumes of work, <br/> with various materials, various surfaces, <br/> while maintaining our values. <br/>",
    values: "Quality. Efficiecy. Safety.",
    companyprofile: "Download Our Company Profile",
  }, 
  "id-ID": {
    language: "Pilih Bahasa",
    heading: "Perusahaan <br/> Sandblasting <br/> Terkemuka <br/> di Indonesia",
    contact_us: "Hubungi Kami",
    latest_projects: "Proyek Terbaru",
    view_all: "Lihat semua",
    blurb: "Kami dapat menangani volume perkerjaan besar, <br/> dengan beragam materi, beragam permukaan, <br/> sementara mempertahankan nilai-nilai kami. <br/>",
    values: "Qualitas. Efisiensi. Keamanan.",
    companyprofile: "Unduh Company Profile kami",
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
      <section className='flex flex-col-reverse md:h-screen md:flex-row'>
        <div className='fixed top-0 left-0 right-0 z-10 flex h-24 md:hidden bg-opacity-80 bg-secondary'>
          <NavBar locale={locale}/>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='hidden md:flex'>
            <NavBar/>
          </div>

          <div className='flex items-center flex-1'>
            <p className='mt-12 ml-5 text-2xl leading-relaxed md:text-5xl xs:ml-16'>{ReactHtmlParser(localeContent.heading)}</p>
          </div>
          <Link href={`#contact_us`}>
            <button className='p-3 m-16 border md:m-16 hover:border-black border-secondary rounded-2xl md:w-56'>
              -&gt; {localeContent.contact_us}
            </button>
          </Link>
          
        </div>
        <div className='flex flex-col w-full h-screen px-3 pb-3 md:w-1/2 bg-secondary'>
          <div className='flex justify-end p-8 pr-0 md:pr-8'>
            {router.pathname == '/' && (
              <div className='z-20 flex items-center'>
                <div className='flex items-center justify-center md:ml-10 md:flex-col'>
                  <span className='hidden w-12 mr-3 text-xs text-right md:w-auto xs:inline-block md:text-sm'>{localeContent.language}</span>

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
          <div className='relative w-full h-full'>
              <Image
                src='/img/main-section.png'
                alt='main banner'
                layout='fill'
                objectFit="cover"
              />
          </div>
        </div>
      </section>

      <hr className='h-px bg-gray-400 border-0'/>
      <section>
        <div className='flex justify-between p-8'>
          <h2 className='text-lg'>{localeContent.latest_projects}</h2>
          <div className='text-md hover:underline'><Link href='/project'>{`-> ${localeContent.view_all}`}</Link></div>
        </div>

        <hr className='h-px bg-gray-400 border-0'/>

        <div className='flex flex-col py-3 divide-x md:flex-row justify-evenly'>
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
        <div className='flex flex-col md:flex-row'>
          <div className='h-56 p-5 md:w-1/2 bg-secondary'>
            <div className='relative w-full h-full'>
              <Image
                src='/img/redpipe.png'
                alt='main banner'
                layout='fill'
                objectFit="cover"
              />
            </div>
          </div>
          <div className='flex items-center justify-center md:w-1/2'>
            <p className='my-12 font-serif text-xl font-thin leading-loose text-center md:my-0'>
              {ReactHtmlParser(localeContent.blurb)}
              <span className='text-lime-700'>{localeContent.values}</span>
            </p>
          </div>
        </div>
        <div className='flex flex-col-reverse md:flex-row'>
          <div className='p-10 md:w-1/2' id='contact_us'> 
            <p className='mb-12 text-xl text-center'>Contact Us</p>
            <ContactForm locale={locale}/>
          </div>
          <div className='p-5 md:w-1/2 h-96 md:h-auto bg-secondary'>
            <div className='relative w-full h-full'>
              <Image
                src='/img/hbeam.png'
                alt='main banner'
                layout='fill'
                objectFit="cover"
              />
            </div>
          </div>
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
            <p className='pl-5 mt-5 text-sm break-words'>
              Jl. Raya Anyer No.122, Warnasari, Citangkil, Kota Cilegon, Banten, 43443 <br/>
              Telp: (0254) 312114<br/>
              Fax: (0254) 310084<br/>
              Email: ciptakhasanahblasting21@gmail.com
            </p>
          </div>
{
          // <div className='pl-5 mt-5 text-sm md:pl-0 md:text-right'>
          //    <p className='mt-2 md:mb-5 md:mt-0'>{localeContent.companyprofile}</p>
          //    <a className='relative block w-20 h-48 md:float-right group md:w-36' href="/company_profile.pdf" download="Dwiprima Company Profile">
          //       <Image
          //         src='/img/companyprofile.png'
          //         className='group-hover:opacity-60'
          //         alt="Click to download Company Profile"
          //         layout="fill"
          //         objectFit="scale-down"
          //         placeholder='blur'
          //         blurDataURL='/img/companyprofile.png'
          //         quality={10}
          //       />
          //     <div className='absolute w-full text-center opacity-0 group-hover:opacity-100 top-1/3'>
          //       <DownloadIcon className='inline w-12 h-12 p-3 border rounded-3xl'/>
          //     </div>
          //    </a>
          // </div>
}

          <div className='col-span-2 mt-5 md:mt-16'>
            <hr/>
            <p className='py-5 text-xs'>
              <span>© Copyright PT Cipta Khasanah Blasting. All Rights Reserved.</span>
              <span className='block md:inline md:float-right'>{localeContent.footnote}</span>
            </p>
          </div>
        </div>
      </footer>
      
      
    </div>
  )
}


const ProjectEntry = ({ slug, description, img_src, title, date }) => (
  <Link href={`/project/${slug}`} locale={false}>
    <div className='flex flex-col flex-1 p-5 hover:border hover:border-gray-400 hover:cursor-pointer'>
      <div className='relative h-56'>
        <Image
          src={img_src}
          alt='blog_image'
          layout="fill"
          objectFit="cover"
          quality={50}
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
