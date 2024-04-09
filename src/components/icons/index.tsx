import './style.scss';

import BulbSVG from './icons/bulb.svg?react';
import ClockSVG from './icons/clock.svg?react';
import CloseSVG from './icons/close.svg?react';
import DeleteSVG from './icons/delete.svg?react';
import EditSVG from './icons/edit.svg?react';
import EmailSVG from './icons/email.svg?react';
import HomeSVG from './icons/home.svg?react';
import LogoSVG from './icons/imshaby.svg?react';
import InfinitySVG from './icons/infinity.svg?react';
import LeftArrowSVG from './icons/left-arrow.svg?react';
import LinkSVG from './icons/link.svg?react';
import LogoutSVG from './icons/log-out.svg?react';
import MarkerSVG from './icons/marker.svg?react';
import PauseSVG from './icons/pause.svg?react';
import PeopleSVG from './icons/people.svg?react';
import PhoneSVG from './icons/phone.svg?react';
import PointsSVG from './icons/points.svg?react';
import RightArrowSVG from './icons/right-arrow.svg?react';
import RoratySVG from './icons/roraty.svg?react';
import YoutubeSVG from './icons/youtube.svg?react';

interface props {
  className?: string
}

export const LogoIcon = ({ className } : props) => <LogoSVG className={className} />;
export const BulbIcon = ({ className } : props) => <BulbSVG className={className} />;
export const ClockIcon = ({ className } : props) => <ClockSVG className={className} />;
export const HomeIcon = ({ className } : props) => <HomeSVG className={className} />;
export const LogoutIcon = ({ className } : props) => <LogoutSVG className={className} />;
export const LeftArrowIcon = ({ className } : props) => <LeftArrowSVG className={className} />;
export const RightArrowIcon = ({ className } : props) => <RightArrowSVG className={className} />;
export const InfinityIcon = ({ className } : props) => <InfinitySVG className={className} />;
export const YoutubeIcon = ({ className } : props) => <YoutubeSVG className={className} />;
export const RoratyIcon = ({ className } : props) => <RoratySVG className={className} />;
export const DeleteIcon = ({ className } : props) => <DeleteSVG className={className} />;
export const EditIcon = ({ className } : props) => <EditSVG className={className} />;
export const PauseIcon = ({ className } : props) => <PauseSVG className={className} />;
export const PointsIcon = ({ className } : props) => <PointsSVG className={className} />;
export const EmailIcon = ({ className } : props) => <EmailSVG className={className} />;
export const LinkIcon = ({ className } : props) => <LinkSVG className={className} />;
export const MarkerIcon = ({ className } : props) => <MarkerSVG className={className} />;
export const PeopleIcon = ({ className } : props) => <PeopleSVG className={className} />;
export const PhoneIcon = ({ className } : props) => <PhoneSVG className={className} />;
export const CloseIcon = ({ className } : props) => <CloseSVG className={className} />;
