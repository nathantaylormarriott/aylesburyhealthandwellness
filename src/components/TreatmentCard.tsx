const imageFadeStyle = {
  background: [
    'linear-gradient(to top,',
    '#FFFAF1 0%,',
    '#FFFAF1 10%,',
    'rgba(255, 250, 241, 0.97) 18%,',
    'rgba(255, 250, 241, 0.88) 28%,',
    'rgba(255, 250, 241, 0.72) 40%,',
    'rgba(255, 250, 241, 0.52) 52%,',
    'rgba(255, 250, 241, 0.32) 64%,',
    'rgba(255, 250, 241, 0.14) 78%,',
    'rgba(255, 250, 241, 0.04) 90%,',
    'transparent 100%)',
  ].join(' '),
};

interface TreatmentCardProps {
  id: string;
  title: string;
  description: string;
  priceFrom?: string;
  treatments: string[];
  icon: React.ReactNode;
  emphasis?: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  href: string;
}

export default function TreatmentCard({
  id,
  title,
  description,
  priceFrom,
  treatments,
  icon,
  emphasis,
  image,
  imageAlt,
  imagePosition = 'object-center',
  href,
}: TreatmentCardProps) {
  return (
    <a
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Learn more about ${title} — book on Fresha`}
      className="group flex h-full min-h-0 flex-col overflow-hidden rounded-3xl bg-[#FFFAF1] shadow-[0_18px_40px_-28px_rgba(20,24,22,0.55)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_50px_-28px_rgba(20,24,22,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A6252]"
    >
      <div
        className="relative h-[13.5rem] shrink-0 overflow-hidden bg-[#FFFAF1] sm:h-[14.5rem] md:h-[15.75rem] lg:h-[17rem]"
      >
        <img
          src={image}
          alt={imageAlt}
          className={`absolute inset-0 h-full w-full object-cover object-[center_78%] ${imagePosition}`}
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden style={imageFadeStyle} />
        <div
          className="absolute left-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#5A6252] text-white shadow-[0_6px_16px_-4px_rgba(20,24,22,0.45)] sm:left-4 sm:top-4 sm:h-11 sm:w-11 [&_svg]:h-5 [&_svg]:w-5"
          aria-hidden
        >
          {icon}
        </div>
        {priceFrom ? (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-[#FFFAF1]/80 px-3 py-1 text-[11px] font-medium tracking-wide text-[#313C38] backdrop-blur-md sm:right-4 sm:top-4 sm:text-xs">
            {priceFrom}
          </span>
        ) : null}
      </div>

      <div className="relative z-[2] -mt-8 flex min-h-0 flex-1 flex-col px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
        <h3 className="text-xl font-semibold leading-tight text-[#313C38] sm:text-2xl">{title}</h3>
        {emphasis ? <p className="mt-1 text-sm font-medium text-[#6B7A5B]">{emphasis}</p> : null}

        <p className="mt-1.5 text-xs leading-relaxed text-[#313C38]/85 sm:text-sm">{description}</p>

        <ul className="mt-2.5 space-y-1">
          {treatments.map((treatment) => (
            <li key={treatment} className="flex items-start gap-2 text-[#313C38]">
              <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-[#83896D]" aria-hidden />
              <span className="text-xs font-medium leading-snug sm:text-sm">{treatment}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex justify-end pt-3">
          <span
            className="rounded-full bg-[#313C38] px-3 py-1.5 text-[11px] font-medium text-white transition-all group-hover:bg-[#4a574f] group-hover:shadow-lg sm:px-3.5 sm:py-2 sm:text-xs"
          >
            Learn more
          </span>
        </div>
      </div>
    </a>
  );
}
