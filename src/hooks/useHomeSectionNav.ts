import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../lib/lenisScroll';

export function useHomeSectionNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (sectionId: string) => {
    const onHome = location.pathname === '/' || location.pathname === '';
    if (onHome) {
      scrollToSection(sectionId);
      return;
    }
    navigate({ pathname: '/', hash: sectionId });
  };
}
