
import AddPost from "../components/forum/AddPost";
import Feed from "../components/forum/Feed";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <AddPost />
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default page;