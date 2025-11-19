interface FeatureCardProps {
    title: string;
    color: string;
    icon: string;
    text: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, color, icon, text }) => {
    return (
        <div className="FeatureCard">
            <div 
                className="FeatureTitleArea" 
                style={{ borderBottom: `1px solid ${color}` }}
            >
                <div 
                    className="Icon" 
                    style={{ backgroundImage: `url(/${icon})` }}
                />
            </div>

            <h2 className="FeatureTitle">{title}</h2>
            <p className="FeatureText">{text}</p>
        </div>
    );
};

export default FeatureCard;
