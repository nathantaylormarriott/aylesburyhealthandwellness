interface TreatmentCardProps {
  title: string;
  description: string;
  priceFrom: string;
  treatments: string[];
  icon: React.ReactNode;
  emphasis?: string;
}

export default function TreatmentCard({
  title,
  description,
  priceFrom,
  treatments,
  icon,
  emphasis
}: TreatmentCardProps) {
  const hasEmphasis = !!emphasis;

  return (
    <div className="bg-[#FFFAF1] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-8">
        <div className={`flex ${hasEmphasis ? 'items-start' : 'items-center'} mb-4 gap-3`}>
          <div className="flex-shrink-0 w-14 h-14 bg-[#83896D] text-white rounded-full flex items-center justify-center">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h3 className="text-2xl font-bold text-[#313C38]">{title}</h3>
              <span className="text-[#1b4660] font-bold text-lg whitespace-nowrap hidden sm:inline">
                {priceFrom}
              </span>
            </div>
            {emphasis && (
              <p className="text-sm text-[#D97706] font-semibold mt-1">{emphasis}</p>
            )}
          </div>
        </div>

        <p className="text-[#313C38] leading-relaxed mb-6">
          {description}
        </p>

        <div className="space-y-2 mb-6">
          {treatments.map((treatment, index) => (
            <div key={index} className="flex items-start gap-3 text-[#313C38]">
              <span className="text-[#83896D] flex-shrink-0 leading-[1.4]">•</span>
              <span className="text-sm font-semibold leading-[1.4]">{treatment}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center sm:justify-end">
          <span className="text-[#1b4660] font-bold text-lg whitespace-nowrap sm:hidden">
            {priceFrom}
          </span>
          <a
            href="https://www.fresha.com/book-now/aylesbury-health-and-wellness-limited-y3lpx75w/services?lid=2792378&share=true&pId=2700687"
            className="px-4 py-2 bg-[#D97706] text-white text-sm rounded-lg hover:bg-[#B45309] transition-all transform hover:scale-105 hover:shadow-lg font-medium"
          >
            View All Treatments
          </a>
        </div>
      </div>
    </div>
  );
}
