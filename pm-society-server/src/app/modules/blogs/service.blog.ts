import { IBlog } from "./interface.blog";
import { Blog } from "./model.blog";

const createABlogIntoDB = async (payload: IBlog)=>{
    const result = await Blog.create(payload)
    return result
}

const getAllblogs= async ()=>{
    const result = await Blog.find()
    return result
}

const getSingleBlog = async (slug: string) => {
    const result = await Blog.findOne({ slug });
    return result;
};
const updateBlog = async (slug: string, updateData: Partial<IBlog>) => {
    const result = await Blog.findOneAndUpdate({ slug }, updateData, { new: true });
    return result;
};

const deleteBlog = async (slug: string) => {
    const result = await Blog.findOneAndDelete({ slug });
    return result;
};
export const blogService = {
    createABlogIntoDB,
    getAllblogs,
    getSingleBlog,
    updateBlog,deleteBlog
}