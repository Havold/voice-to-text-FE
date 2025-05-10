import { Link } from 'react-router-dom';
import './dropDownMenu.scss';
import { LogoutRounded, Person } from '@mui/icons-material';

const DropDownMenu = ({ size = 'medium', data, top = 50 }) => {
    let width;
    switch (size) {
        case 'large':
            width = 250;
            break;
        case 'small':
            width = 150;
            break;
        default:
            width = 200;
            break;
    }
    return (
        <div style={{ width: `${width}px`, top: `${top}px` }} className="dropDownMenu">
            <ul>
                {data.map((item) => {
                    if (item.href) {
                        return (
                            <Link key={item.id} to={item.href}>
                                <li>
                                    {item.icon}
                                    <span>{item.content}</span>
                                </li>
                            </Link>
                        );
                    }

                    return (
                        <li key={item.id} onClick={item.onClick}>
                            {item.icon}
                            <span>{item.content}</span>
                        </li>
                    );
                })}
            </ul>
            {/* <ul>
                <Link to={`/profile/${currentUser.id}`}>
                    <li>
                        <Person className="icon" />
                        <span>Profile</span>
                    </li>
                </Link>
                <li onClick={handleLogOut}>
                    <LogoutRounded className="icon" />
                    <span>Log out</span>
                </li>
            </ul> */}
        </div>
    );
};

export default DropDownMenu;
