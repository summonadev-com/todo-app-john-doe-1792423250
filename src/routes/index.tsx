import { createFileRoute } from '@tanstack/react-router';
import { useTodos } from '@/hooks/useTodos';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { todos, add, toggle, edit, remove, clearCompleted } = useTodos();
  const left = todos.filter((t) => !t.done).length;
  const hasDone = todos.some((t) => t.done);

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:py-20">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight text-neutral-900">My Tasks</h1>
      <p className="mb-6 text-sm text-neutral-500">Double-click a task to edit it.</p>
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <TodoForm onAdd={add} />
        <div className="mt-4">
          <TodoList todos={todos} onToggle={toggle} onEdit={edit} onDelete={remove} />
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
