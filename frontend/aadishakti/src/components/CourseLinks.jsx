import React, { useState, useEffect } from "react";
import coursesData from "../data/courses.json";
import { useParams, useNavigate } from "react-router-dom";
import { Play, CheckCircle, Clock, Award, ArrowLeft, BookOpen, Cross as Progress, Star, Download } from "lucide-react";

function CourseLinks() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [watchedVideos, setWatchedVideos] = useState(new Set());
  const [currentlyWatching, setCurrentlyWatching] = useState(null);

  // Find the course that matches the id from params
  const course = Array.isArray(coursesData)
    ? coursesData.find((course) => course.courseId === courseId)
    : coursesData.courseId === courseId
    ? coursesData
    : null;

  // Load watched videos from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`course_${courseId}_progress`);
    if (savedProgress) {
      setWatchedVideos(new Set(JSON.parse(savedProgress)));
    }
  }, [courseId]);

  // Save progress to localStorage
  const updateProgress = (videoIndex) => {
    const updated = new Set([...watchedVideeos, videoIndex]);
    setWatchedVideos(updated);
    localStorage.setItem(`course_${courseId}_progress`, JSON.stringify([...updated]));
  };

  const handleVideoClick = (link, index) => {
    setCurrentlyWatching(index);
    updateProgress(index);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // If course not found, show error
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="p-4 bg-red-100 rounded-full w-fit mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-500 mb-6">The course you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-6 py-3 bg-[#921a40] text-white font-medium rounded-lg hover:bg-[#7a1535] transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const totalVideos = course.links?.length || 0;
  const completedVideos = watchedVideos.size;
  const progressPercentage = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;
  const isComplete = progressPercentage === 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50">
      {/* Header Section */}
      <div className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center text-gray-600 hover:text-[#921a40] mb-6 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>

          {/* Course Header */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-[#921a40] to-[#b91c47] rounded-lg">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-[#921a40] bg-red-50 px-3 py-1 rounded-full">
                    Course Content
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {course.title}
                </h1>
                <p className="text-gray-600 text-lg mb-4">
                  {course.description || "Master the concepts with our comprehensive video series"}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Play className="mr-1 h-4 w-4" />
                    {totalVideos} Videos
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    Self-paced
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4" />
                    Certificate included
                  </div>
                </div>
              </div>

              {/* Progress Circle */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#921a40]"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={`${progressPercentage}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {completedVideos} of {totalVideos} completed
                  </div>
                  <div className="text-xs text-gray-500">Course Progress</div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Course Videos</h2>
              <div className="text-sm text-gray-500">
                Click any video to start learning
              </div>
            </div>

            {course.links && course.links.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {course.links.map((link, index) => {
                  const isWatched = watchedVideos.has(index);
                  const isCurrentlyWatching = currentlyWatching === index;

                  return (
                    <div
                      key={index}
                      className={`
                        relative bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer group
                        ${isWatched 
                          ? 'border-green-200 bg-green-50/50' 
                          : isCurrentlyWatching 
                            ? 'border-[#921a40] bg-red-50/50' 
                            : 'border-gray-200 hover:border-[#921a40]/50 hover:shadow-lg'
                        }
                      `}
                      onClick={() => handleVideoClick(link, index)}
                    >
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        {isWatched ? (
                          <div className="p-1 bg-green-500 rounded-full">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        ) : isCurrentlyWatching ? (
                          <div className="p-1 bg-[#921a40] rounded-full">
                            <Progress className="h-4 w-4 text-white animate-pulse" />
                          </div>
                        ) : (
                          <div className="p-1 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Video Thumbnail/Icon */}
                      <div className={`
                        p-6 rounded-t-xl text-center
                        ${isWatched 
                          ? 'bg-gradient-to-br from-green-100 to-green-200' 
                          : isCurrentlyWatching 
                            ? 'bg-gradient-to-br from-red-100 to-red-200' 
                            : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-red-100 group-hover:to-red-200'
                        }
                      `}>
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4
                          ${isWatched 
                            ? 'bg-green-500' 
                            : isCurrentlyWatching 
                              ? 'bg-[#921a40]' 
                              : 'bg-gray-400 group-hover:bg-[#921a40]'
                          }
                        `}>
                          {isWatched ? (
                            <CheckCircle className="h-6 w-6 text-white" />
                          ) : (
                            <Play className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Video {index + 1}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {isWatched 
                            ? 'Completed' 
                            : isCurrentlyWatching 
                              ? 'Currently watching' 
                              : 'Ready to watch'
                          }
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            Chapter {index + 1}
                          </span>
                          {isWatched && (
                            <div className="flex items-center text-green-600 text-xs">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Done
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
                <div className="p-4 bg-gray-100 rounded-full w-fit mx-auto mb-4">
                  <Play className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Videos Available</h3>
                <p className="text-gray-500">
                  Videos for this course will be available soon. Check back later!
                </p>
              </div>
            )}
          </div>

          {/* Certificate Section */}
          <div className={`
            bg-white rounded-2xl p-6 sm:p-8 border-2 transition-all duration-300
            ${isComplete 
              ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50' 
              : 'border-gray-200'
            }
          `}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
              <div className="flex items-start space-x-4">
                <div className={`
                  p-3 rounded-xl
                  ${isComplete 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
                  }
                `}>
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Course Certificate
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {isComplete 
                      ? 'Congratulations! You\'ve completed the course.' 
                      : `Complete all ${totalVideos} videos to unlock your certificate.`
                    }
                  </p>
                  <div className="text-sm text-gray-500">
                    Progress: {completedVideos}/{totalVideos} videos completed
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                {isComplete ? (
                  <>
                    <button
                      onClick={() => navigate(`/courses/${course.courseId}/certificate`)}
                      className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                    >
                      <Award className="mr-2 h-5 w-5" />
                      View Certificate
                    </button>
                    <button className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center px-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
                  >
                    <Award className="mr-2 h-5 w-5" />
                    Certificate Locked
                  </button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    isComplete ? 'bg-green-500' : 'bg-gradient-to-r from-[#921a40] to-[#b91c47]'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseLinks;