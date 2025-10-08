import { IPost } from "./interface.post";
import { Post } from "./model.post";

const createPostIntoDB = async(payload: IPost)=>{
const result = await Post.create(payload)
return result
}




