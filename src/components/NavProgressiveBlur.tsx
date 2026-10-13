type NavProgressiveBlurProps = {
  /** Dark wash over the hero photo; light wash once the page content is behind the bar. */
  overHero: boolean;
};

/** Progressive top blur — same technique as AV Associates (Forest Sanctuary template). */
export default function NavProgressiveBlur({ overHero }: NavProgressiveBlurProps) {
  return (
    <div className="gradient-blur site-nav-blur" aria-hidden>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div className={`nav-blur-tint nav-blur-tint-dark ${overHero ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`nav-blur-tint nav-blur-tint-light ${overHero ? 'opacity-0' : 'opacity-100'}`} />
    </div>
  );
}
