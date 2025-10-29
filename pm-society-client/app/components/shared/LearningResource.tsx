import { useGetLearningResourcesQuery } from "@/app/redux/services/learningResourcesApi";
import { BookOpen, ExternalLink, Video } from "lucide-react";
import Link from "next/link";

const LearningResource = () => {
  const {
    data: resources = []
   
  } = useGetLearningResourcesQuery({});


  return (
    <section className="mb-6">
      <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        The Learning Suite
      </h2>

      <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 shadow-xl">
        <div className="space-y-3">
          <Link
            href="https://thepmsociety.pmtraining.com/partner-login"
            target="_blank"
            className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-600/20 dark:to-purple-600/20 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Training Pathway
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Practice Exams & On Demand Content
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors" />
          </Link>

          {resources.length > 0 &&
            resources.map((resource) => (
              <Link
                href={resource.linkUrl}
                key={resource._id}
                target="_blank"
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-600/20 dark:to-emerald-600/20 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                    <Video className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {resource.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {resource.shortDescription}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-green-500 transition-colors" />
                </div>
              </Link>
            ))}
          <Link
            href="https://urldefense.proofpoint.com/v2/url?u=https-3A__partner.pmi.org_hub_C001052&d=DwMFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=1QBDdlUcgXKY8JPqGEOTZ0HRPkikscvhrdw-GWRYgeaUzNbmJ287aHGi2_Gg1yAW&m=tK5ZjB0zgb4KiQoGNXs3gpFgaaMjTzYUzsLqC-VlYlxZ25QQUSDCUP4VCsvZaVkp&s=kFW5Ewb38jqM_lpbgjlnU3W9Qu3hWFhq78s9VAH5Dss&e="
            target="_blank"
            className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-600/20 dark:to-emerald-600/20 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <Video className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  PMI Hub
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-green-500 transition-colors" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LearningResource;
