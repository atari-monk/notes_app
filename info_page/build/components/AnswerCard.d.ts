import MarkdownIt from 'markdown-it';
export declare class AnswerCard {
    private readonly markdownIt;
    private readonly sectionIndex;
    private readonly questionIndex;
    constructor(markdownIt: MarkdownIt, sectionIndex: number, questionIndex: number);
    createCard(question: string, answer: string): HTMLElement;
    private createDiv;
}
