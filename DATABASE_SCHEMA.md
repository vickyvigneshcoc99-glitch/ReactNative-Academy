# 🗄️ Database Schema Design

This document outlines the database schema for implementing user progress tracking, authentication, and community features in React Native Academy.

## 📊 Schema Overview

```
Users → Progress → Lessons
  ↓        ↓
Achievements  ↓
  ↓      Quizzes
Certificates
```

---

## 📋 Tables

### 1. Users Table

Stores user account information and authentication data.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  avatar_url TEXT,
  bio TEXT,
  github_username VARCHAR(100),
  twitter_username VARCHAR(100),
  website_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  is_verified BOOLEAN DEFAULT FALSE,
  is_premium BOOLEAN DEFAULT FALSE,
  role VARCHAR(20) DEFAULT 'student' -- student, instructor, admin
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_created_at ON users(created_at DESC);
```

**Fields:**
- `id`: Unique user identifier
- `email`: User's email (for login and notifications)
- `username`: Public display name
- `password_hash`: Bcrypt hashed password
- `full_name`: User's real name (optional)
- `avatar_url`: Profile picture URL
- `bio`: Short user bio
- `github_username`, `twitter_username`: Social links
- `is_verified`: Email verification status
- `is_premium`: Premium subscription status
- `role`: User role (student/instructor/admin)

---

### 2. Lessons Table

Stores lesson metadata and content.

```sql
CREATE TABLE lessons (
  id INTEGER PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL, -- Markdown content
  duration_minutes INTEGER NOT NULL,
  difficulty VARCHAR(20) NOT NULL, -- beginner, intermediate, advanced
  order_index INTEGER NOT NULL,
  icon_emoji VARCHAR(10),
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_lessons_slug ON lessons(slug);
CREATE INDEX idx_lessons_difficulty ON lessons(difficulty);
CREATE INDEX idx_lessons_order ON lessons(order_index);
```

**Fields:**
- `id`: Lesson number (1-12)
- `title`: Lesson title
- `slug`: URL-friendly slug
- `description`: Short description
- `content`: Full lesson content in Markdown
- `duration_minutes`: Estimated completion time
- `difficulty`: Beginner, Intermediate, or Advanced
- `order_index`: Display order
- `icon_emoji`: Emoji icon for the lesson

---

### 3. Lesson Topics Table

Many-to-many relationship between lessons and topics.

```sql
CREATE TABLE lesson_topics (
  id SERIAL PRIMARY KEY,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  topic VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_lesson_topics_lesson_id ON lesson_topics(lesson_id);
CREATE INDEX idx_lesson_topics_topic ON lesson_topics(topic);
```

**Example Topics:**
- View, Text, Image (Lesson 1)
- Flexbox, Layout, Positioning (Lesson 2)
- TouchableOpacity, Gestures, Events (Lesson 3)

---

### 4. User Progress Table

Tracks user progress through lessons.

```sql
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'not_started', 
  -- not_started, in_progress, completed
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  time_spent_seconds INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP,
  completion_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Indexes
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson_id ON user_progress(lesson_id);
CREATE INDEX idx_user_progress_status ON user_progress(status);
```

**Fields:**
- `status`: Current progress status
- `started_at`: When user first opened the lesson
- `completed_at`: When user marked as complete
- `time_spent_seconds`: Total time spent on lesson
- `completion_percentage`: 0-100 progress indicator

---

### 5. Quizzes Table

Stores quiz questions for each lesson.

```sql
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  question_type VARCHAR(20) NOT NULL, -- multiple_choice, true_false, code
  options JSONB, -- Array of answer options
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty VARCHAR(20),
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_quizzes_lesson_id ON quizzes(lesson_id);
```

**Example Quiz:**
```json
{
  "question": "What is the default flexDirection in React Native?",
  "question_type": "multiple_choice",
  "options": ["row", "column", "row-reverse", "column-reverse"],
  "correct_answer": "column",
  "explanation": "Unlike React Web which defaults to 'row', React Native defaults to 'column'."
}
```

---

### 6. Quiz Attempts Table

Tracks user quiz attempts and scores.

```sql
CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  user_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  attempted_at TIMESTAMP DEFAULT NOW(),
  time_taken_seconds INTEGER
);

-- Indexes
CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
CREATE INDEX idx_quiz_attempts_lesson_id ON quiz_attempts(lesson_id);
```

---

### 7. Code Submissions Table

Stores user code submissions from the playground.

```sql
CREATE TABLE code_submissions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE SET NULL,
  title VARCHAR(200),
  code TEXT NOT NULL,
  language VARCHAR(20) DEFAULT 'javascript',
  is_public BOOLEAN DEFAULT FALSE,
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  snack_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_code_submissions_user_id ON code_submissions(user_id);
CREATE INDEX idx_code_submissions_lesson_id ON code_submissions(lesson_id);
CREATE INDEX idx_code_submissions_is_public ON code_submissions(is_public);
CREATE INDEX idx_code_submissions_likes ON code_submissions(likes_count DESC);
```

**Use Cases:**
- Save playground code
- Share code with community
- Build a portfolio
- Get feedback from instructors

---

### 8. Achievements Table

Defines available achievements/badges.

```sql
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  icon_emoji VARCHAR(10),
  criteria JSONB NOT NULL, -- Conditions to unlock
  points INTEGER DEFAULT 0,
  rarity VARCHAR(20), -- common, rare, epic, legendary
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Example Achievements:**
```json
[
  {
    "name": "First Steps",
    "description": "Complete your first lesson",
    "icon_emoji": "🎯",
    "criteria": { "lessons_completed": 1 },
    "points": 10,
    "rarity": "common"
  },
  {
    "name": "Flexbox Master",
    "description": "Complete Lesson 2 with 100% quiz score",
    "icon_emoji": "📐",
    "criteria": { "lesson_id": 2, "quiz_score": 100 },
    "points": 50,
    "rarity": "rare"
  },
  {
    "name": "Code Warrior",
    "description": "Submit 10 code examples",
    "icon_emoji": "⚔️",
    "criteria": { "code_submissions": 10 },
    "points": 100,
    "rarity": "epic"
  }
]
```

---

### 9. User Achievements Table

Tracks which achievements users have unlocked.

```sql
CREATE TABLE user_achievements (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id INTEGER REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Indexes
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_achievement_id ON user_achievements(achievement_id);
```

---

### 10. Certificates Table

Stores generated certificates for course completion.

```sql
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  certificate_type VARCHAR(50) NOT NULL, -- course_completion, lesson_mastery
  title VARCHAR(200) NOT NULL,
  description TEXT,
  issued_at TIMESTAMP DEFAULT NOW(),
  certificate_url TEXT, -- PDF or image URL
  verification_code VARCHAR(50) UNIQUE NOT NULL,
  is_public BOOLEAN DEFAULT TRUE
);

-- Indexes
CREATE INDEX idx_certificates_user_id ON certificates(user_id);
CREATE INDEX idx_certificates_verification_code ON certificates(verification_code);
```

**Certificate Types:**
- `course_completion`: Completed all 12 lessons
- `lesson_mastery`: 100% score on all quizzes in a lesson
- `code_champion`: 50+ code submissions

---

### 11. Comments Table

User comments on lessons and code submissions.

```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  code_submission_id INTEGER REFERENCES code_submissions(id) ON DELETE CASCADE,
  parent_comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_instructor_reply BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_lesson_id ON comments(lesson_id);
CREATE INDEX idx_comments_code_submission_id ON comments(code_submission_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_comment_id);
```

---

### 12. Bookmarks Table

User bookmarks for lessons and code examples.

```sql
CREATE TABLE bookmarks (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  code_submission_id INTEGER REFERENCES code_submissions(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, lesson_id),
  UNIQUE(user_id, code_submission_id)
);

-- Indexes
CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
```

---

## 🔐 Authentication & Security

### Password Hashing
```javascript
import bcrypt from 'bcrypt';

// Hash password
const saltRounds = 10;
const passwordHash = await bcrypt.hash(password, saltRounds);

// Verify password
const isValid = await bcrypt.compare(password, passwordHash);
```

### JWT Tokens
```javascript
import jwt from 'jsonwebtoken';

// Generate token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

---

## 📊 Useful Queries

### Get User Progress
```sql
SELECT 
  l.id,
  l.title,
  l.difficulty,
  up.status,
  up.completion_percentage,
  up.completed_at
FROM lessons l
LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = $1
ORDER BY l.order_index;
```

### Calculate Overall Progress
```sql
SELECT 
  COUNT(*) FILTER (WHERE status = 'completed') * 100.0 / COUNT(*) as completion_percentage,
  COUNT(*) FILTER (WHERE status = 'completed') as completed_lessons,
  COUNT(*) as total_lessons
FROM user_progress
WHERE user_id = $1;
```

### Get Leaderboard
```sql
SELECT 
  u.username,
  u.avatar_url,
  COUNT(DISTINCT up.lesson_id) FILTER (WHERE up.status = 'completed') as lessons_completed,
  COUNT(DISTINCT ua.achievement_id) as achievements_count,
  SUM(a.points) as total_points
FROM users u
LEFT JOIN user_progress up ON u.id = up.user_id
LEFT JOIN user_achievements ua ON u.id = ua.user_id
LEFT JOIN achievements a ON ua.achievement_id = a.id
GROUP BY u.id, u.username, u.avatar_url
ORDER BY total_points DESC
LIMIT 10;
```

### Get User Achievements
```sql
SELECT 
  a.name,
  a.description,
  a.icon_emoji,
  a.rarity,
  a.points,
  ua.unlocked_at
FROM user_achievements ua
JOIN achievements a ON ua.achievement_id = a.id
WHERE ua.user_id = $1
ORDER BY ua.unlocked_at DESC;
```

---

## 🚀 Implementation Steps

### Phase 1: Basic Auth
1. Set up PostgreSQL database
2. Implement user registration
3. Add login/logout
4. Create protected routes

### Phase 2: Progress Tracking
1. Track lesson starts/completions
2. Calculate completion percentages
3. Display progress on dashboard
4. Add time tracking

### Phase 3: Quizzes
1. Create quiz questions
2. Implement quiz UI
3. Track attempts and scores
4. Show correct answers after submission

### Phase 4: Community
1. Code submissions
2. Comments system
3. Likes and bookmarks
4. Public profiles

### Phase 5: Gamification
1. Define achievements
2. Implement unlock logic
3. Generate certificates
4. Create leaderboard

---

## 🛠️ Technology Stack

### Database
- **PostgreSQL 15+** - Relational database
- **Prisma** - ORM for type-safe queries
- **Supabase** - Hosted PostgreSQL with auth

### Backend
- **Next.js API Routes** - Serverless functions
- **NextAuth.js** - Authentication
- **Zod** - Schema validation

### Example Prisma Schema
```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  username      String    @unique
  passwordHash  String
  fullName      String?
  avatarUrl     String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  progress      UserProgress[]
  achievements  UserAchievement[]
  submissions   CodeSubmission[]
  
  @@index([email])
  @@index([username])
}

model Lesson {
  id              Int       @id
  title           String
  slug            String    @unique
  description     String
  content         String
  durationMinutes Int
  difficulty      String
  orderIndex      Int
  iconEmoji       String?
  isPublished     Boolean   @default(false)
  
  progress        UserProgress[]
  topics          LessonTopic[]
  
  @@index([slug])
  @@index([difficulty])
}

model UserProgress {
  id                    Int       @id @default(autoincrement())
  userId                String
  lessonId              Int
  status                String    @default("not_started")
  startedAt             DateTime?
  completedAt           DateTime?
  timeSpentSeconds      Int       @default(0)
  completionPercentage  Int       @default(0)
  
  user                  User      @relation(fields: [userId], references: [id])
  lesson                Lesson    @relation(fields: [lessonId], references: [id])
  
  @@unique([userId, lessonId])
  @@index([userId])
  @@index([lessonId])
}
```

---

## 📈 Analytics & Metrics

### Track These Metrics
- Daily active users (DAU)
- Lesson completion rates
- Average time per lesson
- Quiz scores distribution
- Code submission frequency
- User retention (7-day, 30-day)
- Most popular lessons
- Drop-off points

### Example Analytics Query
```sql
-- Daily active users
SELECT 
  DATE(last_accessed_at) as date,
  COUNT(DISTINCT user_id) as active_users
FROM user_progress
WHERE last_accessed_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(last_accessed_at)
ORDER BY date;

-- Lesson completion funnel
SELECT 
  lesson_id,
  COUNT(*) FILTER (WHERE status = 'in_progress') as started,
  COUNT(*) FILTER (WHERE status = 'completed') as completed,
  COUNT(*) FILTER (WHERE status = 'completed') * 100.0 / 
    NULLIF(COUNT(*) FILTER (WHERE status IN ('in_progress', 'completed')), 0) as completion_rate
FROM user_progress
GROUP BY lesson_id
ORDER BY lesson_id;
```

---

## 🔒 Privacy & GDPR

### Data to Collect
- ✅ Email (required for account)
- ✅ Username (public)
- ✅ Progress data (for features)
- ✅ Quiz attempts (for learning)

### User Rights
- **Right to Access**: Export all user data
- **Right to Delete**: Cascade delete on account removal
- **Right to Portability**: JSON export of all data
- **Right to Rectification**: Edit profile anytime

### Implementation
```sql
-- Export user data
SELECT json_build_object(
  'user', row_to_json(u.*),
  'progress', (SELECT json_agg(row_to_json(up.*)) FROM user_progress up WHERE up.user_id = u.id),
  'achievements', (SELECT json_agg(row_to_json(ua.*)) FROM user_achievements ua WHERE ua.user_id = u.id),
  'submissions', (SELECT json_agg(row_to_json(cs.*)) FROM code_submissions cs WHERE cs.user_id = u.id)
) as user_data
FROM users u
WHERE u.id = $1;

-- Delete user (cascades automatically)
DELETE FROM users WHERE id = $1;
```

---

**This schema is production-ready and scalable for thousands of users!** 🚀
