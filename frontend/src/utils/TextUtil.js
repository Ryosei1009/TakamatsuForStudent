export function newLineUtil(inputString) {
    return inputString.split('\n').map((str, index) =>
        <p key={index}>
            {str}
        </p>
    );
}

export function lastestNewsTruncateText(text) {
    if (text.length > 40) {
        return text.substring(0, 40) + "...";
    } else {
        return text;
    }
}

export function devNewsTruncateText(text) {
    if (text.length > 220) {
        return text.substring(0, 220) + "...";
    } else {
        return text;
    }
}

export function newsListTruncateText(text) {
    if (text.length > 45) {
        return text.substring(0, 45) + "...";
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