//(Для  разных квизов необходимсо создавать разные массимы с вопросами и результатами)


//Массив с результатами
const results =
    [
        new Result("Звоните +7 (999) 999 99 99", 0),
        new Result("Звоните +7 (999) 999 99 99", 2),
        new Result("Звоните +7 (999) 999 99 99", 4),
        new Result("Звоните +7 (999) 999 99 99", 6)
    ];

//Массив с вопросами
const questions =
    [
        new Question("Какие стили в интерьере предпочитаете?",
            [
                new Answer('<img src="img/quiz/like.svg" alt="">', 0, 'Like'),
                new Answer('<img src="img/quiz/home.svg" alt=\"\">', 0, 'Star'),
                new Answer('<img src="img/quiz/home2.svg" alt=\"\">', 1,'Love'),
                new Answer('<img src="img/quiz/unlike.svg" alt=\"\">',4, 'Unlike')
            ]),
        new Question("Какие стили в интерьере предпочитаете?",
            [
                new Answer('<img src="img/quiz/like.svg" alt="">', 0, 'Like'),
                new Answer('<img src="img/quiz/home.svg" alt=\"\">', 0, 'Star'),
                new Answer('<img src="img/quiz/home2.svg" alt=\"\">', 1,'Love'),
                new Answer('<img src="img/quiz/unlike.svg" alt=\"\">',4, 'Unlike')
            ]),
    ];



//Инициация теста
// const ИМЯ = new Quiz( 'id', type(1 or 2), questions, results);
const quiz = new Quiz( 'form', 2, questions, results);

Update(quiz);
