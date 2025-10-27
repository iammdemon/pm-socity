

import AddPost from "../components/forum/AddPost";
import PostFeed from "../components/forum/Feed";


const TheExchangePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className=" px-4 sm:px-6 lg:px-8 py-6 ">
        {/* Content */}
        <div className="space-y-4">
          <AddPost />
          <PostFeed />
        </div>
      </div>

     
    </div>
  );
};

export default TheExchangePage;
