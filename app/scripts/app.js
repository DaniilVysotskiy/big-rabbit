import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import ymaps from 'ymaps';
import mask from 'jquery-mask-plugin';


$(() => {

	const docWidth = document.documentElement.offsetWidth;
	[].forEach.call(
		document.querySelectorAll('*'),
		function (el) {
			if (el.offsetWidth > docWidth) {
				console.log(el);
			}
		}
	);

	// Masked phone input
	$('input[type="tel"]').mask('+7 (000) 000-00-00');

	// Load Yandex.Map
	ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
		.then(maps => {
			/**
			 * Создаем мультимаршрут.
			 * Первым аргументом передаем модель либо объект описания модели.
			 * Вторым аргументом передаем опции отображения мультимаршрута.
			 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml
			 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRouteModel.xml
			 */
			const multiRoute = new maps.multiRouter.MultiRoute({
				// Описание опорных точек мультимаршрута.
				referencePoints: [
					'Москва',
					'Юхнов'
				],
				// Параметры маршрутизации.
				params: {
					// Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
					results: 2
				}
			}, {
				// Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
				boundsAutoApply: true
			});

			// Создаем карту с добавленными на нее кнопками.
			const myMap = new maps.Map('ymap', {
				center: [55.750625, 37.626],
				zoom: 7,
				controls: [],
				behaviors: []
			});

			// Отключаем Scroll
			myMap.behaviors.disable('scrollZoom');

			// Добавляем мультимаршрут на карту.
			myMap.geoObjects.add(multiRoute);
		})
		.catch(error => console.log('Failed to load Yandex Maps', error));

	svg4everybody();
});
