alarma = 0
minutos = 1
pins.servo_write_pin(AnalogPin.P16, 0)

def on_forever():
    global alarma
    if ESP8266_IoT.wifi_state(False):
        basic.show_icon(IconNames.NO)
        ESP8266_IoT.init_wifi(SerialPin.P8, SerialPin.P12, BaudRate.BAUD_RATE115200)
        ESP8266_IoT.connect_wifi("wiot", "a1b2c3d4")
    basic.show_icon(IconNames.YES)
    if Environment.PIR(DigitalPin.P2) and alarma == 0:
        pins.servo_write_pin(AnalogPin.P16, 90)
        alarma = 1
        basic.show_icon(IconNames.SKULL)
        basic.pause(minutos * 2 * 60000)
    else:
        if alarma == 1:
            pins.servo_write_pin(AnalogPin.P16, 0)
            basic.pause(5000)
        alarma = 0
basic.forever(on_forever)

def on_every_interval():
    if ESP8266_IoT.wifi_state(True):
        basic.show_icon(IconNames.SMALL_HEART)
        ESP8266_IoT.connect_thing_speak()
        basic.show_icon(IconNames.HEART)
        ESP8266_IoT.set_data("JBQ3F7SI645YFNT7",
            randint(30, 50),
            randint(15, 25),
            randint(35, 45),
            alarma)
        ESP8266_IoT.upload_data()
        basic.show_icon(IconNames.YES)
    if alarma == 1:
        basic.show_icon(IconNames.SKULL)
loops.every_interval(minutos * 60000, on_every_interval)