import './FeatureCard.scss'

interface FeatureCardProps {
    title: string;
    color: string;
    icon: string;
    text: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, color, icon, text }) => {
    return (
        <div className="FeatureCard" style={{ boxShadow: `0 0 5px #0000001a` }}>
            <div 
                className="FeatureTitleArea" 
                style={{ borderBottom: `2px solid ${color}` }}
            >
                <div 
                    className="FeatureIcon" 
                    style={{ backgroundImage: `url(/${icon})` }}
                />
                <h2 className="FeatureTitle">{title}</h2>
            </div>

            <p className="FeatureText">{text}</p>
        </div>
    );
};

export default FeatureCard;
