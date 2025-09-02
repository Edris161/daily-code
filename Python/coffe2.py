def coffee_bot():
    print('Welcome to the cafe!')
    size = get_size()
    drink_type = get_drink_type()
    print(f"Alright, that’s a {size} {drink_type}!")

    name = input("Can I get your name please?\n> ")
    print(f"Thanks, {name}! Your drink will be ready shortly.")

def get_size():
    res = input("What size drink can I get for you? \n[a] Small \n[b] Medium \n[c] Large \n> ")
    if res == 'a': return 'small'
    elif res == 'b': return 'medium'
    elif res == 'c': return 'large'
    else:
        print("I'm sorry, I did not understand your selection. Please enter a valid option.")
        return get_size()

def get_drink_type():
    res = input("What type of drink would you like? \n[a] Brewed Coffee \n[b] Mocha \n[c] Latte \n> ")
    if res == 'a': return 'brewed coffee'
    elif res == 'b': return 'mocha'
    elif res == 'c': return order_latte()
    else:
        print("I'm sorry, I did not understand your selection. Please enter a valid option.")
        return get_drink_type()

def order_latte():
    res = input("What kind of milk for your latte? \n[a] 2% milk \n[b] Non-fat milk \n[c] Soy milk \n> ")
    if res == 'a': return 'latte'
    elif res == 'b': return 'non-fat latte'
    elif res == 'c': return 'soy latte'
    else:
        print("I'm sorry, I did not understand your selection. Please enter a valid option.")
        return order_latte()

coffee_bot()

class CoffeeShop:
    def __init__(self):
        self.menu = { 'espresso':3.50, 'latte':4.00,  }
        self.inventory = { 'espresso':1000, 'latte':500,  }
        self.sales = 0.0

    def display_menu(self): ...
    def take_order(self, item): ...
    def check_inventory(self, item): ...
    def process_order(self, item): ...
    def display_inventory(self): ...
    def replenish_inventory(self, item, quantity): ...
    def report_sales(self): ...
    def report_inventory(self): ...
    def display_menu(self):
        print("Menu:")
        for item, price in self.menu.items():
            print(f"{item.title()}: ${price:.2f}")