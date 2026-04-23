interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export function Section({ children, className }: SectionProps) {
  return (
    <section
      className={`border border-gray-200 shadow-sm rounded-lg px-10 py-8 ${className ?? ''}`}
    >
      {children}
    </section>
  );
}
