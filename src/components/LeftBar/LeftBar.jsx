import "./leftBar.scss";
import {
  GroupRounded,
  Diversity1Rounded,
  StorefrontRounded,
  TvRounded,
  LocalFloristRounded,
  CalendarMonthRounded,
  SportsEsportsRounded,
  CollectionsRounded,
  OndemandVideoRounded,
  MessageRounded,
  PaidRounded,
  HelpRounded,
  LocalLibraryRounded,
} from "@mui/icons-material";

const LeftBar = () => {
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="item">
            <GroupRounded className="icon" />
            <span>Friends</span>
          </div>
          <div className="item">
            <Diversity1Rounded className="icon" />
            <span>Groups</span>
          </div>
          <div className="item">
            <StorefrontRounded className="icon" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <TvRounded className="icon" />
            <span>Watch</span>
          </div>
          <div className="item">
            <LocalFloristRounded className="icon" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span className="title">Your shortcuts</span>
          <div className="item">
            <CalendarMonthRounded className="icon" />
            <span>Events</span>
          </div>
          <div className="item">
            <SportsEsportsRounded className="icon" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <CollectionsRounded className="icon" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <OndemandVideoRounded className="icon" />
            <span>Videos</span>
          </div>
          <div className="item">
            <MessageRounded className="icon" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span className="title">Others</span>
          <div className="item">
            <PaidRounded className="icon" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <HelpRounded className="icon" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <LocalLibraryRounded className="icon" />
            <span>Courses</span>
          </div>
          <div className="item">
            <LocalLibraryRounded className="icon" />
            <span>Courses</span>
          </div>
          <div className="item">
            <LocalLibraryRounded className="icon" />
            <span>Courses</span>
          </div>
          <div className="item">
            <LocalLibraryRounded className="icon" />
            <span>Courses</span>
          </div>
          <div className="item">
            <LocalLibraryRounded className="icon" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
