//Класс, который представляет сам тест
class Quiz
{
    constructor(elem, type, questions, results)
    {
        //Element
        this.elem = document.getElementById(elem);

        //Тип теста: 1 - классический тест с правильными ответами, 2 - тест с формой отправки данных на почту
        this.type = type;

        //Массив с вопросами
        this.questions = questions;

        //Массив с возможными результатами
        this.results = results;

        //Количество набранных очков
        this.score = 0;

        //Результат выыбора при типе формы
        this.responses = [];

        //Номер результата из массива
        this.result = 0;

        //Номер текущего вопроса
        this.current = 0;
    }

    Click(index, quiz)
    {
        //Добавляем очки
        const currentQuestion = this.questions[this.current];
        let value = currentQuestion.Click(index, quiz);
        if (quiz.type === 1) {
            this.score += value;
        } else {
            this.responses.push(value);
        }

        // индекс иправилоьного ответа
        let correct = -1;

        //Если было добавлено хотя одно очко, то считаем, что ответ верный
        if(value >= 1)
        {
            correct = index;
        }
        else
        {
            //Иначе ищем, какой ответ может быть правильным
            for(let i = 0; i < this.questions[this.current].answers.length; i++)
            {
                if(this.questions[this.current].answers[i].value >= 1)
                {
                    correct = i;
                    break;
                }
            }
        }

        this.Next();

        return correct;
    }

    //Переход к следующему вопросу
    Next()
    {
        this.current++;

        if(this.current >= this.questions.length)
        {
            this.End();
        }
    }

    //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
    End()
    {
        for(let i = 0; i < this.results.length; i++)
        {
            if(this.results[i].Check(this.score)) {
                this.result = i;
            }
        }
    }
}

//Класс, представляющий вопрос
class Question
{
    constructor(text, answers, essence)
    {
        this.text = text;
        this.answers = answers;
        this.essence = essence;
    }

    Click(index, quiz)
    {
        // Проверка на тип теста
        if (quiz.type === 1) {
            return this.answers[index].value
        } else {
            return this.answers[index].essence;
        }
    }
}

//Класс, представляющий ответ
class Answer
{
    constructor(text, value, essence)
    {
        this.text = text;
        this.value = value;
        this.essence = essence;

    }
}

//Класс, представляющий результат
class Result
{
    constructor(text, value, essence)
    {
        this.text = text;
        this.value = value;
        this.essence = essence;
    }

    //Этот метод проверяет, достаточно ли очков набрал пользователь
    Check(value)
    {
        if (this.value <= value)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

//Обновление теста
function Update(quiz)
{
    //Находим необходмые элементы на странице
    let headElem = quiz.elem.querySelector('.quiz__head'),
        buttonsElem = quiz.elem.querySelector('.quiz__buttons'),
        pagesElem = quiz.elem.querySelector('.quiz__pages');

    //Проверяем, есть ли ещё вопросы
    if(quiz.current < quiz.questions.length)
    {
        //Если есть, меняем вопрос в заголовке

        headElem.innerHTML = quiz.questions[quiz.current].text;

        //Удаляем старые варианты ответов
        buttonsElem.innerHTML = "";

        //Создаём кнопки для новых вариантов ответов
        for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
        {
            let btn = document.createElement("div");
            btn.className = "button";

            btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

            btn.setAttribute("index", i);

            if (quiz.questions[quiz.current].answers[i].essence !== undefined) {
                btn.setAttribute("data-name", quiz.questions[quiz.current].answers[i].essence);
            }


            buttonsElem.appendChild(btn);
        }
        //Выводим номер текущего вопроса
        pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

        //Вызываем функцию, которая прикрепит события к новым кнопкам
        Init(quiz);
    }
    else
    {
        //Если это конец, то выводим результат теста
        if (quiz.type === 1) {
            buttonsElem.innerHTML = "";
            headElem.innerHTML = quiz.results[quiz.result].text;
            pagesElem.innerHTML = "Очки: " + quiz.score;
        } else {
            //Создаем элементы для формы отправки данных
            const submit = document.createElement("button"),
                phone = document.createElement("input");

            //Убираем вывод прогресса
            pagesElem.style.display = 'none';

            //Убираем кнопки и меняем заголовок
            buttonsElem.innerHTML = "";
            headElem.innerHTML = 'Введите номер телефона';

            //Регистрируем актрибуты для поля ввода и кнопки
            phone.setAttribute('placeholder', '+7 999 999 99 99');
            phone.setAttribute('name', 'tel');
            phone.setAttribute('type', 'tel');
            submit.setAttribute('type', 'submit');
            submit.innerHTML = 'submit'

            //Добавляем кнопку отправки и поле ввода телефона input
            buttonsElem.appendChild(phone);
            buttonsElem.appendChild(submit);
        }


    }
}

function Init(quiz)
{
    //Находим все кнопки
    let btns = quiz.elem.getElementsByClassName("button");

    for(let i = 0; i < btns.length; i++)
    {
        //Прикрепляем событие для каждой отдельной кнопки
        //При нажатии на кнопку будет вызываться функция Click()
        btns[i].addEventListener("click", function (e) {
            let target = e.target;

            //Делаем проверку на нажатие
            if (target.hasAttribute("index")) {
                Click(target.getAttribute("index"), quiz);
            } else if(!target.hasAttribute("index")){
                let parent = target.closest(".button");
                Click(parent.getAttribute("index"), quiz);
            }
        });
    }
}

function Click(index, quiz)
{
    //Получаем номер правильного ответа
    let correct = quiz.Click(index, quiz);

    //Находим все кнопки
    let btns = quiz.elem.getElementsByClassName("button");

    //Делаем кнопки серыми
    for(let i = 0; i < btns.length; i++)
    {
        btns[i].className = "button button_passive";
    }

    //Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
    if(quiz.type === 1)
    {
        if(correct >= 0)
        {
            btns[correct].className = "button button_correct";
        }

        if(index !== correct)
        {
            btns[index].className = "button button_wrong";
        }
        //Ждём секунду и обновляем тест
        setTimeout(() => Update(quiz), 1000);
    }
    else
    {
        //Иначе просто подсвечиваем зелёным ответ пользователя
        btns[index].className = "button button_correct";

        //Ждём 0.2c и обновляем тест
        setTimeout(() => Update(quiz), 200);
    }
}
