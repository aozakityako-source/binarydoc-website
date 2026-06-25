export default function Logo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <img
      src="/images/logo.jpg"
      alt="BinaryDoc"
      className={`rounded-full object-cover shrink-0 ${className}`}
    />
  );
}
