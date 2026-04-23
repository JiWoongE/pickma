interface SectionProps {
  children: React.ReactNode;
  className?: String;
}

export function Section({ children, className }: SectionProps) {
  return (
    <section
      className={`max-w-screen-xl mx-auto px-20 py-8 ${className ?? ''}`}
    >
      {children}
    </section>
  );
}
