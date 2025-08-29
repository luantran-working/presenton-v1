import React, { useState, useEffect } from "react";

const LoadingState = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const tips = [
    "Chúng tôi đang tạo bài thuyết trình với AI ma thuật ✨",
    "Phân tích nội dung của bạn để tạo slide hoàn hảo 📊",
    "Sắp xếp thông tin để tạo tác động tối đa 🎯",
    "Thêm các yếu tố hình ảnh để thu hút khán giả 🎨",
    "Sắp xong rồi! Đang hoàn thiện những nét cuối ⚡️",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto w-[500px] flex flex-col items-center justify-center p-8">
      <div className="w-full bg-white rounded-xl p-[2px] ">
        <div className="bg-white rounded-xl p-6 w-full">
          <div className="flex items-center justify-center space-x-4 ">
            <h2 className="text-2xl font-semibold text-gray-800">
              Đang tạo bài thuyết trình của bạn
            </h2>
          </div>
          <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 mb-4">
            <div className="min-h-[120px] flex items-center justify-center">
              <p className="text-gray-700 text-lg text-center">
                {tips[currentTipIndex]}
              </p>
            </div>
          </div>

          <div className="w-full max-w-md">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#5141e5] rounded-full animate-progress" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
