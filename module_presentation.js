/** Тестировалось на библиотеки jQuery v3.2.1 */

// Включаем строгий режим
"use strict";



/**
 *	@version 0.1.0
 *	@author Leonid Petukhov
 */
(function($) {
	/** Имя модуля */
	var MODULE_NAME = 'module_presentation';
	/** Версия модуля */
	var MODULE_VERSION = '0.1.0';
	/* Автор модуля */
	var MODULE_AUTHOR = 'Петухов Леонид';
	/* Дата релиза модуля */
	var MODULE_DATE = '2020-03-31';
	/* Описание модуля */
	var MODULE_DESCRIPTION = 'Модуль презентации элементов страницы на базе jQuery.';
	/* Массив элементов меню */
	var $_steps = [];
	/* Массив элементов меню */
	var $_steps_name = [];
	/* Текущая позиция массива */
	var $_i_steps = 0;
	/* Настройки отступов */
	var $_set = {
		'margin_desc': 5,
		'padding_field': 10,
	};

	/* Общедоступные настройки модуля */
	var options = {
		text: {
			back: 'Назад',
			next: 'Далее',
			close: 'Выход',
		},
	};


	/* Объект модуля */
	var object_module = {};










	/* Подключает настройки модуля в свойство объекта */
	object_module.options = options;





	/** */
	function _clear() {
		$('[' + MODULE_NAME + '___bg]').detach();
		$('[' + MODULE_NAME + '___description]').detach();
		$('[' + MODULE_NAME + '___control]').detach();
	}





	/** */
	function _view_step($i) {
		// Запоминаем текущий кадр
		$_i_steps = $i;
		// Очистить страницу от всех элементов презентации
		_clear();
		// Получаем кадр презентации
		var $use_step = $_steps[$i];
		// Получение координат области
		var $coord = _get_coord($use_step);
		// Создаём "вилдимую" область
		_create_field($coord);
		// Создаём блок описания
		var $block_desc = _create_description($coord, $use_step);
		// Создаём элементы управления
		_control_elem()
		//
		_move($coord, $block_desc)
	}





	/** Получаем координаты "видимой" области */
	function _get_coord($object) {
		var $coord;
		if (undefined !== $object.selector) {
			$coord = _get_coord_selector($object.selector);
		}
		if (undefined === $coord) {
			$coord = $object.size;
		}
		var $paddind = $_set.padding_field;
		$coord[0] = $coord[0] - $paddind;
		$coord[1] = $coord[1] - $paddind;
		$coord[2] = $coord[2] + 2 * $paddind;
		$coord[3] = $coord[3] + 2 * $paddind;
		return $coord;
	}





	/** */
	function _get_coord_selector($selector) {
		var $contener = $($selector);
		var $x1 = $contener.offset().left;
		var $y1 = $contener.offset().top;
		var $x2 = $contener.outerWidth();
		var $y2 = $contener.outerHeight();
		var $coord = [$x1, $y1, $x2, $y2];
		return $coord;
	}





	/** Формирует "закрывающее" поле */
	function _create_field($coord) {
		var $x1 = $coord[0];
		var $y1 = $coord[1];
		var $x2 = $coord[2];
		var $y2 = $coord[3];
		var $body = $('body');
		var $doc_h =  $(document).height();

		// Левый блок
		var $block = $('<div>').appendTo($body);
		$block
			.attr(MODULE_NAME + '___bg', 1)
			.css({
				'top': 0,
				'left': 0,
				'width': $x1 + 'px',
				'height': $doc_h + 'px',
			})
			;
		// Правый блок
		$block = $('<div>').appendTo($body);
		$block
			.attr(MODULE_NAME + '___bg', 1)
			.css({
				'top': 0,
				'left': ($x1 + $x2) + 'px',
				'right': 0,
				'height': $doc_h + 'px',
			})
			;
		// Верхний блок
		$block = $('<div>').appendTo($body);
		$block
			.attr(MODULE_NAME + '___bg', 1)
			.css({
				'top': 0,
				'left': $x1 + 'px',
				'width': $x2 + 'px',
				'height': $y1 + 'px',
			})
			;
		// Нижний блок
		$block = $('<div>').appendTo($body);
		$block
			.attr(MODULE_NAME + '___bg', 1)
			.css({
				'top': ($y1 + $y2) + 'px',
				'left': $x1 + 'px',
				'width': $x2 + 'px',
				'height': ($doc_h - $y1 - $y2) + 'px',
			})
			;
	}





	/** Формирует поле с описанием */
	function _create_description($coord, $object) {
		var $desc_block;
		if (undefined !== $object.desc) {
			// Создаём блок с описанием
			$desc_block = _create_description_block($x1, $y1, $object.desc);

			var $w = $desc_block.outerWidth();
			var $h = $desc_block.outerHeight();
			var $x1 = $coord[0];
			var $y1 = $coord[1];
			var $x2 = $coord[2];
			var $y2 = $coord[3];
			var $padding = $_set.margin_desc;

			var $pos = $object.desc_pos;
			if ('top' === $pos) {
				var $_x1 = $x1;
				var $_y1 = $y1 - $h - $padding;
			} else if ('left' === $pos) {
				var $_x1 = $x1 - $w - $padding;
				var $_y1 = $y1;
			} else if ('right' === $pos) {
				var $_x1 = $x1 + $x2 + $padding;
				var $_y1 = $y1;
			} else {
				var $_x1 = $x1;
				var $_y1 = $y1 + $y2 + $padding;
			}
			$desc_block
				.css({
					'left': $_x1 + 'px',
					'top': $_y1 + 'px',
				});
		}
		return $desc_block;
	}





	/** */
	function _create_description_block($x, $y, $description) {
		var $body = $('body');
		var $block = $('<div>').appendTo($body);
		$block
			.attr(MODULE_NAME + '___description', 1)
			.css({
				'left': $x + 'px',
				'top': $y + 'px',
			})
			.html($description)
			;
		return $block;
	}





	/** Формирует элементы управления */
	function _control_elem() {
		var $body = $('body');
		// Облать кнопок управления
		var $control = $('<div>').appendTo($body);
		$control
			.attr(MODULE_NAME + '___control', 1)
			;
		// Назад
		var $block = $('<a href="javascript:' + MODULE_NAME + '.back();">' + options.text.back + '</a>').appendTo($control);
		// Вперёд
		$block = $('<a href="javascript:' + MODULE_NAME + '.next();">' + options.text.next + '</a>').appendTo($control);
		// Закрыть
		$block = $('<a href="javascript:' + MODULE_NAME + '.close();">' + options.text.close + '</a>').appendTo($control);
	}





	/** Перемещаем экран к выделенной области */
	function _move($coord, $desc_block) {
		var $top_margin = 50;
		var $top = $coord[1];
		if (undefined !== $desc_block
				&& $coord[1] > $desc_block.offset().top) {
			$top = $desc_block.offset().top;
		}
		$('body').animate({ scrollTop: $top - $top_margin }, 500);
	}













	/** Задаёт шаги презентации
	 * @param $steps Массив настроек шагов презентации
	 * {
	 *	'name': 'Имя_кадра',
	 *	'selector': 'Селектор_элемента_выделяемого_областью',
	 *	'description': 'HTML-текст описания',
	 *	'position': 'Позиция описания относительно выделенной области top/bottom/left/right',
	 *	'size': [
	 *		'координата относительно левой границы документа',
	 *		'координата относительно верхней границы документа',
	 *		'ширина блока',
	 *		'высота блока'
	 *	]
	 * }
	 */
	object_module.steps = function($steps) {
		$steps.forEach(function(item, i, arr) {
			var $step = {
				'selector': item.selector,
				'desc': item.description,
				'desc_pos': item.position,
				'size': item.size,
			};
			$_steps.push($step);
			$_steps_name.push(item.name);
		});
	};





	/** Запуск презентации */
	object_module.veiw = function() {
		if ($_steps.length > 0) {
			$_i_steps = 0;
			_view_step(0);
		}
	};





	/** Показать предыдущий кадр */
	object_module.back = function() {
		if ($_i_steps > 0) {
			$_i_steps--;
			_view_step($_i_steps);
		}
	};





	/** Показать следующий кадр */
	object_module.next = function() {
		if ($_i_steps < ($_steps.length-1)) {
			$_i_steps++;
			_view_step($_i_steps);
		}
	};





	/** Показать кадр - по имени кадра
	 * @param $name Имя кадра
	 */
	object_module.view_name = function($name) {
		var $i = $_steps_name.indexOf($name)
		if ($i >= 0) {
			console.log($i);
			_view_step($i);
		}
	};





	/** Показать кадр - по порядковому номеру
	 * @param $i Порядковый номер кадра (первый элемент - 0)
	 */
	object_module.view_step = function($i) {
		_view_step($i);
	};





	/** Закрыть презентацию */
	object_module.close = function() {
		_clear();
	};





	/** Очищает шаги презентации */
	object_module.clean = function() {
		$_steps = [];
		$_steps_name = [];
		$_i_steps = 0;
	};





	/** Возвращает объект с информацией о модуле */
	object_module.info = function() {
		return {
			module: MODULE_NAME,
			version: MODULE_VERSION,
			date: MODULE_DATE,
			author: MODULE_AUTHOR,
			description: MODULE_DESCRIPTION
		};
	};





	/** Выводит сообщение с информацией о модуле */
	object_module.about = function() {
		alert(MODULE_NAME + '\nВерсия: ' + MODULE_VERSION + '\nДата: ' + MODULE_DATE + '\nРазработчик: ' + MODULE_AUTHOR + '\n\n' + MODULE_DESCRIPTION);
	};





	window[MODULE_NAME] = object_module;

/**/
}(jQuery));
