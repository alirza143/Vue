<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $category = Category::paginate(5);

        // if($request->isAjaxCall()){
            return response()->json($category, 200);
        // } else {
            // return \view('main',$category);
        // }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|min:3',
            'image'=>'required|image|mimes:jpeg,png,jpg'
        ]);

        $category = new Category();

        $category->name = $request->name;
        $path = $request->file('image')->store('uploads');
        $category->image = $path;
        $category->save();

        if($category->save()){
            $status = 200;
        } else {
            $status = 500;
        }

        return response()->json($category, $status);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name'=>'required|min:3',
            'image'=>'required|image|mimes:jpeg,png,jpg'
        ]);
        
        $category = Category::find($category->id);
        Storage::delete($category->image);

        $category->name = $request->name;
        $path = $request->file('image')->store('uploads');
        $category->image = $path;

        if($category->save()){
            $status = 200;
        } else {
            $status = 500;
        }

        return response()->json($category, $status);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        if($category->destroy($category->id)){
            Storage::delete($category->image);
            $status = 200;
        } else {
            $status = 500;
        }

        return response()->json($category, $status);
    }
}
