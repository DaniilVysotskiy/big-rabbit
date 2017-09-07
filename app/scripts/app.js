import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import ymaps from 'ymaps';
import mask from 'jquery-mask-plugin';
import slick from 'slick-carousel';

$(() => {

	// const docWidth = document.documentElement.offsetWidth;
	// [].forEach.call(
	// 	document.querySelectorAll('*'),
	// 	function (el) {
	// 		if (el.offsetWidth > docWidth) {
	// 			console.log(el);
	// 		}
	// 	}
	// );


	// Modals
	function initModals() {
	// Show modal
		$('[data-link="modal"]').on('click', function (){
			const link = $(this).attr('href') || $(this).data('href');
			const modal = $(link);

			$(modal).addClass('active');
			if ($(modal).hasClass('modal--breed')){
				$('.single-item').slick({
					dots: false,
					infinite: false,
					nextArrow: '<button type="button" class="slick-next"></button>',
					prevArrow: '<button type="button" class="slick-prev"></button>'
				});
			}
			$('body').addClass('modal-is-active');
		});
		// Hide modal on cross click
		$('.modal').on('click', '.close', function (){
			$(this).closest('.modal--wrapper').removeClass('active');
			$('body').removeClass('modal-is-active');
		});
		// Hide modal on empty place click
		$(document).on('click', function (e){
			const target = e.target;

			if ($(target).hasClass('modal--wrapper')){
				$('.modal--wrapper').removeClass('active');
				$('body').removeClass('modal-is-active');
			}
		});
	}

	// Masked phone input
	$('input[type="tel"]').mask('+7 (000) 000-00-00');

	// Load Yandex.Map
	if ($('#ymap').length !== 0) {
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
	}

	svg4everybody();
	initModals();
});
