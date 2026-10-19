import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';

export const Route = createFileRoute('/')({
  component: HomePage,
});

type Filter = 'all' | 'active' | 'done';
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'done', label: 'Done' },
];

function HomePage() {
  const { todos, add, toggle, edit, remove, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');
  const left = todos.filter((t) => !t.done).length;
  const visible = todos.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done,
  );
  const hasDone = todos.some((t) => t.done);

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:py-20">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight text-neutral-900">My Tasks</h1>
      <p className="mb-6 text-sm text-neutral-500">Double-click a task to edit it.</p>
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <TodoForm onAdd={add} />
        <div className="mt-4 flex gap-1 rounded-lg bg-neutral-100 p-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex-1 rounded-md px-3 py-1 text-xs font-medium ${
                filter === f.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="mt-2">
          <TodoList todos={visible} onToggle={toggle} onEdit={edit} onDelete={remove} />
        </div>
        {todos.length > 0 && (
          <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-500">
            <span>
              {left} {left === 1 ? 'task' : 'tasks'} left
            </span>
            {hasDone && (
              <button onClick={clearCompleted} className="hover:text-red-600">
                Clear completed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
