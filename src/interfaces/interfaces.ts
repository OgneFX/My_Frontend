export interface Slide {
  id: number;
  image: string;
  title?: string;
}

export interface IQuestion {
  id: number;
  title: string;
  question: string;
  options: QuestionOptions[];
  multiSelect: boolean;
  category: string;
  // createdAt: string;
  imageUrl?: string;
}

interface QuestionOptions {
  id: number;
  text: string;
}
