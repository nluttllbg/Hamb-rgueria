import type { ReactNode } from 'react';

interface FeatureItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div data-feature-item className="flex flex-col items-start">
      <div className="text-[#231E1C] mb-3" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-[18px] md:text-[20px] font-bold leading-[1.3] tracking-[-0.01em] text-[#231E1C]">
        {title}
      </h3>
      <p className="mt-2 text-[14px] md:text-[15px] leading-[1.6] text-[#6B625C] max-w-[28ch]">
        {description}
      </p>
    </div>
  );
}
