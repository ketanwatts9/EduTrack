// ===== Mock Data for the LMS =====
// In a real application this would come from a backend API.
// Here we use static arrays/objects so the app is frontend-only.

export const SAMPLE_VIDEO_URL =
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4'
export const SAMPLE_VIDEO_URL_2 =
  'https://test-videos.co.uk/vids/elephantsdream/mp4/h264/360/Elephants_Dream_360_10s_1MB.mp4'

// ----- Users -----
export const mockUsers = [
  {
    id: 'u-admin-1',
    name: 'System Admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=dc2626&color=fff',
    joinedDate: '2024-01-01',
  },
  {
    id: 'u-inst-1',
    name: 'Dr. Sarah Mitchell',
    email: 'instructor@example.com',
    password: 'instructor123',
    role: 'instructor',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Mitchell&background=2563eb&color=fff',
    bio: 'PhD in Computer Science with 10+ years of teaching experience. Passionate about making programming accessible to everyone.',
    joinedDate: '2024-02-15',
  },
  {
    id: 'u-inst-2',
    name: 'Prof. James Anderson',
    email: 'james@example.com',
    password: 'instructor123',
    role: 'instructor',
    avatar: 'https://ui-avatars.com/api/?name=James+Anderson&background=0f766e&color=fff',
    bio: 'Professor of Software Engineering. Author of three textbooks on Java and data structures.',
    joinedDate: '2024-03-10',
  },
  {
    id: 'u-stu-1',
    name: 'Alex Johnson',
    email: 'student@example.com',
    password: 'student123',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=16a34a&color=fff',
    joinedDate: '2024-06-01',
  },
  {
    id: 'u-stu-2',
    name: 'Emily Davis',
    email: 'emily@example.com',
    password: 'student123',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=f59e0b&color=fff',
    joinedDate: '2024-06-15',
  },
  {
    id: 'u-stu-3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    password: 'student123',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=8b5cf6&color=fff',
    joinedDate: '2024-07-01',
  },
  {
    id: 'u-stu-4',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    password: 'student123',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=ec4899&color=fff',
    joinedDate: '2024-07-20',
  },
  {
    id: 'u-stu-5',
    name: 'David Wilson',
    email: 'david@example.com',
    password: 'student123',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=David+Wilson&background=06b6d4&color=fff',
    joinedDate: '2024-08-05',
  },
]

// ----- Helper to build lessons -----
function lesson(id, title, description, duration, videoUrl) {
  return { id, type: 'lesson', title, description, duration, videoUrl: videoUrl || SAMPLE_VIDEO_URL }
}
function quiz(id, title, questions) {
  return { id, type: 'quiz', title, questions, minScore: 60 }
}
function assignment(id, title, description, deadline) {
  return { id, type: 'assignment', title, description, deadline }
}

// ----- Sample quiz questions -----
const jsQuizQuestions = [
  {
    id: 'q1',
    question: 'Which keyword is used to declare a constant in JavaScript?',
    options: ['var', 'let', 'const', 'static'],
    correctAnswer: 2,
  },
  {
    id: 'q2',
    question: 'What is the output of: console.log(typeof null);',
    options: ['null', 'undefined', 'object', 'number'],
    correctAnswer: 2,
  },
  {
    id: 'q3',
    question: 'Which method adds an element to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 0,
  },
  {
    id: 'q4',
    question: 'What does "===" check for?',
    options: ['Value only', 'Type only', 'Value and type', 'Reference only'],
    correctAnswer: 2,
  },
  {
    id: 'q5',
    question: 'Which is NOT a JavaScript data type?',
    options: ['string', 'boolean', 'float', 'undefined'],
    correctAnswer: 2,
  },
]

const reactQuizQuestions = [
  {
    id: 'rq1',
    question: 'What hook is used for state management in React?',
    options: ['useEffect', 'useState', 'useRef', 'useMemo'],
    correctAnswer: 1,
  },
  {
    id: 'rq2',
    question: 'What does JSX stand for?',
    options: ['Java XML', 'JavaScript XML', 'JSON XML', 'JavaScript Extension'],
    correctAnswer: 1,
  },
  {
    id: 'rq3',
    question: 'Which hook runs after every render?',
    options: ['useState', 'useEffect', 'useMemo', 'useCallback'],
    correctAnswer: 1,
  },
  {
    id: 'rq4',
    question: 'How do you pass data from parent to child?',
    options: ['State', 'Props', 'Context', 'Refs'],
    correctAnswer: 1,
  },
  {
    id: 'rq5',
    question: 'What is a component in React?',
    options: [
      'A CSS class',
      'A reusable UI piece',
      'A database table',
      'A router path',
    ],
    correctAnswer: 1,
  },
]

const javaQuizQuestions = [
  {
    id: 'jq1',
    question: 'Which keyword is used to create a class in Java?',
    options: ['class', 'Class', 'create', 'new'],
    correctAnswer: 0,
  },
  {
    id: 'jq2',
    question: 'What is the parent of all classes in Java?',
    options: ['Class', 'Object', 'Super', 'Main'],
    correctAnswer: 1,
  },
  {
    id: 'jq3',
    question: 'Which is NOT a primitive type in Java?',
    options: ['int', 'boolean', 'String', 'double'],
    correctAnswer: 2,
  },
  {
    id: 'jq4',
    question: 'What does JVM stand for?',
    options: [
      'Java Variable Machine',
      'Java Virtual Machine',
      'Java Verification Module',
      'Java Visual Manager',
    ],
    correctAnswer: 1,
  },
  {
    id: 'jq5',
    question: 'Which keyword prevents method overriding?',
    options: ['static', 'final', 'private', 'abstract'],
    correctAnswer: 1,
  },
]

const pythonQuizQuestions = [
  {
    id: 'pq1',
    question: 'How do you create a variable in Python?',
    options: ['var x = 5', 'x = 5', 'let x = 5', 'declare x = 5'],
    correctAnswer: 1,
  },
  {
    id: 'pq2',
    question: 'What is the correct file extension for Python?',
    options: ['.py', '.python', '.pt', '.pyt'],
    correctAnswer: 0,
  },
  {
    id: 'pq3',
    question: 'Which keyword defines a function in Python?',
    options: ['function', 'def', 'func', 'lambda'],
    correctAnswer: 1,
  },
  {
    id: 'pq4',
    question: 'What does the len() function return?',
    options: ['Last item', 'Length', 'First item', 'Type'],
    correctAnswer: 1,
  },
  {
    id: 'pq5',
    question: 'Which is a Python list?',
    options: ['{1,2,3}', '(1,2,3)', '[1,2,3]', '<1,2,3>'],
    correctAnswer: 2,
  },
]

const sqlQuizQuestions = [
  {
    id: 'sq1',
    question: 'What does SQL stand for?',
    options: [
      'Structured Query Language',
      'Simple Query Language',
      'Standard Query Logic',
      'Structured Question Language',
    ],
    correctAnswer: 0,
  },
  {
    id: 'sq2',
    question: 'Which keyword retrieves data from a database?',
    options: ['GET', 'SELECT', 'FETCH', 'RETRIEVE'],
    correctAnswer: 1,
  },
  {
    id: 'sq3',
    question: 'Which keyword adds a new row?',
    options: ['ADD', 'INSERT', 'CREATE', 'NEW'],
    correctAnswer: 1,
  },
  {
    id: 'sq4',
    question: 'Which clause filters rows?',
    options: ['WHERE', 'FILTER', 'IF', 'MATCH'],
    correctAnswer: 0,
  },
  {
    id: 'sq5',
    question: 'What does PRIMARY KEY do?',
    options: [
      'Encrypts data',
      'Uniquely identifies each row',
      'Sorts data',
      'Counts rows',
    ],
    correctAnswer: 1,
  },
]

const dsaQuizQuestions = [
  {
    id: 'dq1',
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
    correctAnswer: 1,
  },
  {
    id: 'dq2',
    question: 'Which data structure uses FIFO?',
    options: ['Stack', 'Queue', 'Tree', 'Graph'],
    correctAnswer: 1,
  },
  {
    id: 'dq3',
    question: 'What is the time complexity of accessing an array element by index?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
    correctAnswer: 2,
  },
  {
    id: 'dq4',
    question: 'Which data structure uses LIFO?',
    options: ['Queue', 'Stack', 'Array', 'Linked List'],
    correctAnswer: 1,
  },
  {
    id: 'dq5',
    question: 'What is a hash table used for?',
    options: [
      'Sorting',
      'Key-value lookup',
      'Graph traversal',
      'Tree balancing',
    ],
    correctAnswer: 1,
  },
]

// ----- Courses -----
export const mockCourses = [
  {
    id: 'course-js',
    title: 'Complete JavaScript Fundamentals',
    description:
      'Master JavaScript from scratch. Learn variables, functions, objects, arrays, DOM manipulation, and async programming through hands-on examples.',
    instructorId: 'u-inst-1',
    instructorName: 'Dr. Sarah Mitchell',
    category: 'Web Development',
    level: 'Beginner',
    duration: '12 hours',
    price: 0,
    rating: 4.8,
    studentsCount: 320,
    thumbnail: 'https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    requirements: ['Basic computer skills', 'A text editor (VS Code recommended)', 'A web browser'],
    whatYouWillLearn: [
      'Understand JavaScript syntax and core concepts',
      'Work with the DOM and handle events',
      'Use arrays, objects, and functions effectively',
      'Write asynchronous code with promises and async/await',
    ],
    isFeatured: true,
    isPopular: true,
    modules: [
      {
        id: 'mod-js-1',
        title: 'Getting Started with JavaScript',
        items: [
          lesson('js-l1', 'Introduction to JavaScript', 'What JavaScript is and why it matters.', '8 min', SAMPLE_VIDEO_URL),
          lesson('js-l2', 'Variables and Data Types', 'Learn var, let, const and primitive types.', '15 min', SAMPLE_VIDEO_URL_2),
          lesson('js-l3', 'Operators and Expressions', 'Arithmetic, comparison, and logical operators.', '12 min'),
          quiz('js-q1', 'JavaScript Basics Quiz', jsQuizQuestions),
        ],
      },
      {
        id: 'mod-js-2',
        title: 'Functions and the DOM',
        items: [
          lesson('js-l4', 'Functions and Scope', 'Function declarations, arrows, and scope rules.', '18 min'),
          lesson('js-l5', 'Arrays and Objects', 'Working with collections in JavaScript.', '20 min'),
          lesson('js-l6', 'DOM Manipulation', 'Selecting and modifying HTML elements.', '22 min'),
          assignment('js-a1', 'Build a Simple Calculator', 'Create a calculator using HTML, CSS, and JavaScript that can add, subtract, multiply, and divide.', '2024-12-31'),
        ],
      },
    ],
  },
  {
    id: 'course-react',
    title: 'React for Beginners',
    description:
      'Learn React from the ground up. Understand components, props, state, hooks, and routing to build modern single-page applications.',
    instructorId: 'u-inst-1',
    instructorName: 'Dr. Sarah Mitchell',
    category: 'React',
    level: 'Intermediate',
    duration: '10 hours',
    price: 49.99,
    rating: 4.9,
    studentsCount: 510,
    thumbnail: 'https://images.pexels.com/photos/4578665/pexels-photo-4578665.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    requirements: ['Solid JavaScript fundamentals', 'Basic HTML & CSS', 'Node.js installed'],
    whatYouWillLearn: [
      'Build reusable React components',
      'Manage state with useState and useEffect',
      'Use React Router for navigation',
      'Handle forms and user input',
    ],
    isFeatured: true,
    isPopular: true,
    modules: [
      {
        id: 'mod-react-1',
        title: 'React Fundamentals',
        items: [
          lesson('react-l1', 'What is React?', 'An introduction to React and its ecosystem.', '10 min', SAMPLE_VIDEO_URL),
          lesson('react-l2', 'JSX and Components', 'Writing JSX and creating your first component.', '15 min', SAMPLE_VIDEO_URL_2),
          lesson('react-l3', 'Props and State', 'Passing data and managing component state.', '18 min'),
          quiz('react-q1', 'React Basics Quiz', reactQuizQuestions),
        ],
      },
      {
        id: 'mod-react-2',
        title: 'Hooks and Routing',
        items: [
          lesson('react-l4', 'useEffect Hook', 'Side effects and lifecycle with useEffect.', '20 min'),
          lesson('react-l5', 'Lists and Keys', 'Rendering lists with .map() and keys.', '14 min'),
          lesson('react-l6', 'React Router Basics', 'Setting up routes and navigation.', '16 min'),
          assignment('react-a1', 'Build a Todo App', 'Create a todo application with add, delete, and complete functionality using React.', '2024-12-31'),
        ],
      },
    ],
  },
  {
    id: 'course-java',
    title: 'Java Programming Masterclass',
    description:
      'Comprehensive Java course covering syntax, OOP, collections, exception handling, and file I/O. Perfect for college students and job seekers.',
    instructorId: 'u-inst-2',
    instructorName: 'Prof. James Anderson',
    category: 'Java',
    level: 'Beginner',
    duration: '16 hours',
    price: 59.99,
    rating: 4.7,
    studentsCount: 280,
    thumbnail: 'https://images.pexels.com/photos/1972464/pexels-photo-1972464.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    requirements: ['Basic computer knowledge', 'JDK installed', 'An IDE (IntelliJ or Eclipse)'],
    whatYouWillLearn: [
      'Write Java programs from scratch',
      'Understand OOP principles',
      'Work with Java collections framework',
      'Handle exceptions and file operations',
    ],
    isFeatured: false,
    isPopular: true,
    modules: [
      {
        id: 'mod-java-1',
        title: 'Java Basics',
        items: [
          lesson('java-l1', 'Introduction to Java', 'History, features, and "Hello World".', '10 min', SAMPLE_VIDEO_URL),
          lesson('java-l2', 'Variables and Types', 'Primitive types, wrappers, and type casting.', '16 min', SAMPLE_VIDEO_URL_2),
          lesson('java-l3', 'Control Flow', 'if-else, switch, loops in Java.', '18 min'),
          quiz('java-q1', 'Java Basics Quiz', javaQuizQuestions),
        ],
      },
      {
        id: 'mod-java-2',
        title: 'Object-Oriented Programming',
        items: [
          lesson('java-l4', 'Classes and Objects', 'Creating classes, constructors, and objects.', '22 min'),
          lesson('java-l5', 'Inheritance and Polymorphism', 'Extending classes and overriding methods.', '20 min'),
          lesson('java-l6', 'Collections Framework', 'Lists, Sets, and Maps in Java.', '25 min'),
          assignment('java-a1', 'Student Management System', 'Build a console-based student management system using OOP concepts in Java.', '2024-12-31'),
        ],
      },
    ],
  },
  {
    id: 'course-python',
    title: 'Python Programming for Everyone',
    description:
      'Start your programming journey with Python. Learn syntax, data structures, functions, and build real projects. No prior experience needed.',
    instructorId: 'u-inst-1',
    instructorName: 'Dr. Sarah Mitchell',
    category: 'Python',
    level: 'Beginner',
    duration: '14 hours',
    price: 0,
    rating: 4.8,
    studentsCount: 420,
    thumbnail: 'https://images.pexels.com/photos/10816120/pexels-photo-10816120.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    requirements: ['No prior programming experience needed', 'Python 3 installed', 'A code editor'],
    whatYouWillLearn: [
      'Write Python programs with confidence',
      'Use lists, dictionaries, and tuples',
      'Create and use functions',
      'Read and write files in Python',
    ],
    isFeatured: true,
    isPopular: false,
    modules: [
      {
        id: 'mod-py-1',
        title: 'Python Essentials',
        items: [
          lesson('py-l1', 'Getting Started with Python', 'Installation, REPL, and first program.', '10 min', SAMPLE_VIDEO_URL),
          lesson('py-l2', 'Variables and Data Types', 'Integers, floats, strings, and booleans.', '14 min', SAMPLE_VIDEO_URL_2),
          lesson('py-l3', 'Control Structures', 'if-elif-else, for loops, while loops.', '16 min'),
          quiz('py-q1', 'Python Basics Quiz', pythonQuizQuestions),
        ],
      },
      {
        id: 'mod-py-2',
        title: 'Data Structures and Functions',
        items: [
          lesson('py-l4', 'Lists and Tuples', 'Working with sequences in Python.', '18 min'),
          lesson('py-l5', 'Dictionaries and Sets', 'Key-value pairs and unique collections.', '16 min'),
          lesson('py-l6', 'Functions and Modules', 'Defining functions and importing modules.', '20 min'),
          assignment('py-a1', 'Contact Book App', 'Create a contact book that stores names and phone numbers using dictionaries. Allow add, search, and delete.', '2024-12-31'),
        ],
      },
    ],
  },
  {
    id: 'course-sql',
    title: 'SQL & Database Management Systems',
    description:
      'Learn SQL from basics to advanced. Master SELECT, JOIN, subqueries, normalization, and database design principles.',
    instructorId: 'u-inst-2',
    instructorName: 'Prof. James Anderson',
    category: 'Database',
    level: 'Intermediate',
    duration: '8 hours',
    price: 39.99,
    rating: 4.6,
    studentsCount: 190,
    thumbnail: 'https://images.pexels.com/photos/37730211/pexels-photo-37730211.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    requirements: ['Basic computer skills', 'Any SQL database (MySQL, PostgreSQL)', 'Curiosity about data'],
    whatYouWillLearn: [
      'Write SQL queries with confidence',
      'Design normalized databases',
      'Use JOINs and subqueries',
      'Understand indexes and performance',
    ],
    isFeatured: false,
    isPopular: false,
    modules: [
      {
        id: 'mod-sql-1',
        title: 'SQL Fundamentals',
        items: [
          lesson('sql-l1', 'Introduction to Databases', 'What is a database? RDBMS concepts.', '10 min', SAMPLE_VIDEO_URL),
          lesson('sql-l2', 'SELECT Statement', 'Retrieving data with SELECT.', '14 min', SAMPLE_VIDEO_URL_2),
          lesson('sql-l3', 'WHERE and ORDER BY', 'Filtering and sorting results.', '12 min'),
          quiz('sql-q1', 'SQL Basics Quiz', sqlQuizQuestions),
        ],
      },
      {
        id: 'mod-sql-2',
        title: 'Advanced SQL',
        items: [
          lesson('sql-l4', 'JOINs', 'INNER, LEFT, RIGHT, and FULL JOINs.', '20 min'),
          lesson('sql-l5', 'GROUP BY and Aggregates', 'COUNT, SUM, AVG, GROUP BY.', '16 min'),
          lesson('sql-l6', 'Database Design', 'Normalization and primary/foreign keys.', '18 min'),
          assignment('sql-a1', 'Design a Library Database', 'Design and create a library database with books, members, and loans tables. Write queries to find overdue books.', '2024-12-31'),
        ],
      },
    ],
  },
  {
    id: 'course-dsa',
    title: 'Data Structures & Algorithms',
    description:
      'Master DSA for interviews and academics. Covers arrays, linked lists, stacks, queues, trees, sorting, and searching algorithms.',
    instructorId: 'u-inst-2',
    instructorName: 'Prof. James Anderson',
    category: 'Data Structures',
    level: 'Advanced',
    duration: '20 hours',
    price: 69.99,
    rating: 4.9,
    studentsCount: 350,
    thumbnail: 'https://images.pexels.com/photos/25626449/pexels-photo-25626449.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    requirements: ['Good programming knowledge (any language)', 'Basic math skills', 'Dedication to practice'],
    whatYouWillLearn: [
      'Implement core data structures from scratch',
      'Analyze time and space complexity',
      'Apply sorting and searching algorithms',
      'Solve common interview problems',
    ],
    isFeatured: true,
    isPopular: true,
    modules: [
      {
        id: 'mod-dsa-1',
        title: 'Linear Data Structures',
        items: [
          lesson('dsa-l1', 'Arrays and Complexity', 'Array operations and Big-O notation.', '15 min', SAMPLE_VIDEO_URL),
          lesson('dsa-l2', 'Linked Lists', 'Singly and doubly linked lists.', '20 min', SAMPLE_VIDEO_URL_2),
          lesson('dsa-l3', 'Stacks and Queues', 'LIFO and FIFO structures.', '18 min'),
          quiz('dsa-q1', 'Data Structures Quiz', dsaQuizQuestions),
        ],
      },
      {
        id: 'mod-dsa-2',
        title: 'Algorithms',
        items: [
          lesson('dsa-l4', 'Searching Algorithms', 'Linear search and binary search.', '16 min'),
          lesson('dsa-l5', 'Sorting Algorithms', 'Bubble, selection, insertion, merge sort.', '22 min'),
          lesson('dsa-l6', 'Trees and Binary Search', 'Tree traversal and BST operations.', '20 min'),
          assignment('dsa-a1', 'Implement a Phonebook with BST', 'Implement a binary search tree to store and search phonebook entries by name. Support insert, search, and delete.', '2024-12-31'),
        ],
      },
    ],
  },
]

// ----- Mock enrollments (for admin/instructor analytics) -----
export const mockEnrollments = [
  { id: 'enr-1', userId: 'u-stu-1', courseId: 'course-js', enrolledDate: '2024-09-01', progress: 75 },
  { id: 'enr-2', userId: 'u-stu-1', courseId: 'course-react', enrolledDate: '2024-09-15', progress: 40 },
  { id: 'enr-3', userId: 'u-stu-1', courseId: 'course-python', enrolledDate: '2024-08-10', progress: 100 },
  { id: 'enr-4', userId: 'u-stu-2', courseId: 'course-js', enrolledDate: '2024-09-05', progress: 60 },
  { id: 'enr-5', userId: 'u-stu-2', courseId: 'course-java', enrolledDate: '2024-09-20', progress: 30 },
  { id: 'enr-6', userId: 'u-stu-3', courseId: 'course-dsa', enrolledDate: '2024-08-15', progress: 55 },
  { id: 'enr-7', userId: 'u-stu-3', courseId: 'course-sql', enrolledDate: '2024-09-10', progress: 80 },
  { id: 'enr-8', userId: 'u-stu-4', courseId: 'course-python', enrolledDate: '2024-08-20', progress: 90 },
  { id: 'enr-9', userId: 'u-stu-4', courseId: 'course-react', enrolledDate: '2024-09-25', progress: 15 },
  { id: 'enr-10', userId: 'u-stu-5', courseId: 'course-java', enrolledDate: '2024-09-01', progress: 100 },
  { id: 'enr-11', userId: 'u-stu-5', courseId: 'course-dsa', enrolledDate: '2024-09-12', progress: 25 },
  { id: 'enr-12', userId: 'u-stu-2', courseId: 'course-python', enrolledDate: '2024-09-15', progress: 50 },
]

// ----- Mock reviews -----
export const mockReviews = [
  { id: 'rev-1', courseId: 'course-js', userId: 'u-stu-1', userName: 'Alex Johnson', rating: 5, comment: 'Excellent course! Very well explained.', date: '2024-09-20' },
  { id: 'rev-2', courseId: 'course-react', userId: 'u-stu-2', userName: 'Emily Davis', rating: 5, comment: 'Loved the hands-on approach.', date: '2024-09-22' },
  { id: 'rev-3', courseId: 'course-dsa', userId: 'u-stu-3', userName: 'Michael Chen', rating: 4, comment: 'Great for interview prep.', date: '2024-09-18' },
  { id: 'rev-4', courseId: 'course-python', userId: 'u-stu-4', userName: 'Priya Sharma', rating: 5, comment: 'Perfect for beginners!', date: '2024-09-25' },
]

// ----- Categories -----
export const courseCategories = [
  'All',
  'Web Development',
  'React',
  'Java',
  'Python',
  'Database',
  'Data Structures',
]
