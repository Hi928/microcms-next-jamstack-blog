import Link from "next/link";
import { client } from "../libs/client";

export default function Home({ blog, category, tag }) {
  return (
    <div>
      <ul>
        {tag.map((tag) => (
          <li key={tag.id}>
            <Link href={`/tag/${tag.id}`}>
              <a>{tag.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        {category.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
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
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  const categoryData = await client.get({ endpoint: "categories" });
  const tagData = await client.get({ endpoint: "tag" });

  console.log(tagData);

  return {
    props: {
      blog: data.contents,
      category: categoryData.contents,
      tag: tagData.contents,
    },
  };
};