interface Props {
  label?: string;
}

export default function LoadingState({ label = 'Loading…' }: Props) {
  return (
    <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-10">
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
        {label}
      </div>
    </div>
  );
}
