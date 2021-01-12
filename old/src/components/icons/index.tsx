import React from "react";
import LogoSVG from "./icons/imshaby.svg";
import BulbSVG from "./icons/bulb.svg";
import ClockSVG from "./icons/clock.svg";
import HomeSVG from "./icons/home.svg";
import LogoutSVG from "./icons/log-out.svg";
import LeftArrowSVG from "./icons/left-arrow.svg";
import RightArrowSVG from "./icons/right-arrow.svg";
import InfinitySVG from "./icons/infinity.svg";
import YoutubeSVG from "./icons/youtube.svg";
import DeleteSVG from "./icons/delete.svg";
import EditSVG from "./icons/edit.svg";
import PauseSVG from "./icons/pause.svg";
import PointsSVG from "./icons/points.svg";
import CloseSVG from "./icons/close.svg";
import "./style.scss";

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
export const DeleteIcon = ({ className } : props) => <DeleteSVG className={className} />;
export const EditIcon = ({ className } : props) => <EditSVG className={className} />;
export const PauseIcon = ({ className } : props) => <PauseSVG className={className} />;
export const PointsIcon = ({ className } : props) => <PointsSVG className={className} />;
export const CloseIcon = ({ className } : props) => <CloseSVG className={className} />;

