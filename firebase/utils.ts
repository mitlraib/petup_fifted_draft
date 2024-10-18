
export function base64ToBytes(base64String: string) {
    const byteCharacters = atob(base64String.split(',')[1]);  // המרת Base64 לבינארי
    const byteNumbers = new Array(byteCharacters.length).fill(0,0,byteCharacters.length).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return byteArray
}
