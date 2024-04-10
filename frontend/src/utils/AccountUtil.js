export function isStudent(role) {
    if (role === 3 || role === 0) {
        return `生徒${role === 0 ? " (管理者)" : ""}`;
    }
    if (role === 2) {
        return "TA";
    }
    if (role === 1) {
        return "メンター";
    }
}

export function calculateGrade(graduationYear) {
    var currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    if (currentMonth < 3) {
        currentYear = currentYear - 1;
    }
    const grade = 4 - (graduationYear - currentYear);
    if (graduationYear === "") {
        return "";
    }
    if (grade > 3) {
        return graduationYear + "年3月に卒業済み"
    }
    if (grade <= 0) {
        return "卒業予定年が間違っている可能性があります！"
    }
    return grade + "年生";
}