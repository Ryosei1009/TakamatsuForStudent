export function newLineUtil(inputString) {
    return inputString.split('\n').map((str, index) =>
        <p key={index}>
            {str}
        </p>
    );
}

export function truncateText(text, length) {
    if (text.length > length) {
        return text.substring(0, length) + "...";
    } else {
        return text;
    }
}

export function selfIntroductionTruncateText(text) {
    if (text.length > 100) {
        return text.substring(0, 100) + "...";
    } else {
        return text;
    }
}