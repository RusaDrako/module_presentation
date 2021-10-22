# Модуль презентации элементов страницы (module_presentation)
____

![license](https://img.shields.io/github/license/RusaDrako/module_presentation?style=plastic)
![release](https://img.shields.io/github/v/release/RusaDrako/module_presentation?style=plastic)



## Оглавление

1. [Подключение](#Подключение)
2. [Активация](#Активация)
3. [Кадры](#Кадры)
4. [Методы](#Методы)
	- [back](#back)
	- [next](#next)
	- [view_name](#view_name)
	- [view_step](#view_step)
	- [clean](#clean)
	- [close](#close)
5. [Локализация](#Локализация)



## Подключение

Для подключения модуля необходимо добавить в html следующие строки

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script type="text/javascript" src="/module_presentation.js"></script>
<link href="/module_presentation.css" rel="stylesheet">
```

[Оглавление](#Оглавление)



## Активация

```JavaScript
module_presentation.steps($steps)
```

- **$steps** - [массив кадров презентации](#Кадры)

Запуск презентации
```JavaScript
module_presentation.veiw()
```

[Оглавление](#Оглавление)



## Кадры

Кадры оформляются через массив объектов

```JavaScript
$steps = [
	{
		'name': 'step_1',
		'selector': '#id_element',
		'description': $description,
		'position': 'bottom',
		'size': [
			$top,
			$left,
			$width,
			$height,
		],
	},
	{следующий кадр}
];
```

- **name** - имя кадра (для метода view_name)
- **selector** - селектор элемента, который будет выделен областью.
- **description** - Текс-описание в формате html
- **position** - расположение описания относительно выделенной области. Возможные значения:
	- top - сверху
	- bottom - снизу (по умолчанию)
	- left - слева
	- right - справа
- **size** (необязательное, приоритетное) - область для выделения через координаты:
	- $top - отступ от левой границы документа
	- $left - отступ от верхней границы документа
	- $width - ширина блока
	- $height - высота блока


[К оглавлению](#Оглавление)



## Методы

### back

Показать предыдущий кадр

```JavaScript
module_presentation.back()
```

[К оглавлению](#Оглавление)



### next

Показать следующий кадр

```JavaScript
module_presentation.next()
```

[К оглавлению](#Оглавление)



### view_name

Показать кадр - по имени кадра

 ```JavaScript
 module_presentation.view_name($name)
 ```

- $name - имя кадра

[К оглавлению](#Оглавление)



### view_step

Показать кадр - по порядковому номеру

```JavaScript
module_presentation.view_step($i)
```

- $i - Порядковый номер кадра (первый элемент - 0)

[К оглавлению](#Оглавление)



### close

Очистить все кадры презентации

```JavaScript
module_presentation.clean()
```

[К оглавлению](#Оглавление)



### close

Закрыть презентацию

```JavaScript
module_presentation.close()
```

[К оглавлению](#Оглавление)



## Локализация

Поменять текст кнопок вы можете через следующие свойства

```JavaScript
module_presentation.options.text.back = 'Назад';
module_presentation.options.text.next = 'Далее';
module_presentation.options.text.close = 'Выход';
```

[Оглавление](#Оглавление)



[![Logo](https://avatars0.githubusercontent.com/u/32844979?s=50 "RusaDrako")](https://github.com/RusaDrako/)
