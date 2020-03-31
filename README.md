# module_presentation
# ver: 0.0.1
Модуль презентации элементов страницы





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
module_presentation.steps($steps)





/** Запуск презентации */
module_presentation.veiw()





/** Показать предыдущий кадр */
module_presentation.back()





/** Показать следующий кадр */
module_presentation.next()





/** Показать кадр - по имени кадра
 * @param $name Имя кадра
 */
module_presentation.view_name($name)





/** Показать кадр - по порядковому номеру
 * @param $i Порядковый номер кадра (первый элемент - 0)
 */
module_presentation.view_step($i)





/** Закрыть презентацию */
module_presentation.close()





/** Возвращает объект с информацией о модуле */
module_presentation.info()





/** Выводит сообщение с информацией о модуле */
module_presentation.about()
