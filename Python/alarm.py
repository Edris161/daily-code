import datetime
import time
import threading
import os
from tkinter import Tk, Label, Entry, Button, StringVar
# install playsound if you don’t have it: pip install playsound
from playsound import playsound

def play_alarm_sound(sound_file):
    try:
        playsound(sound_file)
    except Exception as e:
        print(f"Error playing sound: {e}")

def alarm_thread(alarm_time_str, sound_file):
    """
    Wait until current time equals alarm_time_str, then play sound
    alarm_time_str in format "HH:MM:SS" in 24-hour time
    """
    print(f"Alarm set for {alarm_time_str}")
    while True:
        now = datetime.datetime.now().strftime("%H:%M:%S")
        # optionally print or update UI
        if now == alarm_time_str:
            print("Time to wake up!")
            play_alarm_sound(sound_file)
            break
        time.sleep(1)

def set_alarm():
    # get input from UI
    h = hour_var.get()
    m = minute_var.get()
    s = second_var.get()
    alarm_time = f"{int(h):02d}:{int(m):02d}:{int(s):02d}"
    # optionally check validity
    # start thread
    t = threading.Thread(target=alarm_thread, args=(alarm_time, sound_file_path))
    t.daemon = True
    t.start()

# ---- GUI setup ----

root = Tk()
root.title("Alarm Clock")

Label(root, text="Set Alarm Time (24-hour format)").grid(row=0, columnspan=2)

Label(root, text="Hour:").grid(row=1, column=0)
hour_var = StringVar()
Entry(root, textvariable=hour_var, width=5).grid(row=1, column=1)

Label(root, text="Minute:").grid(row=2, column=0)
minute_var = StringVar()
Entry(root, textvariable=minute_var, width=5).grid(row=2, column=1)

Label(root, text="Second:").grid(row=3, column=0)
second_var = StringVar()
Entry(root, textvariable=second_var, width=5).grid(row=3, column=1)

# path to your sound file (wav or mp3)
sound_file_path = "alarm_sound.mp3"

Button(root, text="Set Alarm", command=set_alarm).grid(row=4, columnspan=2)

root.mainloop()
