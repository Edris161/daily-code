import sys

patients = {}
doctors = {}
appointments = []

def add_patient():
    pid = input("Patient ID: ").strip()
    name = input("Name: ").strip()
    patients[pid] = {'name': name}
    print("Patient added.")

def update_patient():
    pid = input("Patient ID to update: ").strip()
    if pid in patients:
        name = input("New name: ").strip()
        patients[pid]['name'] = name
        print("Patient updated.")
    else:
        print("Patient not found.")

def delete_patient():
    pid = input("Patient ID to delete: ").strip()
    if patients.pop(pid, None):
        print("Patient deleted.")
    else:
        print("Patient not found.")

def add_doctor():
    did = input("Doctor ID: ").strip()
    name = input("Name: ").strip()
    doctors[did] = {'name': name}
    print("Doctor added.")

def book_appointment():
    pid = input("Patient ID: ").strip()
    did = input("Doctor ID: ").strip()
    date = input("Date (YYYY-MM-DD): ").strip()
    if pid in patients and did in doctors:
        appointments.append({'pid': pid, 'did': did, 'date': date})
        print("Appointment booked.")
    else:
        print("Invalid patient or doctor ID.")

def view_appointments():
    print("\nAppointments:")
    for ap in appointments:
        print(f"Patient: {patients[ap['pid']]['name']}, Doctor: {doctors[ap['did']]['name']}, Date: {ap['date']}")
    print()

def admin_menu():
    while True:
        print("\n--- Admin Menu ---")
        print("1. Add/Update/Delete Patient")
        print("2. Add Doctor")
        print("3. Book Appointment")
        print("4. View Appointments")
        print("5. Exit")
        choice = input("Choose an option: ").strip()
        if choice == '1':
            sub = input("a) Add b) Update c) Delete: ").strip().lower()
            if sub == 'a': add_patient()
            elif sub == 'b': update_patient()
            elif sub == 'c': delete_patient()
        elif choice == '2':
            add_doctor()
        elif choice == '3':
            book_appointment()
        elif choice == '4':
            view_appointments()
        elif choice == '5':
            print("Exiting..."); break
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Welcome to the Hospital Management System Demo")
    admin_menu()
    sys.exit()
