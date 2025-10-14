"use client";



import AddPost from "../components/forum/AddPost";
import PostFeed from "../components/forum/Feed";


const TheExchangePage = () => {
  

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className=" px-4 sm:px-6 lg:px-8 py-6 ">
        
       
         

            {/* Content */}
            <div className="">
              <AddPost />
              <PostFeed
        
                emptyMessage="No posts yet. Start following people to see their content!"
              />
            </div>
          </div>

          {/* Sidebar */}
          {/* <div className="space-y-6">
           
            <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
            </div>

           
            <TrendingTopics />

          
            <WhoToFollow />
          </div> */}
        </div>
    
   
  );
};

export default TheExchangePage;
