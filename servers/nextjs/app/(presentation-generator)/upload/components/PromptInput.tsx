import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function PromptInput({ value, onChange }: PromptInputProps) {
  const [showHint, setShowHint] = useState(false);
  const handleChange = (value: string) => {
    setShowHint(value.length > 0);
    onChange(value);
  };
  return (
    <div className="space-y-2">
      <div className="relative">
        <Textarea
          value={value}
          rows={5}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Hãy cho chúng tôi biết về bài thuyết trình của bạn"
          data-testid="prompt-input"
          className={`py-4 px-5 border-2 font-medium font-instrument_sans text-base min-h-[150px] max-h-[300px] border-[#5146E5] focus-visible:ring-offset-0  focus-visible:ring-[#5146E5] overflow-y-auto  custom_scrollbar  `}
        />
      </div>
      <p
        className={`text-sm text-gray-500 font-inter font-medium ${
          showHint ? "opacity-100" : "opacity-0"
        }`}
      >
        Cung cấp thông tin chi tiết về nhu cầu thuyết trình của bạn (ví dụ: chủ
        đề, phong cách, điểm chính) để có kết quả chính xác hơn
      </p>
    </div>
  );
}
