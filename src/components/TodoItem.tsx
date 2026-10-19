import { useState } from 'react';
import type { Todo } from '@/types/todo';
import { formatDue, isOverdue } from '@/lib/dates';

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.title);
  const overdue = !todo.done && isOverdue(todo.dueDate);

  function save() {
    const t = text.trim();
    if (t) onEdit(todo.id, t);
    else setText(todo.title);
    setEditing(false);
  }

  return (
    <li className="group flex items-center gap-3 py-3">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4 accent-indigo-600"
      />
      <div className="min-w-0 flex-1">
        {editing ? (
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save();
              if (e.key === 'Escape') {
                setText(todo.title);
                setEditing(false);
              }
            }}
            className="w-full rounded border border-indigo-300 px-2 py-0.5 text-sm outline-none"
          />
        ) : (
          <p
            onDoubleClick={() => setEditing(true)}
            className={`truncate text-sm ${todo.done ? 'text-neutral-400 line-through' : 'text-neutral-800'}`}
          >
            {todo.title}
          </p>
        )}
        {todo.dueDate && (
          <p className={`text-xs ${overdue ? 'font-medium text-red-600' : 'text-neutral-400'}`}>
            {overdue ? 'Overdue · ' : 'Due '}
            {formatDue(todo.dueDate)}
          </p>
        )}
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
        className="text-neutral-300 hover:text-red-500"
      >
        ✕
      </button>
    </li>
  );
}
