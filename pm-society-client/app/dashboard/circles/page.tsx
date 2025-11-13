



import AddPost from "@/app/components/forum/AddPost";
import PostFeed from "@/app/components/forum/Feed";




const SocietyCirclePage = () => {

  



  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Content */}
        <div className="space-y-6">
          <AddPost />
          <PostFeed/>
        </div>
      </div>
    </div>
  );
};

export default SocietyCirclePage;