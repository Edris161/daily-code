comond = ""
started = False
while True:
     comond = input(">"). lower()
     if comond == "start":
          if started:
               print("the car is already started")
          else:
           started = True
           print("car started")
     elif comond == "stop":
          if not started:
               print("the car is already stoped")
          else:
               started = False     
          print("car stoped")
     elif comond == "help":
          print("""
start_ to start the car.
stop_ to stop the car.
quite_ to quite the car.                                
""")          
     elif comond == "quit":
          break
     else:
          print("I could not uderstand what do you mean?")