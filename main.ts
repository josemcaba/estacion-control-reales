let alarma = 0
let minutos = 1
pins.servoWritePin(AnalogPin.P16, 0)
loops.everyInterval(60000, function () {
    if (ESP8266_IoT.wifiState(true)) {
        basic.showIcon(IconNames.SmallHeart)
        ESP8266_IoT.connectThingSpeak()
        basic.showIcon(IconNames.Heart)
        ESP8266_IoT.setData(
        "JBQ3F7SI645YFNT7",
        Environment.ReadLightIntensity(AnalogPin.P1),
        Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C),
        Environment.octopus_BME280(Environment.BME280_state.BME280_humidity),
        alarma
        )
        ESP8266_IoT.uploadData()
        basic.showIcon(IconNames.Yes)
    }
    if (alarma == 1) {
        basic.showIcon(IconNames.Skull)
    }
})
basic.forever(function () {
    if (ESP8266_IoT.wifiState(false)) {
        basic.showIcon(IconNames.No)
        ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
        ESP8266_IoT.connectWifi("wiot", "a1b2c3d4")
    }
    basic.showIcon(IconNames.Yes)
    if (Environment.PIR(DigitalPin.P2) && alarma == 0) {
        pins.servoWritePin(AnalogPin.P16, 90)
        alarma = 1
        basic.showIcon(IconNames.Skull)
        basic.pause(120000)
    } else {
        if (alarma == 1) {
            pins.servoWritePin(AnalogPin.P16, 0)
            alarma = 0
            basic.pause(5000)
        }
    }
})
