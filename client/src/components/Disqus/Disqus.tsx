import React, { useEffect } from 'react';

const Disqus: React.FC<{ url: string; identifier: string }> = ({ url, identifier }) => {
  useEffect(() => {
    // Функция, которая будет вызываться после загрузки скрипта Disqus
    const loadDisqus = () => {
      /* global DISQUS */
      if (DISQUS) {
        DISQUS.reset({
          reload: true,
          config: function () {
            this.page.url = url;
            this.page.identifier = identifier;
          },
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