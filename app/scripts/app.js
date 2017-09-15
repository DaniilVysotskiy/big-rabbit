import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import ymaps from 'ymaps';
import mask from 'jquery-mask-plugin';
import slick from 'slick-carousel';

// Slick slider init
function slickInit() {
	if ($('.single-item').length !== 0) {
		$('.single-item').slick({
			dots: false,
			infinite: false,
			nextArrow: '<button type="button" class="slick-next"></button>',
			prevArrow: '<button type="button" class="slick-prev"></button>'
		});
	}
}

// Nanogallery2 init
function nanogalleryInit() {
	if ($('.nano2').length !== 0) {
		$('.nano2').nanogallery2({
			itemsBaseURL: '',
			thumbnailWidth: '270',
			thumbnailHeight: '270',
			thumbnailBorderVertical: 0,
			thumbnailBorderHorizontal: 0,
			thumbnailLabel: {
				display: false
			},
			thumbnailHoverEffect2: 'imageScaleIn80',
			// galleryDisplayMode: 'moreButton',
			galleryLastRowFull: true,
			galleryMaxItems: 4,
			thumbnailGutterWidth: 30,
			thumbnailGutterHeight: 30,
			gallerySorting: 'random',
			displayBreadcrumb: false,
			breadcrumbAutoHideTopLevel: false,
			breadcrumbOnlyCurrentLevel: false
		});
	}
}

function openModal(modal){
	$(modal).addClass('active');
	if ($(modal).hasClass('modal--breed')){
		$('.single-item').slick({
			dots: false,
			infinite: false,
			nextArrow: '<button type="button" class="slick-next"></button>',
			prevArrow: '<button type="button" class="slick-prev"></button>'
		});
	}
}

// Modals
function initModals() {
	// Show modal
	$('[data-link="modal"]').on('click', function (){
		const link = $(this).attr('href') || $(this).data('href');
		const modal = $(link);

		openModal(modal);
	});
	// Hide modal on cross click
	$('.modal').on('click', '.close', function (){
		$(this).closest('.modal--wrapper').removeClass('active');
	});
	// Hide modal on empty place click
	$(document).on('click', function (e){
		const target = e.target;

		if ($(target).hasClass('modal--wrapper')){
			$('.modal--wrapper').removeClass('active');
		}
	});
	// Modal auto open with hash in URL
	if (window.location.hash) {
		const hash = window.location.hash;
		openModal(hash);
	}
}

// Masked phone input init
function maskedInputInit() {
	if ($('input[type="tel"]').length !== 0) {
		$('input[type="tel"]').mask('+7 (000) 000-00-00');
	}
}

// Yandex Maps init
function ymapsInit() {
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
}
$(document).ready(function (){
	svg4everybody();
	initModals();
	nanogalleryInit();
	slickInit();
	maskedInputInit();
	ymapsInit();
});


