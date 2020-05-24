//Buttons
const videoElement = document.getElementById("video");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const videoSelectBtn = document.getElementById("videoSelectBtn");

//Set on click listener
videoSelectBtn.onclick = getVideoSources;

//Gets onjects from electron API, requires electrron
const { desktopCapturer, remote } = require("electron");
const { Menu } = remote;

//Get available sources
async function getVideoSources()
{
    const inputSources = await desktopCapturer.getSources(
        {
            types: ["window", "screen"]
        }
    );

    const videoOptionsMenu = Menu.buildFromTemplate(
        inputSources.map((source) =>
        {
            return {
                label: source.name,
                click: () => selectSource(source)
            };
        })
    );

    videoOptionsMenu.popup();
}