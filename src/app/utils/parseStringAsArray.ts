export default function parseStringAsArray(text: String): any {
    return text.split(',').map(tech => tech.trim());
};