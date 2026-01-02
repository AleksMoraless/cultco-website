export function createIndex(index: number): string {
    const value = String(index);
    if (value.length == 1) {
        return `0${value}`;
    }
    return value;
}
export function decodeIndex(index: string): string {
    if (index.length > 1 && index.startsWith('0')) {
        return index.slice(1);
    }
    return index;
}
// для инпутов с только цифрами
export function allowOnlyDigits(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
        input.value = input.value.replace(/\D/g, '');
    }
}

// для конвертации байтов в файл инпуте
export function convertBytes(value: number) {
    let res = '';
    switch (value.toString().length) {
        case 4:
        case 5:
        case 6:
            res = `${Math.round(value / 1000)}Kb`
            break;
        case 7:
        case 8:
        case 9:
            res = `${Math.round(value / (1000 * 1000))}Mb`
            break;
        default:
            res = `${value}b`
    }
    return res;
}

export function isSelector(x: any): x is string {
    return (typeof x === "string") && x.length > 1;
}

export type SelectorCollection<T> = string | NodeListOf<Element> | T[];

export function ensureAllElements<T extends HTMLElement>(selectorElement: SelectorCollection<T>, context: HTMLElement = document as unknown as HTMLElement): T[] {
    if (isSelector(selectorElement)) {
        return Array.from(context.querySelectorAll(selectorElement)) as T[];
    }
    if (selectorElement instanceof NodeList) {
        return Array.from(selectorElement) as T[];
    }
    if (Array.isArray(selectorElement)) {
        return selectorElement;
    }
    throw new Error(`Unknown selector element`);
}

export type SelectorElement<T> = T | string;

export function ensureElement<T extends HTMLElement>(selectorElement: SelectorElement<T>, context?: HTMLElement): T {
    if (isSelector(selectorElement)) {
        const elements = ensureAllElements<T>(selectorElement, context);
        if (elements.length > 1) {
            console.warn(`selector ${selectorElement} return more then one element`);
        }
        if (elements.length === 0) {
            throw new Error(`selector ${selectorElement} return nothing`);
        }
        return elements.pop() as T;
    }
    if (selectorElement instanceof HTMLElement) {
        return selectorElement as T;
    }
    throw new Error('Unknown selector element');
}

export function cloneTemplate<T extends HTMLElement>(query: string | HTMLTemplateElement): T {
    const template = ensureElement(query) as HTMLTemplateElement;
    return template.content.firstElementChild!.cloneNode(true) as T;
}



