import React from "react";
import CourseDetail from "@/components/CourseDetail";
import { getCourseUser } from "@/services/courseService";
import { notFound } from "next/navigation";
import { baseOpenGraph } from "@/app/shared-metadata";

interface CourseDetailPageProps {
  params: { url: string };
}

export async function generateMetadata({ params }: CourseDetailPageProps) {
  try {
    const courseResponse = await getCourseUser(params.url);

    if (!courseResponse?.data) {
      return {
        title: "Khóa học không tồn tại",
        description: "Khóa học không tồn tại hoặc đã bị xóa.",
      };
    }

    const url = process.env.NEXT_PUBLIC_URL + "/course/" + params.url;
    const urlImage = process.env.NEXT_PUBLIC_SERVER + courseResponse.data.image;

    return {
      title: {
        absolute: courseResponse.data.title,
      },
      description: courseResponse.data.shortDescription,
      openGraph: {
        ...baseOpenGraph,
        title: `${courseResponse.data.title}`,
        description: `${courseResponse.data.shortDescription}`,
        url: url,
        siteName: "Snake Chain",
        images: [
          {
            url: urlImage,
            // width: 800,
            // height: 600,
          },
        ],
      },
      alternates: {
        canonical: url,
      },
    };
  } catch (error) {
    return {
      title: "Lỗi khi tải khóa học",
      description: "Có lỗi xảy ra khi tải thông tin khóa học.",
    };
  }
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  try {
    const courseResponse = await getCourseUser(params.url);

    if (!courseResponse?.data) {
      notFound();
    }

    return <CourseDetail course={courseResponse.data} />;
  } catch (error) {
    notFound();
  }
}
