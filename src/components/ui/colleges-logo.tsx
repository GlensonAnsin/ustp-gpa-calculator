import ceaLogo from '../../assets/cea-logo.png';
import citcLogo from '../../assets/citc-logo.png';
import csmLogo from '../../assets/csm-logo.png';
import csteLogo from '../../assets/cste-logo.jpg';
import cotLogo from '../../assets/cot-logo.png';

const COLLEGE_LOGO_MAP = {
  CEA: ceaLogo,
  CITC: citcLogo,
  CSM: csmLogo,
  CSTE: csteLogo,
  COT: cotLogo,
};

const DEFAULT_LOGO = ceaLogo;

export const CollegeLogo = ({ college, width, height }: { college: string; width: number; height: number }) => {
  const logoSrc = COLLEGE_LOGO_MAP[college as keyof typeof COLLEGE_LOGO_MAP] || DEFAULT_LOGO;

  return (
    <div className="p-5 bg-white place-self-center w-fit rounded-xl mb-5 shadow-xl">
      <img src={logoSrc} alt={`${college} Logo`} width={width} height={height} className="object-contain" />
    </div>
  );
};
