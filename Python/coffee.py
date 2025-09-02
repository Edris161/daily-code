def coffee_bot():
    print("☕ Welcome to the Python Coffee Shop!")
    print("What would you like today?")
    size = input("Choose a size (small, medium, large): ").lower()
    drink = input("What drink would you like? (espresso, latte, cappuccino): ").lower()
    print(f"Great! That'll be a {size} {drink}. Enjoy!")
def coffee_bot():
    print("☕ Welcome to the Python Coffee Shop!")
    
    # Basic size selection with minimal validation
    size = input("Choose a size (small, medium, large): ").strip().lower()
    while size not in ("small", "medium", "large"):
        size = input("Oops, try again. Size? (small, medium, large): ").strip().lower()
    
    # Drink selection with minimal validation
    drink = input("What drink would you like? (espresso, latte, cappuccino): ").strip().lower()
    while drink not in ("espresso", "latte", "cappuccino"):
        drink = input("Oops, try again. Drink? (espresso, latte, cappuccino): ").strip().lower()

    print(f"Perfect! A {size} {drink} is coming right up. Thank you!")

