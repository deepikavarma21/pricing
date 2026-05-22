interface ResultCardProps {
  title: string;
  value: string | number;
  description?: string;
}

const ResultCard = ({ title, value, description }: ResultCardProps) => (
  <div className="result-card">
    <h2>{title}</h2>
    <p>{value}</p>
    {description && <p>{description}</p>}
  </div>
);

export default ResultCard;
