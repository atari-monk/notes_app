export declare class IndexComponent {
    private index;
    constructor(index: HTMLElement);
    createSectionLink(sectionIndex: number, sectionTitle: string): HTMLElement;
    createQuestionLink(sectionIndex: number, questionIndex: number, indexTitle: string): HTMLElement;
    addSectionEntry(sectionIndex: number, sectionTitle: string, questions: {
        indexTitle: string;
    }[]): void;
}
