function ShowHiding () {
    if (Hiding == 0) {
        basic.showLeds(`
            . # # # .
            . # . . .
            . # # . .
            . # . . .
            . # . . .
            `)
    } else {
        basic.showLeds(`
            . # . # .
            . # . # .
            . # # # .
            . # . # .
            . # . # .
            `)
    }
}
radio.onReceivedNumberDeprecated(function (receivedNumber) {
    if (Hiding == 0) {
        if (receivedNumber == 9999) {
            led.plotBarGraph(
            100 - radio.receivedPacket(RadioPacketProperty.SignalStrength) * -1,
            56
            )
        }
    }
})
input.onButtonPressed(Button.A, function () {
    if (inSetup == 1) {
        Hiding += 1
        if (Hiding > 1) {
            Hiding = 0
        }
        ShowHiding()
    }
})
input.onButtonPressed(Button.AB, function () {
    if (inSetup == 1) {
        led.setBrightness(100)
        inSetup = 0
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            . # . # .
            . . # . .
            `)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else {
        StartNewGame()
    }
})
input.onButtonPressed(Button.B, function () {
    if (inSetup == 1) {
        Hiding += -1
        if (Hiding < 0) {
            Hiding = 1
        }
        ShowHiding()
    }
})
function StartNewGame () {
    led.setBrightness(150)
    Hiding = 0
    ShowHiding()
    inSetup = 1
}
let inSetup = 0
let Hiding = 0
radio.setGroup(86)
StartNewGame()
basic.forever(function () {
    if (inSetup != 1) {
        if (Hiding == 1) {
            radio.sendNumber(9999)
        } else {
        	
        }
    }
    basic.pause(500)
})
