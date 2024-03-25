function isPageUsingMouseDevice() {
    return window.matchMedia("(pointer: fine)").matches;
}

export default isPageUsingMouseDevice;
