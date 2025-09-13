from question_modul import Question
from data import question_data
from brain_quize import Quizebrain


question_bank = []
for question in question_data:
        question_text = question["text"]
        question_answer = question["answer"]
        new_question = Question(question_text, question_answer)
        question_bank.append(new_question)

quize = Quizebrain(question_bank)


while #quize.still_has_questions():
        quize.next_question()