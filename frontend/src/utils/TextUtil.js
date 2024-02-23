export function newLineUtil(inputString) {
    return inputString.split('\n').map((str, index) =>
        <p key={index}>
            {str}
        </p>
    );
}

export function truncateText(text) {
    if (text.length > 45) {
        return text.substring(0, 45) + "...";
    } else {
        return text;
    }
}

export function lastestTruncateText(text) {
    if (text.length > 63) {
        return text.substring(0, 63) + "...";
    } else {
        return text;
    }
}