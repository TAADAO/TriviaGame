$(document).ready()

//start with the obvious global variables...first one is the array in which the questions are listed
var myQuestions = [
    {
        question: "1. What country is NOT located south of the United States",
        answers: {
            a: ' Ecuador ' ,
            b: ' Belize ',
            c: ' Mauritania ',
            d: ' French Guiana '
        },
        correctAnswer: 'c'
    },
    {
        question: "2. If Alaska is the largest state in terms of square miles, what is the largest state in terms of square kilometers?",
        answers: {
            a: ' Texas',
            b: ' Alaska',
            c: ' New England',
            d: ' Canada '
        },
        correctAnswer: 'b'
    }, {
        question: "3. What city does not have an NBA basketball team?",
        answers: {
            a: ' Seattle ',
            b: ' San Francisco ',
            c: ' Orlando ',
            d: ' San Antonio '
        },
        correctAnswer: 'a'
    },
    {
        question: "4. What is the world's longest river?",
        answers: {
            a: ' Mississippi ',
            b: ' Amazon',
            c: ' Nile ',
            d: ' Rhine '
            
        },
        correctAnswer: 'b'
    },
    {
        question: "5. What NBA team did Michael Jordan officially end his playing career with?",
        answers: {
            a: ' Chicago Bulls',
            b: ' Charlotte Hornets ',
            c: ' Washington Wizards ',
            d: ' Cleveland Cavaliers '
        },
        correctAnswer: 'c'
    },
    {
        question: "6. What was the first movie to win 11 Academy Awards?",
        answers: {
            a: ' Titanic ',
            b: ' La La Land ',
            c: ' The Sound of Music ',
            d: ' Ben-Hur '
        },
        correctAnswer: 'd'
    }, {
        question: "7. What is the largest country, by area, that has only one time zone?",
        answers: {
            a: ' China ',
            b: ' Australia ',
            c: ' Turkey ',
            d: ' Russia '
        },
        correctAnswer: 'a'
    },
    {
        question: "8. What country's national flag is the only one that is NOT rectangular?",
        answers: {
            a: ' Nepal ',
            b: ' Uruguay ',
            c: ' Burundi ',
            d: ' Indonesia '
        },
        correctAnswer: 'a'
    }
];

//gathering variables that will show the information on the HTML side
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

//creating a function with necessary inputs, which break up into two sub-functions
function startQuiz() {

    //first subfunction....showing the questions and taking the quiz
    function showQuestions() {
        console.log('showQuestions');
        //variables created to store the output and answer choices
        var output = [];
        var answers;

        // for each question...
        for (var i = 0; i < myQuestions.length; i++) {

            // first reset the list of answers
            answers = [];

            // for each available answer...
            for (letter in myQuestions[i].answers) {

                // ...add an html radio button with the number of choices..3 in this case
                answers.push(
                    '<label>'
                    + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                    + letter + ': '
                    + myQuestions[i].answers[letter]
                    + '</label>'
                );
            }

            // this output should show both the question as well as the answer
            output.push(
                '<div class="question">' + myQuestions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // finally combine all of the information in the output array on to one string of html and put it on the page
        quizContainer.innerHTML = output.join('');

        
    }
    // next, create the function that creates results, such as the right answer, color codes, and the number correct

    function showResults() {

        // since a quiz container was created for the questions, we need an answer container for the answers
        var answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;


        // for each question...
        for (var i = 0; i < myQuestions.length; i++) {

            // find selected answer..used || operator to ensure the quiz doesn't break if someone skips a question
            userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

            //self-explanatory stuff here...
            // if answer is correct
            if (userAnswer === myQuestions[i].correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }

        // show number of correct answers out of total
        resultsContainer.innerHTML = 'You correctly answered ' + numCorrect + ' out of ' + myQuestions.length + '. Refresh to play again!';
    }

    document.getElementById('timer').innerHTML =
  02+ ":" + 00;
startTimer();

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  if(m<0){showResults()}
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

    // show questions right away
    showQuestions();

    // on submit, show results
    submitButton.onclick = function () {
        showResults();
    }
}

startQuiz();
