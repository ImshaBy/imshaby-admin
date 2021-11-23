import React from 'react';

import { ReactComponent as LogoSVG } from './icons/imshaby.svg';
import { ReactComponent as BulbSVG } from './icons/bulb.svg';
import { ReactComponent as ClockSVG } from './icons/clock.svg';
import { ReactComponent as HomeSVG } from './icons/home.svg';
import { ReactComponent as LogoutSVG } from './icons/log-out.svg';
import { ReactComponent as LeftArrowSVG } from './icons/left-arrow.svg';
import { ReactComponent as RightArrowSVG } from './icons/right-arrow.svg';
import { ReactComponent as InfinitySVG } from './icons/infinity.svg';
import { ReactComponent as YoutubeSVG } from './icons/youtube.svg';
import { ReactComponent as RoratySVG } from './icons/roraty.svg';
import { ReactComponent as DeleteSVG } from './icons/delete.svg';
import { ReactComponent as EditSVG } from './icons/edit.svg';
import { ReactComponent as PauseSVG } from './icons/pause.svg';
import { ReactComponent as PointsSVG } from './icons/points.svg';
import { ReactComponent as EmailSVG } from './icons/email.svg';
import { ReactComponent as LinkSVG } from './icons/link.svg';
import { ReactComponent as MarkerSVG } from './icons/marker.svg';
import { ReactComponent as PeopleSVG } from './icons/people.svg';
import { ReactComponent as PhoneSVG } from './icons/phone.svg';
import { ReactComponent as CloseSVG } from './icons/close.svg';

import './style.scss';

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
