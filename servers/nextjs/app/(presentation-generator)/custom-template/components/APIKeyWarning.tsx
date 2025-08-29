import React from "react";
import Header from "@/app/(presentation-generator)/dashboard/components/Header";

export const APIKeyWarning: React.FC = () => {
  return (
    <div className="min-h-screen font-roboto bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <div className="flex items-center justify-center aspect-video mx-auto px-6">
        <div className="text-center space-y-2 my-6 bg-white p-10 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold text-gray-900">
            Vui lòng thêm "GOOGLE_API_KEY" để kích hoạt tạo mẫu thông qua AI.
          </h1>
          <h1 className="text-xl font-bold text-gray-900">
            Vui lòng thêm khóa OpenAI API để xử lý bố cục
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tính năng này yêu cầu mô hình OpenAI GPT-5. Cấu hình khóa của bạn
            trong cài đặt hoặc thông qua biến môi trường.
          </p>
        </div>
      </div>
    </div>
  );
};
