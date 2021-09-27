// import './sass/style.scss';
import './sass/components/welcome';
import './sass/components/explore';
import './sass/components/video';
import './sass/components/gallery';
import './sass/components/tickets';

console.log(`
1. Вёрстка валидная +10
2. Вёрстка семантическая. В коде страницы присутствуют следующие элементы (указано минимальное количество, может быть больше) +24
- <header>, <main>, <footer> +2
- семь элементов <section> (по количеству секций) +2
- только один заголовок <h1> +2
- семь заголовков <h2> (по количеству секций) +2
- шесть заголовков <h3> (по количеству карточек) +2
- два элемента <nav> (основная и вспомогательная панель навигации) +2
- три списка ul > li > a (основная и вспомогательная панель навигации, ссылки на соцсети) +2
- тринадцать кнопок button (четыре из них в секции Video, пять в секции Tickets, по две - стрелки слайдера и плейлиста) +2
- три тега input type="radio" (в секции Tickets) +2
- два тега input type="number"(в секции Tickets) +2
- два тега input type="range" (громкось и прогрес-бар видео) +2
- для всех элементов <img> указан обязательный атрибут alt +2
3. Вёрстка соответствует макету +45
- блок <header> +5
- секция Welcome +5
- секция Visiting +5
- секция Explore +5
- секция Video +5
- секция Gallery +5
- секция Tickets +5
- секция Contacts +5
- блок <footer> +5
4. Форма покупки билетов +20/22
- форма плавно выдвигается слева при открытии и плавно возвращается назад при закрытии. В открытом состоянии под формой есть полупрозрачный overlay, который занимает весь экран. Форма и overlay прокручиваются вместе со страницей +2
- форма открывается при клике по кнопке Buy Now в секции Tickets и закрывается кликом по иконке с крестиком в верхнем правом углу или кликом по overlay +2
- при вёрстке формы используются следующие элементы: form, input type="date", input type="time", input type="text", input type="email", input type="tel", input type="number", select +8
- вёрстка формы соответствует макету + 8 (не удалось стилизовать тег option в select -2 балл)
5. Требования к css + 18
- добавлен favicon +2
- для построения сетки используются флексы или гриды +2 (только флексы)
- при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2
- фоновый цвет каждого блока и секции тянется на всю ширину страницы +2
- иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления +2
- расстояние между буквами, там, где это требуется по макету, регулируется css-свойством letter-spacing +2
- переключаются радиокнопки в блоке Tickets, одновременно может быть выбрана только одна кнопка +2
- в блоке Contacts правильно указанны ссылки на почту mailto и на телефон tel +2
- в футере добавлены ссылки на соцсети. Круглая граница вокруг иконок соцсетей выполнена при помощи css +2
6. Интерактивность, реализуемая через css +25
- плавная прокрутка по якорям +5
- параллакс +5
- при кликам по кнопке Discover the Louvre и карточкам секции Visiting открываются полноэкранные панорамы Google Street View встроенные в страницы вашего сайта при помощи iframe +5
- изменение стиля интерактивных элементов при наведении и клике +10
- интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты – изменение цвета фона или шрифта, появление подчёркивания и т.д. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +4
- обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +2
- интерактивность при наведении карточек в секции Visiting предусматривает плавное растягивание подчёркивания заголовка карточки на всю ширину карточки Демо +2
- интерактивность при наведении иконок социальных сетей в футере предусматривает изменение цвета иконки и круглой границы вокруг иконки на золотистый +2
7. Интерактивность, реализуемая через js +16
- можно передвигать ползунки громкости и прогресс-бар видео, при этом цвет шкалы до и после ползунка отличается и соответствует макету +2 (плеер подключен, поэтому при изменении ползунка прогрессбара будет меняться фон видео)
- кликами по кнопкам + и - в секции Tiskets можно менять количество билетов Basic и Senior от 0 до 20 +2
- кнопке "Book" в форме покупки билетов добавлен ripple-эффект Демо +2
- при перезагрузке (обновлении) страницы картины в блоке Galery отображаются в рандомном порядке + 10
Итого 158/160`)