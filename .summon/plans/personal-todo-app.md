---
status: implemented
title: Personal todo app with due dates
---

1. **Task type** – Create `src/types/todo.ts` describing a task: id, title, done flag, optional due date, created time. Outcome: one shared shape for all components.
2. **Storage hook** – Create `src/hooks/useTodos.ts` that holds the task list, saves it to the browser's local storage, and exposes add, toggle, edit, delete and clear-completed actions. Outcome: tasks persist between visits.
3. **Date helpers** – Create `src/lib/dates.ts` to format due dates in friendly text ("Today", "Tomorrow", "Mar 5") and detect overdue tasks. Outcome: consistent date display.
4. **Components** – In `src/components/`:
   - `TodoForm.tsx`: text input plus optional date picker and Add button.
   - `TodoItem.tsx`: checkbox, title (struck through when done), due-date label (red when overdue), delete button, and inline editing on double-click.
   - `TodoList.tsx`: renders items, sorted with open tasks by due date first and completed ones at the bottom, with a friendly empty state.
5. **Home page** – Update `src/routes/index.tsx` to show a centered card with the heading, form, list, an "X tasks left" counter and a "Clear completed" button. Outcome: the full app works on the home page.
6. **Look and feel** – Update `src/routes/__root.tsx` and `src/styles/global.css` for a clean, minimal style: light neutral background, plenty of whitespace, a single accent color, subtle borders, and a responsive layout for phones.
7. **Check** – Confirm adding, completing, editing, deleting, overdue highlighting and persistence after reload all work.
