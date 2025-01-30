'use client';

type InputProps = {
  id: string;
  type: string;
  required?: boolean;
};

export default function Input({ id, type, required }: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-light-text dark:text-dark-text"
      >
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-light-primary focus:border-light-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
    </div>
  );
}
