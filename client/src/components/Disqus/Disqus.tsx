import React, { useEffect } from 'react';

interface ResetOptions {
  reload: boolean;
  config: () => void;
  page: {
    url: string;
    identifier: string;
  };
}

interface DisqusConfig {
  page: {
    url: string;
    identifier: string;
  };
  reset(options: ResetOptions): void;
  // Добавьте другие свойства и методы Disqus, которые вы используете в вашем коде
  // Например:
  // anyOtherMethod(): void;
}

declare global {
  interface Window {
    DISQUS: DisqusConfig | undefined;
  }
}

const Disqus: React.FC<{ url: string; identifier: string }> = ({ url, identifier }) => {
  useEffect(() => {
    const loadDisqus = () => {
      if (window.DISQUS) {
        window.DISQUS.reset({
          reload: true,
          config: function () {
            this.page = {
              url: url,
              identifier: identifier
            };
          },
          page: { url: "", identifier: "" } // Пустой объект по умолчанию
        });
      }
    };


    // Создаем скрипт Disqus
    const disqusScript = document.createElement('script');
    disqusScript.src = 'https://wine-bars-disqus-com.disqus.com/embed.js'; // Замените 'your-disqus-shortname' на ваш короткий домен Disqus
    disqusScript.setAttribute('data-timestamp', `${+new Date()}`);
    disqusScript.async = true;
    disqusScript.onload = loadDisqus;

    // Добавляем скрипт в тело документа
    document.body.appendChild(disqusScript);

    // Удаляем скрипт при размонтировании компонента
    return () => {
      document.body.removeChild(disqusScript);
    };
  }, [url, identifier]);

  return (
    <div id="disqus_thread"></div>
  );
};

export default Disqus;