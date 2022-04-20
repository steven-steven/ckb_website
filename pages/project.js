import Head from 'next/head'
import Link from 'next/link'
import NavBar from '../components/navigation'
import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/outline'

export async function getStaticProps() {
  const files = fs.readdirSync(`${process.cwd()}/data/posts`);

  const posts = files.map((fileName) => {
    const file = fs.readFileSync(`data/posts/${fileName}`).toString();

    const { data, content } = matter(file);
    const frontmatter = { title: data.title, description: data.description, date: data.updatedAt, img_src: data.img_src };

    return {
      slug: fileName.replace('.md', ''),
      frontmatter,
    };
  });

  // pass in array of posts
  return {
    props: {
      posts,
    },
  };
}

export default function Blog({ posts }) {
  return (
    <div>
      <section className='relative h-1 min-h-screen'>
        <div className='w-full h-full -z-10'>
          <Image
            alt="Main Background"
            src="/img/main-bg.png"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className='absolute top-0 w-full h-full bg-black bg-opacity-50'>
          <div className='h-full flex flex-col justify-between md:p-12 text-white'>
            <NavBar/>
            <Link href={'#project_entry'}>
              <ChevronDownIcon className='my-0 mx-auto mb-5 hover:cursor-pointer ease-in duration-300 hover:mb-0 inline w-24 h-24'/>
            </Link>
          </div>
        </div>
      </section>

      <section className='px-6 py-8 md:px-24 grow bg-primary'>
        <h1 id='project_entry' className='pb-3 text-2xl md:text-4xl'>Projects</h1>
        <p className='pb-3 text-sm md:text-xl'>Dig in for insights of what&apos;s going on in the company or in the industry</p>
        <hr className='h-px my-2 text-black bg-gray-400 border-0'/>
        <div className='flex flex-col md:p-10 gap-y-24'>
          {posts.map((post, idx) => {
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
      
      
    </div>
  )
}

const ProjectEntry = ({ slug, description, img_src, title, date }) => (
  <div>
    <div className='flex flex-col md:p-3 md:flex-row'>
      <div className='relative w-full h-56 md:w-1/2 md:h-auto'>
        <Image
          alt='blog_image'
          src={img_src}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className='flex-1 flex flex-col px-5 py-5 md:px-10'>
        <p className='mb-3 text-sm xs:text-2xl font-semibold uppercase'>{title}</p>
        <p className='mb-3 text-sm text-gray-500 grow'>{description}</p>
        <p className='mb-10 text-sm text-blue-500'>{date}</p>
        <Link href={`/project/${slug}`}><button className='p-3 border hover:border-black border-secondary rounded-3xl md:w-56'>LEARN MORE</button></Link>
      </div>
      <hr className='h-px bg-gray-500 border'/>
    </div>
  </div>
    
);