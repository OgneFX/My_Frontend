export interface Slide {
  id: number;
  image: string;
  title?: string;
}

export interface IQuestion {
  id: number;
  title: string;
  question: string;
  multiSelect: boolean;
  category: string;
  imageUrl?: string;
  isRecurring: boolean;
  createdAt: Date;

  options: QuestionOptions[];
}

interface QuestionOptions {
  id: number;
  text: string;
}
