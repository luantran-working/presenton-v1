import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, X, Search } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const helpQuestions = [
  {
    id: 1,
    category: "Hình ảnh",
    question: "Làm thế nào để thay đổi hình ảnh?",
    answer:
      "Nhấp vào bất kỳ hình ảnh nào để hiển thị thanh công cụ hình ảnh. Bạn sẽ thấy các tùy chọn Chỉnh sửa, Điều chỉnh vị trí và thay đổi cách hình ảnh vừa với container của nó. Tùy chọn Chỉnh sửa cho phép bạn thay thế hoặc sửa đổi hình ảnh hiện tại.",
  },
  {
    id: 2,
    category: "Hình ảnh",
    question: "Tôi có thể tạo hình ảnh mới bằng AI không?",
    answer:
      "Có! Nhấp vào bất kỳ hình ảnh nào và chọn tùy chọn Chỉnh sửa từ thanh công cụ. Trong bảng bên sẽ xuất hiện, bạn sẽ tìm thấy tab Tạo AI. Nhập prompt mô tả hình ảnh bạn muốn, và AI của chúng tôi sẽ tạo hình ảnh dựa trên mô tả của bạn.",
  },
  {
    id: 3,
    category: "Hình ảnh",
    question: "Làm thế nào để tải lên hình ảnh của riêng tôi?",
    answer:
      "Nhấp vào bất kỳ hình ảnh nào, sau đó chọn Chỉnh sửa từ thanh công cụ. Trong bảng bên, nhấp vào tab Tải lên ở trên cùng. Bạn có thể duyệt tệp để chọn một tệp. Sau khi tải lên, bạn có thể áp dụng nó vào thiết kế của mình.",
  },
  {
    id: 11,
    category: "Prompt AI",
    question: "Tôi có thể thay đổi bố cục slide thông qua prompt không?",
    answer:
      "Có, bạn có thể! Nhấp vào biểu tượng WandSparkles ở góc trên bên trái của mỗi slide và nó sẽ cung cấp cho bạn một hộp nhập prompt. Mô tả yêu cầu bố cục của bạn và AI sẽ thay đổi bố cục slide theo đó.",
  },
  {
    id: 12,
    category: "Prompt AI",
    question: "Tôi có thể thay đổi hình ảnh slide thông qua prompt không?",
    answer:
      "Có, bạn có thể! Nhấp vào biểu tượng WandSparkles ở góc trên bên trái của mỗi slide và nó sẽ cung cấp cho bạn một hộp nhập prompt. Mô tả hình ảnh bạn muốn và AI sẽ cập nhật hình ảnh slide dựa trên yêu cầu của bạn.",
  },

  {
    id: 14,
    category: "Prompt AI",
    question: "Tôi có thể thay đổi nội dung thông qua prompt không?",
    answer:
      "Có, bạn có thể! Nhấp vào biểu tượng WandSparkles ở góc trên bên trái của mỗi slide và nó sẽ cung cấp cho bạn một hộp nhập prompt. Mô tả nội dung bạn muốn và AI sẽ cập nhật văn bản và nội dung của slide dựa trên mô tả của bạn.",
  },
  {
    id: 4,
    category: "Văn bản",
    question: "Làm thế nào để định dạng và làm nổi bật văn bản?",
    answer:
      "Chọn bất kỳ văn bản nào để xem thanh công cụ định dạng xuất hiện. Bạn sẽ có các tùy chọn cho Đậm, Nghiêng, Gạch chân, Gạch ngang và nhiều hơn nữa.",
  },
  {
    id: 5,
    category: "Biểu tượng",
    question: "Làm thế nào để thay đổi biểu tượng?",
    answer:
      "Nhấp vào bất kỳ biểu tượng hiện có nào để sửa đổi nó. Trong bảng chọn biểu tượng, bạn có thể duyệt biểu tượng hoặc sử dụng chức năng tìm kiếm để tìm biểu tượng cụ thể. Chúng tôi cung cấp hàng nghìn biểu tượng trong nhiều phong cách khác nhau.",
  },
  {
    id: 16,
    category: "Bố cục",
    question: "Tôi có thể thay đổi vị trí của slide không?",
    answer:
      "Tất nhiên, Trên bảng bên bạn có thể kéo slide và đặt ở bất cứ đâu bạn muốn.",
  },
  {
    id: 15,
    category: "Bố cục",
    question: "Tôi có thể thêm slide mới giữa các slide không?",
    answer:
      "Có, bạn chỉ cần nhấp vào biểu tượng dấu cộng bên dưới mỗi slide. Nó sẽ hiển thị tất cả các bố cục và chọn bố cục cần thiết.",
  },
  {
    id: 6,
    category: "Bố cục",
    question: "Tôi có thể thêm nhiều phần vào slide của mình không?",
    answer:
      "Hoàn toàn có thể! Rê chuột gần phía dưới của bất kỳ hộp văn bản hoặc khối nội dung nào, và bạn sẽ thấy biểu tượng + xuất hiện. Nhấp vào nút này để thêm một phần mới bên dưới phần hiện tại. Bạn cũng có thể sử dụng menu Chèn để thêm các loại phần cụ thể.",
  },

  {
    id: 8,
    category: "Xuất",
    question: "Làm thế nào để tải xuống hoặc xuất bài thuyết trình của tôi?",
    answer:
      "Nhấp vào nút Xuất trong menu góc trên bên phải. Bạn có thể chọn tải xuống dưới dạng PDF, PowerPoint.",
  },
];

const Help = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState(helpQuestions);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const modalRef = useRef<HTMLDivElement>(null);

  // Extract unique categories and create "All" category list
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(helpQuestions.map((q) => q.category))
    );
    setCategories(["All", ...uniqueCategories]);
  }, []);

  // Filter questions based on search query and selected category
  useEffect(() => {
    let results = helpQuestions;

    // Filter by category if not "All"
    if (selectedCategory !== "All") {
      results = results.filter((q) => q.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (q) =>
          q.question.toLowerCase().includes(query) ||
          q.answer.toLowerCase().includes(query)
      );
    }

    setFilteredQuestions(results);
  }, [searchQuery, selectedCategory]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !event.target.closest(".help-button")
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  // Animation helpers
  const modalClass = isOpen
    ? "opacity-100 scale-100"
    : "opacity-0 scale-95 pointer-events-none";

  return (
    <>
      {/* Help Button */}
      <button
        onClick={handleOpenClose}
        className="help-button hidden fixed bottom-6 right-6 h-12 w-12 z-50 bg-emerald-600 hover:bg-emerald-700 rounded-full md:flex justify-center items-center cursor-pointer shadow-lg transition-all duration-300 hover:shadow-xl"
        aria-label="Help Center"
      >
        {isOpen ? (
          <X className="text-white h-5 w-5" />
        ) : (
          <HelpCircle className="text-white h-5 w-5" />
        )}
      </button>

      {/* Help Modal */}
      <div
        className={`fixed bottom-20 right-6 z-50 max-w-md w-full transition-all duration-300 transform ${modalClass}`}
        ref={modalRef}
      >
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 text-white px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-medium">Trung tâm hỗ trợ</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-emerald-700 p-1 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search */}
          <div className="px-6 pt-4 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm chủ đề trợ giúp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Category Pills */}
          <div className="px-6 pb-3 flex gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="max-h-96 overflow-y-auto px-6 pb-6">
            {filteredQuestions.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredQuestions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <AccordionTrigger className="hover:no-underline py-3 px-1 text-left flex">
                      <div className="flex-1 pr-2">
                        <span className="text-gray-900 font-medium text-sm md:text-base">
                          {faq.question}
                        </span>
                        <span className="block text-xs text-emerald-600 mt-0.5">
                          {faq.category}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-1 pb-3">
                      <div className="text-sm text-gray-600 leading-relaxed rounded bg-gray-50 p-3">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="py-8 text-center text-gray-500">
                <p>No results found for "{searchQuery}"</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-2 text-emerald-600 hover:underline text-sm"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 text-center">
            Still need help?{" "}
            <a href="/contact" className="text-emerald-600 hover:underline">
              Contact Support
            </a>
          </div>
        </div>
      </div>

      {/* Custom AccordionTrigger implementation (since shadcn's might not be available) */}
      {!AccordionTrigger && (
        <style jsx>{`
          .accordion-trigger {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            text-align: left;
            transition: all 0.2s;
          }
          .accordion-trigger:hover {
            background-color: rgba(0, 0, 0, 0.02);
          }
          .accordion-content {
            overflow: hidden;
            height: 0;
            transition: height 0.2s ease;
          }
          .accordion-content[data-state="open"] {
            height: auto;
          }
        `}</style>
      )}
    </>
  );
};

export default Help;
