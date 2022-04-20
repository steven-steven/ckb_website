import NavBar from '../../components/navigation'
import fs from 'fs';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

// determines which paths will be prerendered amongst the /posts/[slug]
export async function getStaticPaths() {
  const files = fs.readdirSync(`${process.cwd()}/data/posts`);

  const paths = files.map((fileName) => {
    return {
      params: {
        slug: fileName.replace('.md', ''),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

// to pass props to the component. Receives params.slug from getStaticPaths
export async function getStaticProps({ params: { slug } }) {
  const file = fs.readFileSync(`data/posts/${slug}.md`).toString();
  const { data, content } = matter(file);

  return {
    props: {
      slug,
      content,
      frontmatter: { title: data.title, date: data.updatedAt, author:data.author, img_src: data.img_src, vid_src: data.vid_src || null },
    },
  };
}

const MarkdownComponents = {
  p: (paragraph) => {
    const { node } = paragraph
  
    if (node.children[0].tagName === "img") {
      const image = node.children[0]
      const metastring = image.properties.alt
      const alt = metastring?.replace(/ *\{[^)]*\} */g, "")
      const metaWidth = metastring.match(/{([^}]+)x/)
      const metaHeight = metastring.match(/x([^}]+)}/)
      const width = metaWidth ? metaWidth[1] : "768"
      const height = metaHeight ? metaHeight[1] : "432"
      const isPriority = metastring?.toLowerCase().match('{priority}')
      const hasCaption = metastring?.toLowerCase().includes('{caption:')
      const caption = metastring?.match(/{caption: (.*?)}/)?.pop()
  
      return (
        <div className="text-center">
          <Image
            src={image.properties.src}
            width={width}
            height={height}
            className="postImg"
            alt={alt}
            priority={isPriority}
          />
            {hasCaption ? <div className="caption" aria-label={caption}>{caption}</div> : null}
        </div>
      )
    }
    return <p>{paragraph.children}</p>
  },
}

export default function Post( { slug, content, frontmatter } ) {

  return (
    <div className='flex flex-col'>
      <section className='md:p-12'>
        <NavBar/>
      </section>

      <section className='px-2 xxs:px-8 pt-8 pb-20 md:px-24'>
        <div className='relative w-full h-64 mx-auto my-0 mb-10 md:w-1/2 md:h-96'>
          <Image
            src={frontmatter.img_src}
            alt='blog_image'
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className='mb-2 text-2xl text-center md:text-4xl'>{frontmatter.title}</h1>
        <p className='mb-12 text-base text-center md:text-lg'>{frontmatter.date} | {frontmatter.author}</p>
        <article className='mx-auto my-0 text-sm prose text-justify md:text-lg'>
          <ReactMarkdown 
            skipHtml={false}
            components={MarkdownComponents}
          >
            {content}
          </ReactMarkdown>
        </article>
        {frontmatter.vid_src && 
          <iframe className='mx-auto my-0 mt-10' width="560" height="315" src={frontmatter.vid_src} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        }
      </section>
      
      
    </div>
  );
}