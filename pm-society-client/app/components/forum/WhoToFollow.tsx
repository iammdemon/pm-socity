
// "use client";

// import { useState } from "react";
import { Users } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { toast } from "sonner";

// interface User {
//   id: string;
//   name: string;
//   username: string;
//   avatar: string;
//   bio: string;
//   verified: boolean;
//   followers: number;
//   following: number;
//   posts: number;
//   isFollowing?: boolean;
// }

// const mockUsers: User[] = [
//   {
//     id: "1",
//     name: "Sarah Johnson",
//     username: "sarah_pm",
//     avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c1ca?w=100&h=100&fit=crop&crop=face",
//     bio: "PMP® | Agile Coach | Helping teams deliver value",
//     verified: true,
//     followers: 5234,
//     following: 892,
//     posts: 342
//   },
//   {
//     id: "2",
//     name: "Michael Chen",
//     username: "michaelchen_pm",
//     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
//     bio: "Scrum Master | Product Owner | Agile enthusiast",
//     verified: false,
//     followers: 2156,
//     following: 445,
//     posts: 189
//   },
//   {
//     id: "3",
//     name: "Emily Rodriguez",
//     username: "emily_rod",
//     avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
//     bio: "Program Manager | Tech enthusiast | Coffee lover ☕",
//     verified: true,
//     followers: 8932,
//     following: 234,
//     posts: 567
//   },
// ];

const WhoToFollow = () => {

//   const [users, setUsers] = useState<User[]>(mockUsers.map(u => ({ ...u, isFollowing: false })));

//   const handleFollow = async (userId: string) => {
//     // Simulate API call
//     setUsers(users.map(user => 
//       user.id === userId 
//         ? { ...user, isFollowing: !user.isFollowing }
//         : user
//     ));
    
//     const user = users.find(u => u.id === userId);
//     toast.success(user?.isFollowing ? `Unfollowed ${user?.name}` : `Following ${user?.name}`);
//   };

  return (
    <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="text-lg font-semibold">Who to Follow</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4 text-center">
          {/* {users.slice(0, 3).map((user) => (
            <div key={user.id} className="flex items-center justify-between p-2">
              <div className="flex items-center space-x-3 flex-1">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                      {user.name}
                    </h3>
                    {user.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    @{user.username}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                    {user.bio}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleFollow(user.id)}
                size="sm"
                className={`rounded-full text-xs font-medium transition-colors ${
                  user.isFollowing
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                    : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                }`}
              >
                {user.isFollowing ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Linked
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3 h-3 mr-1" />
                    Link
                  </>
                )}
              </Button>
            </div>
          ))} */}
          Upcoming
        </div>
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800">
          {/* <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
            Show more suggestions
          </button> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default WhoToFollow;