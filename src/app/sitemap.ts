import { getAllBlogUser } from "@/services/blogService";
import { getAllCourseUser } from "@/services/courseService";
import { getAllSourceCodeUser } from "@/services/sourceCodeService";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let courseUrls: MetadataRoute.Sitemap = [];
  let sourceCodeUrls: MetadataRoute.Sitemap = [];
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const courses = await getAllCourseUser();

    courseUrls = courses.data.results.map((course: { url: string }) => ({
      url: `${process.env.NEXT_PUBLIC_URL}/course/${course.url}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const sourceCodes = await getAllSourceCodeUser();

    sourceCodeUrls = sourceCodes.data.results.map(
      (sourceCode: { url: string }) => ({
        url: `${process.env.NEXT_PUBLIC_URL}/sourcecode/${sourceCode.url}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      })
    );

    const blogs = await getAllBlogUser();

    blogUrls = blogs.data.results.map((blog: { url: string }) => ({
      url: `${process.env.NEXT_PUBLIC_URL}/blog/${blog.url}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Lỗi lấy danh sách khóa học:", error);
  }
  return [
    {
      url: `${process.env.NEXT_PUBLIC_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/website`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/price`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/course`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/sourcecode`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...courseUrls,
    ...sourceCodeUrls,
    ...blogUrls,
  ];
}
