import ReactMarkdown from 'react-markdown';
import 'zenn-content-css';

type MarkDownTextProps = {
    content: string;
}

const MarkDownText: React.FC<MarkDownTextProps> = ({ content }) => {
    return (
        <div className='znc'>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
};

export default MarkDownText;