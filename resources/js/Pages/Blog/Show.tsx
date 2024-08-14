import { User } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

interface Blog {
  id: number;
  title: string;
  description: string;
  user: {
    name: string;
  };
}

interface BlogProps {
  auth: {
    user: User;
  };
  blog: Blog;
}

export default function Show({ auth, blog }: BlogProps) {
  return (
    <>
      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Dashboard
          </h2>
        }
      >
        <Head title="Detail Blog" />

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8  py-10">
          <Link href={route("blog.index")}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5">
              Back To Your Blog
            </button>
          </Link>

          <div
            key={blog?.id}
            className="p-6 bg-white border-b border-gray-200 border rounded-xl"
          >
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-3">
              {blog?.title}
            </h2>
            <span className="inline-flex items-center px-3 py-0.5 rounded-sm text-sm font-medium bg-gray-100 text-gray-800">
              {blog?.user?.name}
            </span>

            <p className="text-gray-600 mt-3 text-justify leading-loose">
              {blog?.description}
            </p>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
