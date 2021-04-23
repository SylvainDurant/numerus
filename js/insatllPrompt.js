///// BEFORE INSTALL PROMPT /////
// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (evt) => {
    // Stash the event so it can be triggered later.
    deferredPrompt = evt;

    // creating install button
    console.log("beforeinstallprompt detected");
    showInstallButton();
});

const showInstallButton = () => {
    const installContainer = document.getElementById("installButtonContainer");

    let installButton = document.createElement("button");
    installButton.id = "installButton";
    installButton.innerHTML = "Install me";

    installContainer.appendChild(installButton);

    installButton.addEventListener("click", async () => {
        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;

        // Optionally, send analytics event with outcome of user choice
        if (outcome === "accepted") {
            let thanks = document.getElementById("message");
            thanks.innerHTML = "Thank you for installing my app!";
        }
        console.log(`User response to the install prompt: ${outcome}`);

        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
        installButton.remove();
    });   
}
/////////////////////////////////
