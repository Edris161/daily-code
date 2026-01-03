secret_number = 7
guess_count = 0
guess_limite = 3

while guess_count < guess_limite:
    guess = int(input("guess an number? "))
    guess_count += 1
    if guess == secret_number:
        print("you won the match.")
        break
else:
    print("sorry you could not guess the right number.")        