const attachSerial = document.getElementById("digiwindow");
const digiwindowImage = document.getElementById("digiwindow-image");
const adbarError = document.getElementById("adbar-urgent");

attachSerial.addEventListener("click", () => {
    if (! VPetCommunicator.isSerialAttached() ) {
        VPetCommunicator.attachSerial().then((resolution) => {
            console.log(resolution)
            adbarError.style.display = 'none';
            digiwindowImage.setAttribute('src', "img/ready.png");
            document.querySelectorAll('button.digiwindow-selector').forEach(elem => {
                elem.disabled = false;
            })
        }).catch(error => {
            adbarError.style.display = 'block';
            adbarError.innerHTML = "Error: Failed to attach serial device. Perhaps you did not select the A-Com?"
        })
    }
})

const dmogButton = document.getElementById('dmog-button');
const dm20sButton = document.getElementById('dm20s-button');
const dm20tButton = document.getElementById('dm20t-button');
const dmxButton = document.getElementById('dmx-button');
const goButton = document.getElementById('battle');

dmogButton.addEventListener('click', () => {
    digiwindowImage.setAttribute('src', "img/dmog.png");
});

dm20sButton.addEventListener('click', () => {
    digiwindowImage.setAttribute('src', "img/dm20.png");
    let dm20 = new DM20();
    VPetDevice.setCode(dm20.genRandomCodeSingle());
    VPetDevice.setDevice("dm20");
});

dm20tButton.addEventListener('click', () => {
    digiwindowImage.setAttribute('src', "img/dm20.png");
    let dm20 = new DM20();
    VPetDevice.setCode(dm20.genRandomCodeTag());
    VPetDevice.setDevice("dm20");
});

dmxButton.addEventListener('click', () => {
    digiwindowImage.setAttribute('src', "img/dmx.png");
    let dmx = new DMX();
    VPetDevice.setCode(dmx.genRandomCode());
    VPetDevice.setDevice("dmx")
});

interval = NaN;
goButton.addEventListener('click', () => {
    if (VPetDevice.getDevice() != NaN) {
        VPetCommunicator.writeData(VPetDevice.getCode());
        interval = setInterval(swapFrame, 100);
    } else {
        digiwindowImage.setAttribute('src', "img/error.png");
    }

});

count = 0;
function swapFrame() {
    if (count % 2 == 0) {
        digiwindowImage.setAttribute('src', "img/go-0.png");
    } else {
        digiwindowImage.setAttribute('src', "img/go-1.png");
    }

    if (count > 20) {
        clearInterval(interval);
        digiwindowImage.setAttribute('src', "img/ready.png");
        count = 0;
    }
    count++;
}

var VPetCommunicator = new VPet();
VPetCommunicator.setBaudRate(9600);

var VPetDevice = new VPetInfo();
VPetDevice.setDevice(NaN);
