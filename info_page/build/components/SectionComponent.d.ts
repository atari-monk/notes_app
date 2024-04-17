import { IndexComponent } from './IndexComponent';
import MarkdownIt from 'markdown-it';
export declare class SectionComponent {
    private readonly markdownIt;
    private readonly sectionIndex;
    private readonly jsonContainer;
    private readonly indexComponent;
    constructor(markdownIt: MarkdownIt, sectionIndex: number, jsonContainer: HTMLElement, indexComponent: IndexComponent);
    createSectionElement(sectionTitle: string, questions: {
        indexTitle: string;
        question: string;
        answer: string;
    }[]): void;
}
