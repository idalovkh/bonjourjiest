import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 lg:px-8 py-24 max-w-3xl">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-8 tracking-tight">
          Политика конфиденциальности
        </h1>

        <div className="prose prose-lg text-muted-foreground space-y-6">
          <p>
            Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта Deshar School (далее — «Школа»).
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8">1. Сбор данных</h2>
          <p>
            Мы собираем только те данные, которые вы добровольно предоставляете через форму записи на пробный урок: имя и контактные данные (телефон, email, мессенджер).
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8">2. Использование данных</h2>
          <p>
            Ваши данные используются исключительно для связи с вами по вопросам обучения, записи на занятия и информирования об акциях Школы.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8">3. Защита данных</h2>
          <p>
            Мы принимаем все необходимые организационные и технические меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8">4. Передача третьим лицам</h2>
          <p>
            Мы не передаём ваши персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8">5. Cookies</h2>
          <p>
            Сайт может использовать файлы cookies для улучшения работы и анализа посещаемости. Вы можете отключить cookies в настройках вашего браузера.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8">6. Контакты</h2>
          <p>
            По вопросам, связанным с обработкой персональных данных, вы можете связаться с нами через{" "}
            <a href="https://t.me/+79067742949" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Telegram
            </a>.
          </p>

          <p className="text-sm text-muted-foreground/70 mt-12">
            Дата последнего обновления: {new Date().toLocaleDateString("ru-RU")}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
