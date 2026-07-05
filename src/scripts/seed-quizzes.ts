import mongoose from 'mongoose';
import { connectDb } from '../config/db';
import { QuizQuestionModel } from '../models/quiz-question.model';
import { RoadmapModel } from '../models/roadmap.model';
import { quizBank } from '../data/quiz.data';

const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; 
  }
  return Math.abs(hash);
};

const generateMockQuestions = async (stepId: string, count: number = 10) => {
  const seed = hashString(stepId);
  const questions = [];

  let nodeTitle = stepId.substring(0, 8);
  try {
    const roadmap = await RoadmapModel.findOne({ 'roadmapSteps.stepId': stepId });
    if (roadmap) {
      const step = roadmap.roadmapSteps.find(s => s.stepId === stepId);
      if (step) {
        nodeTitle = step.title;
      }
    }
  } catch (error) {
    console.error('Error fetching roadmap step for quiz:', error);
  }

  const lowerTitle = nodeTitle.toLowerCase();
  let templates: string[] = [];
  let optionsPool: string[][] = [];

  if (lowerTitle.includes('api') || lowerTitle.includes('rest') || lowerTitle.includes('rout')) {
    templates = [
      "Phương thức HTTP nào được sử dụng để lấy dữ liệu trong REST API?",
      "Trạng thái HTTP code nào biểu thị việc tạo mới thành công?",
      "Làm thế nào để truyền tham số trên URL trong Express Routing?",
      "Thành phần nào của HTTP Request dùng để chứa dữ liệu bảo mật (như token)?",
      "Middleware trong Express.js thường được sử dụng để làm gì?",
      "Endpoint chuẩn RESTful cho việc cập nhật một user có ID là 123 nên là gì?",
      "Mã trạng thái 404 có ý nghĩa gì trong giao tiếp HTTP?",
      "Sự khác biệt chính giữa PUT và PATCH là gì?",
      "Khi thiết kế REST API, dữ liệu thường được trả về dưới định dạng nào?",
      "CORS (Cross-Origin Resource Sharing) giải quyết vấn đề gì?"
    ];
    optionsPool = [
      ["GET", "POST", "PUT", "DELETE"],
      ["200 OK", "201 Created", "204 No Content", "400 Bad Request"],
      ["req.params", "req.body", "req.headers", "req.data"],
      ["Header", "Body", "Query String", "URL Path"],
      ["Chặn request", "Xác thực, Ghi log, Xử lý lỗi", "Render giao diện", "Kết nối Database"],
      ["POST /users/123", "PUT /users/123", "GET /users/update/123", "PATCH /update_user_123"],
      ["Not Found", "Internal Server Error", "Unauthorized", "Forbidden"],
      ["PUT cập nhật toàn bộ, PATCH cập nhật một phần", "Không có sự khác biệt", "PATCH bảo mật hơn", "PUT nhanh hơn"],
      ["XML", "JSON", "HTML", "YAML"],
      ["Bảo mật CSDL", "Cho phép request từ domain khác", "Chống DDoS", "Tăng tốc độ truy cập"]
    ];
  } else if (lowerTitle.includes('react') || lowerTitle.includes('component') || lowerTitle.includes('ui') || lowerTitle.includes('dom')) {
    templates = [
      "Hook nào trong React được sử dụng để quản lý state?",
      "Sự khác biệt giữa Virtual DOM và Real DOM là gì?",
      "Thuộc tính 'key' trong React lists dùng để làm gì?",
      "Lifecycle method nào tương đương với useEffect khi có dependency rỗng []?",
      "Props trong React có đặc điểm gì?",
      "Context API thường được sử dụng khi nào?",
      "Làm sao để truyền dữ liệu từ component con lên component cha?",
      "React.memo giúp cải thiện hiệu suất bằng cách nào?",
      "Hook useMemo được dùng để giải quyết vấn đề gì?",
      "Event handler trong React được viết dưới dạng nào?"
    ];
    optionsPool = [
      ["useContext", "useState", "useEffect", "useReducer"],
      ["Virtual DOM nhanh hơn nhờ thuật toán Diffing", "Real DOM không thể update", "Virtual DOM chỉ dùng cho mobile", "Không có khác biệt"],
      ["Trang trí UI", "Giúp React xác định phần tử nào thay đổi", "Lưu trữ dữ liệu", "Bảo mật list"],
      ["componentDidMount", "componentDidUpdate", "componentWillUnmount", "render"],
      ["Có thể thay đổi (mutable)", "Chỉ đọc (immutable)", "Chỉ dùng cho state", "Không thể truyền function"],
      ["Tránh props drilling", "Tăng tốc độ render", "Thay thế hoàn toàn Redux", "Quản lý form state"],
      ["Dùng Redux", "Truyền callback function thông qua props", "Dùng Context API", "Dùng ref"],
      ["Cache toàn bộ ứng dụng", "Tránh re-render không cần thiết nếu props không đổi", "Giảm dung lượng bundle", "Tối ưu hóa CSS"],
      ["Cache giá trị tính toán tốn kém", "Cache function reference", "Cache DOM elements", "Cache API response"],
      ["lowercase (onclick)", "camelCase (onClick)", "kebab-case (on-click)", "PascalCase (OnClick)"]
    ];
  } else if (lowerTitle.includes('data') || lowerTitle.includes('sql') || lowerTitle.includes('mongo')) {
    templates = [
      "Đặc điểm chính của cơ sở dữ liệu NoSQL như MongoDB là gì?",
      "Lệnh nào dùng để lấy tất cả bản ghi trong MongoDB?",
      "Trong SQL, từ khóa nào dùng để lọc kết quả?",
      "Khóa chính (Primary Key) có vai trò gì?",
      "Index trong database giúp giải quyết vấn đề gì?",
      "Lệnh JOIN trong SQL dùng để làm gì?",
      "Sự khác biệt giữa Document và Row là gì?",
      "Transaction trong CSDL đảm bảo tính chất gì?",
      "Mongoose trong Node.js đóng vai trò là gì?",
      "Làm thế nào để tạo quan hệ (relationship) trong MongoDB?"
    ];
    optionsPool = [
      ["Sử dụng bảng và khóa ngoại", "Linh hoạt schema, lưu trữ dạng Document", "Chỉ hỗ trợ text search", "Không hỗ trợ index"],
      ["db.collection.find()", "db.collection.getAll()", "SELECT * FROM collection", "db.collection.fetch()"],
      ["ORDER BY", "WHERE", "GROUP BY", "HAVING"],
      ["Định danh duy nhất một bản ghi", "Liên kết các bảng", "Tăng tốc độ tìm kiếm", "Bảo mật dữ liệu"],
      ["Tiết kiệm dung lượng", "Tăng tốc độ truy vấn (đọc dữ liệu)", "Tự động backup", "Mã hóa dữ liệu"],
      ["Gộp kết quả từ nhiều bảng dựa trên điều kiện", "Tạo bảng mới", "Xóa dữ liệu trùng", "Tạo index"],
      ["Document linh hoạt cấu trúc, Row cố định cột", "Không có khác biệt", "Row chỉ dùng cho NoSQL", "Document nhanh hơn"],
      ["ACID", "CAP Theorem", "BASE", "SOLID"],
      ["Trình duyệt web", "ODM (Object Data Modeling)", "Framework CSS", "Thư viện routing"],
      ["Dùng khóa ngoại (Foreign Key)", "Dùng ObjectId reference hoặc embedded document", "Dùng JOIN command", "Không hỗ trợ quan hệ"]
    ];
  } else {
    templates = [
      "Khái niệm cốt lõi nào quan trọng nhất khi bắt đầu học về {skill}?",
      "Lợi ích chính của việc áp dụng {skill} vào thực tế là gì?",
      "Trong {skill}, phương pháp nào giúp tối ưu hóa hiệu suất tốt nhất?",
      "Lỗi phổ biến nhất mà người mới học {skill} thường gặp phải là gì?",
      "Công cụ nào sau đây thường được sử dụng kết hợp với {skill}?",
      "Best practice khi triển khai {skill} trong dự án lớn là gì?",
      "Design pattern nào phù hợp nhất khi làm việc với {skill}?",
      "Đặc điểm nổi bật nhất của {skill} so với các công nghệ khác là gì?",
      "Làm thế nào để debug hiệu quả trong môi trường {skill}?",
      "Bảo mật trong {skill} chủ yếu tập trung vào vấn đề nào?"
    ];
    optionsPool = [
      ["Cú pháp (Syntax)", "Kiến trúc (Architecture)", "Mẫu thiết kế (Design Patterns)", "Best Practices"],
      ["Giảm thời gian code", "Tăng tính bảo mật", "Tối ưu hóa hiệu suất", "Tất cả các ý trên"],
      ["Caching", "Lazy Loading", "Code Splitting", "Tất cả các phương pháp trên"],
      ["Quên xử lý lỗi", "Không tối ưu bộ nhớ", "Sử dụng sai cú pháp", "Không viết unit test"],
      ["Git", "Docker", "VS Code", "Postman"],
      ["Chia nhỏ module", "Viết document đầy đủ", "Áp dụng CI/CD", "Tất cả đều đúng"],
      ["Singleton", "Observer", "Factory", "Strategy"],
      ["Dễ học", "Cộng đồng lớn", "Hiệu năng cao", "Tính linh hoạt"],
      ["Sử dụng console.log", "Dùng debugger tích hợp", "Viết test case", "Đọc kỹ log lỗi"],
      ["XSS", "CSRF", "Injection", "Xác thực & Phân quyền"]
    ];
  }

  const specificQuestionsData = quizBank[stepId] || [];
  const specificQuestions = specificQuestionsData.map((sq, idx) => ({
    stepId,
    questionText: sq.q,
    options: sq.opts,
    correctAnswerIndex: sq.a,
    difficulty: idx < 2 ? 'Easy' : idx < 4 ? 'Medium' : 'Hard'
  }));

  const remaining = Math.max(0, count - specificQuestions.length);

  for (let i = 0; i < remaining; i++) {
    const templateIndex = (seed + i) % templates.length;
    const optionIndex = (seed + i * 2) % optionsPool.length;
    
    const correctIndex = (seed + i) % 4;
    
    questions.push({
      stepId,
      questionText: templates[templateIndex].replace(/\{skill\}/g, nodeTitle),
      options: optionsPool[optionIndex],
      correctAnswerIndex: correctIndex,
      difficulty: i < 3 ? 'Easy' : i < 7 ? 'Medium' : 'Hard'
    });
  }

  return [...specificQuestions, ...questions];
};

const run = async () => {
  try {
    await connectDb();
    console.log('Connected to DB');

    await QuizQuestionModel.deleteMany({});
    console.log('Cleared existing QuizQuestions');

    const allStepIds = Object.keys(quizBank);
    
    let totalInserted = 0;

    for (const stepId of allStepIds) {
      const generated = await generateMockQuestions(stepId, 10);
      await QuizQuestionModel.insertMany(generated);
      totalInserted += generated.length;
    }

    console.log(`Successfully seeded ${totalInserted} questions!`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

run();
