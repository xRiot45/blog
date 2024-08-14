<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\BlogRequest;
use App\Models\Blog;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    public function index(): Response
    {
        $userId = Auth::user()->id;
        $blogs = Blog::select('id', 'title', 'description')->where('user_id', $userId)->get();

        $user = Auth::user();

        $data = $blogs->map(function ($blog) use ($user) {
            $blog->user = $user;
            return $blog;
        });

        return Inertia::render('Blog/Index', [
            'blogs' => $data,
        ]);
    }

    public function show($id): Response
    {
        $userId = Auth::user()->id;
        $blog = Blog::select('id', 'title', 'description')->where('user_id', $userId)->where('id', $id)->first();

        if (!$blog) {
            abort(404, 'Blog not found');
        }

        return Inertia::render('Blog/Show', [
            'blog' => $blog,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Blog/Create');
    }

    public function store(BlogRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::user()->id;

        Blog::create($validated);

        return redirect()->route('blog.index')->with('message', 'Blog created successfully');
    }

    public function edit($id): Response
    {
        $userId = Auth::user()->id;
        $blog = Blog::select('id', 'title', 'description')->where('user_id', $userId)->where('id', $id)->first();

        if (!$blog) {
            abort(404, 'Blog not found');
        }

        return Inertia::render('Blog/Edit', [
            'blog' => $blog,
        ]);
    }

    public function update(BlogRequest $request, $id): RedirectResponse
    {
        $blog = Blog::find($id);
        if (!$blog) {
            return redirect()->route('blog.index')->with('message', 'Blog not found!');
        }

        if ($blog->user_id !== Auth::user()->id) {
            return redirect()->route('blog.index')->with('error', 'Unauthorized to edit this blog.');
        }

        $validated = $request->validated();
        $blog->update($validated);
        return redirect()->route('blog.index')->with('message', 'Blog updated successfully!');
    }

    public function deleteBlog($id): RedirectResponse
    {
        $blog = Blog::find($id);
        if (!$blog) {
            return redirect()->route('blog.index')->with('message', 'Blog not found!');
        }

        if ($blog->user_id !== Auth::user()->id) {
            return redirect()->route('blog.index')->with('error', 'Unauthorized to delete this blog.');
        }

        $blog->delete();
        return redirect()->route('blog.index')->with('message', 'Blog deleted successfully!');
    }
}
