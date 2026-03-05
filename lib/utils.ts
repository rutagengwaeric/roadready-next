export function normalizePhone(phone: string): string {
    if (!phone) return "";
    let num = phone.replace(/\D/g, ""); // Keep only digits
    if (num.startsWith("0")) {
        num = "25" + num;
    } else if (num.startsWith("7")) {
        num = "250" + num;
    }
    return num;
}
