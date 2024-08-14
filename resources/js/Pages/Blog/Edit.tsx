import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

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

export default function BlogEdit({ auth, blog }: BlogProps) {
  const { data, setData, processing, errors, reset } = useForm({
    title: blog.title,
    description: blog.description,
  });

  const onEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.put(route("blog.update", blog.id), data, {
      onSuccess: () => {
        reset();
        toast.success("Blog updated successfully");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Edit Blog
        </h2>
      }
    >
      <Head title="Edit Blog" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
            <Link href={route("blog.index")}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Back To Your Blog
              </button>
            </Link>

            {/* Form */}
            <div className="mt-10">
              <form onSubmit={onEdit}>
                {/* Title */}
                <div className="mb-5">
                  <InputLabel htmlFor="title" value="Title" />

                  <TextInput
                    id="title"
                    type="title"
                    name="title"
                    value={data.title}
                    className="mt-1 block w-full p-3 border"
                    autoComplete="title"
                    isFocused={true}
                    onChange={(e) => setData("title", e.target.value)}
                    placeholder="Input your title blog"
                  />

                  <InputError message={errors.title} className="mt-2" />
                </div>

                {/* Description */}
                <div>
                  <InputLabel htmlFor="description" value="Description" />

                  <TextareaInput
                    id="description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full p-3 border"
                    autoComplete="description"
                    onChange={(e) => setData("description", e.target.value)}
                    placeholder="Input your description blog"
                    isFocused={true}
                  />

                  <InputError message={errors.description} className="mt-2" />
                </div>

                <PrimaryButton
                  className="mt-4 bg-blue-500 py-4 w-full flex justify-center hover:bg-blue-700"
                  disabled={processing}
                >
                  Edit Blog
                </PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
