function LineTrace (speed: number) {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        lspeed = speed
        rspeed = speed
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        lspeed = 30
        rspeed = 0
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        lspeed = 0
        rspeed = 30
    }
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, lspeed)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, rspeed)
}
function stop () {
    maqueen.motorStop(maqueen.Motors.All)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    strip.showColor(neopixel.rgb(0, 0, 0))
}
function ledON () {
    if (mtime <= input.runningTime()) {
        if (changeLED == 0) {
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
            changeLED = 1
        } else {
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
            changeLED = 0
        }
        strip.show()
        strip.rotate(1)
        mtime = input.runningTime() + 1000
    }
}
maqueen.IR_callbackUser(function (message) {
    if (message == 1) {
        basic.showIcon(IconNames.Happy)
    }
    if (message == 2) {
        basic.showIcon(IconNames.Sad)
    }
    mode = message
})
let mode = 0
let changeLED = 0
let rspeed = 0
let lspeed = 0
let strip: neopixel.Strip = null
let mtime = 0
mtime = input.runningTime() + 1000
strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Yellow))
strip.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
strip.setPixelColor(4, neopixel.colors(NeoPixelColors.White))
basic.forever(function () {
    if (mode == 1) {
        ledON()
        LineTrace(50)
    } else if (mode == 2) {
        stop()
    } else if (mode == 3) {
        stop()
    }
})
control.inBackground(function () {
    while (true) {
        if (maqueen.Ultrasonic(PingUnit.Centimeters) <= 10 && maqueen.Ultrasonic(PingUnit.Centimeters) != 0) {
            basic.showIcon(IconNames.No)
            mode = 3
        }
        basic.pause(100)
    }
})
