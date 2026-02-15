# 🎯 Task Board - SQLite Schema

Run these commands to set up:

```bash
sqlite3 tasks.db

-- Projects table
CREATE TABLE projects (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  folder TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tickets table
CREATE TABLE tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  ticket_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  priority TEXT DEFAULT 'medium',
  assignee TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Activity log
CREATE TABLE activity (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id INTEGER,
  action TEXT NOT NULL,
  user TEXT DEFAULT 'system',
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample projects
INSERT INTO projects (name, folder) VALUES ('RedditAutoMarket', 'projects/reddit-marketing-tool');
INSERT INTO projects (name, folder) VALUES ('B2B Ebook', 'projects/b2b-ebook');
INSERT INTO projects (name, folder) VALUES ('Whop Course', 'projects/whop-course-ai-automation');

-- Insert sample tickets for RedditAutoMarket
INSERT INTO tickets (project_id, ticket_id, title, status, priority) VALUES 
  (1, 'TICKET-025', 'Deploy to EC2 with Docker', 'in_progress', 'high'),
  (1, 'TICKET-026', 'Set up CI/CD pipeline', 'todo', 'high'),
  (1, 'TICKET-029', 'QA - Full feature testing', 'todo', 'high'),
  (1, 'TICKET-030', 'Documentation and runbook', 'todo', 'medium');

-- Insert sample tickets for Whop Course
INSERT INTO tickets (project_id, ticket_id, title, status, priority) VALUES 
  (3, 'COURSE-001', 'Video scripts for Module 1', 'todo', 'high'),
  (3, 'COURSE-002', 'Video scripts for Module 2', 'todo', 'high'),
  (3, 'COURSE-003', 'Create course slides', 'todo', 'medium'),
  (3, 'COURSE-004', 'Set up Whop product page', 'todo', 'high');
```

---

## Usage

### View all tickets:
```sql
SELECT p.name, t.ticket_id, t.title, t.status, t.priority 
FROM tickets t 
JOIN projects p ON t.project_id = p.id 
ORDER BY p.name, t.status;
```

### Move ticket to in progress:
```sql
UPDATE tickets SET status = 'in_progress', updated_at = CURRENT_TIMESTAMP 
WHERE ticket_id = 'TICKET-025';
```

### Complete ticket:
```sql
UPDATE tickets SET status = 'done', completed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP 
WHERE ticket_id = 'TICKET-025';
```

### Add activity:
```sql
INSERT INTO activity (ticket_id, action, notes) 
VALUES (1, 'status_change', 'Moved to in progress');
```
