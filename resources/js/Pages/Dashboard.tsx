import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { toast } from "react-toastify";

interface Blog {
  id: number;
  title: string;
  description: string;
  user: {
    name: string;
  };
}

interface DashboardProps {
  auth: {
    user: User;
  };
  blogs: Blog[];
}

export default function Dashboard({ auth, blogs }: DashboardProps) {
  const onDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    router.delete(route("blog.delete", blogs[0].id), {
      onSuccess: () => toast.success("Blog deleted successfully"),
      onError: (error) => console.log(error),
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
            {/* Header */}
            <div className="p-6 text-gray-900 flex justify-between items-center">
              <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Your Blogs
              </h2>

              <Link href={route("blog.create")}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Create New Blog
                </button>
              </Link>
            </div>
            <hr />
            {/* Blogs */}
            <div className="grid lg:grid-cols-2 gap-4 mt-10">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="p-6 bg-white border-b border-gray-200 border rounded-xl"
                >
                  <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-3">
                    {blog.title}
                  </h2>
                  <span className="inline-flex items-center px-3 py-0.5 rounded-sm text-sm font-medium bg-gray-100 text-gray-800">
                    {blog?.user?.name}
                  </span>

                  <p className="text-gray-600 mt-3">
                    {blog.description.trim().substring(0, 150) + "..."}
                  </p>

                  <div className="flex justify-start items-center mt-6 gap-2">
                    <Link href={"/dashboard"}>
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        View Blog
                      </button>
                    </Link>
                    <Link href={"/dashboard/blog/edit/" + blog.id}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Edit Blog
                      </button>
                    </Link>
                    <button
                      onClick={onDelete}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete Blog
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
