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