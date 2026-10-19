import type { Todo } from '@/types/todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

function sortTodos(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (a.dueDate && b.dueDate && a.dueDate !== b.dueDate) return a.dueDate < b.dueDate ? -1 : 1;
    if (a.dueDate !== b.dueDate) return a.dueDate ? -1 : 1;
    return b.createdAt - a.createdAt;
  });
}

export function TodoList({ todos, onToggle, onEdit, onDelete }: Props) {
  if (todos.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-neutral-400">
        Nothing here yet. Add your first task above.
      </p>
    );
  }
  return (
    <ul className="divide-y divide-neutral-100">
      {sortTodos(todos).map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}
