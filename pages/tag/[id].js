import Link from "next/link"
import { client } from "../../libs/client"

export default function TagId({ blog }) {
  if (blog.length === 0) {
    return <div>ブログコンテンツがありません</div>
  }
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "tag" });
  const paths = data.contents.map((tag) => `/tag/${tag.id}`);
  return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", queries: { filters: `tags[contains]${id}` }});

  console.log("aaaaaaaaa");
  console.log(data);

  return {
    props: {
      blog: data.contents,
    },
  };
}