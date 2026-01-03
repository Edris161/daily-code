def add(n1, n2):
    return n1 + n2

# TODO  wrire out 3 function , substract, multiply, divide.
def subtract(n1, n2):
    return n1 - n2

def multiply(n1, n2):
    return n1 * n2 

def divide(n1, n2):
    if n2 == 0:
        return "Error! Division by zero."
    return n1 / n2

# TODO ADD THIS 4 FUNCTION TO A DICTIONARY AS VALUES. KEY ="+", "-", "*", "/"
operations = {
    "+": add, 
    "-": subtract,
    "*": multiply,  
    "/": divide
    }


#TODO USE THE DICTIONARY OPERATIONS TO PREFOROMET THE CALCULATION.
should_acumulate = True
num1 = float(input("what is the first number?: "))


while should_acumulate:

  for symbol in operations:
    print(symbol)
    operations_symbol = input("pick an operation from the line above: ")

  num2 =  float(input("what is the second number?: "))
  answer = operations[operations_symbol](num1, num2)
  print(f"{num1} {operations_symbol} {num2} = {answer}")


  choice = input(f"type 'y' to continue calculating with {answer}, or type 'n' to exit.: ")
  if choice == "y":
     num1 = answer
  elif choice == "n":  
     print("Goodbye")
