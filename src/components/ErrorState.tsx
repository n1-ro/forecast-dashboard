interface Props {
  message: string;
}

export default function ErrorState({ message }: Props) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6">
      <div className="text-sm font-medium text-red-700">Something went wrong</div>
      <p className="mt-1 text-sm text-red-600">{message}</p>
    </div>
  );
}
