import { useState } from 'react';

type Props = { onAdd: (title: string, dueDate: string | null) => void };

export function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [due, setDue] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    onAdd(t, due || null);
    setTitle('');
    setDue('');
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
      />
      <input
        type="date"
        value={due}
        onChange={(e) => setDue(e.target.value)}
        className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-600 outline-none focus:border-indigo-500"
      />
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Add
      </button>
    </form>
  );
}
