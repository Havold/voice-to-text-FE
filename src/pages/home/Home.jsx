import './home.scss';
import Button from '../../components/Button/Button';

const Home = () => {
    return (
        <div className="section">
            <div className="content">
                <div className="welcome">
                    <span className="subTitle">WELCOME TO</span>
                    <h1 className="title">VOTEXTGUARD</h1>
                </div>
                <div className="line"></div>
                <p className="desc">
                    {`VoTextGuard is an application that converts spoken language into written text while automatically identifying and flagging toxic or harmful words. It aims to promote healthy communication and is ideal for use in chat systems, educational platforms, and content moderation. 🎙️🛡️`}
                </p>
            </div>
            <Button url="/experiment">GET STARTED</Button>
        </div>
    );
};

export default Home;
