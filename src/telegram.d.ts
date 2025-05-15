export {};

declare global {
  interface Window {
    Telegram: Telegram;
  }

  interface Telegram {
    WebApp: TelegramWebApp;
  }

  interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
      user?: Telegram.WebAppUser;
    };
    ready(): void;
  }

  namespace Telegram {
    interface WebAppUser {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      photo_url?: string;
    }
  }
}
