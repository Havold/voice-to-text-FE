import './home.scss';
import Button from '../../components/Button/Button';

const Home = () => {
    return (
        <div className="section">
            <div className="content">
                <div className="planet">
                    <span className="subTitle">WELCOME TO</span>
                    <h1 className="title">
                        HAND WRITING <br /> CLASSIFICATION
                    </h1>
                </div>
                <div className="line"></div>
                <p className="desc">
                    {`Handwriting Classification is a mini experiment management system that helps researchers train, compare, and select the best ML/DL model for handwriting recognition tasks. 🚀`}
                </p>
            </div>
            <Button url="/experiment">GET STARTED</Button>
        </div>
    );
};

export default Home;
