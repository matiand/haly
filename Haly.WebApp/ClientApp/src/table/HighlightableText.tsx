import Highlighter from "react-highlight-words";

type HighlightableTextProps = {
    text: string;
    markedText?: string | null;
};

function HighlightableText({ text, markedText }: HighlightableTextProps) {
    if (!markedText) return text;

    const textToMark = new RegExp("\\b" + markedText);

    return <Highlighter searchWords={[textToMark]} textToHighlight={text} />;
}

export default HighlightableText;
