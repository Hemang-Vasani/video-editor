let pages = {
    "FirstPage": FirstPage,
    "landingPage": landingPage,
    "uploadPage": uploadPage,
    "framelistPage": framelistPage,
    "framedownloadPage": framedownloadPage,
    "frameListPagesecond": frameListPagesecond,
    "firstprevediv": firstprevediv,
    "lastFrame": lastFrame,
    "downloadFramePageLast": downloadFramePageLast
}
let pageSectionMap = {
    "FirstPage": "rdioscreen",
    "landingPage": "userFormDiv",
    "uploadPage": "imageFormDiv",
    "framelistPage": "frameListPage",
    "framedownloadPage": "downloadFramePage",
    "frameListPagesecond": "frameListPagesecond",
    "firstprevediv": "firstprevediv",
    "lastFrame": "lastFrame",
    "downloadFramePageLast": "downloadFramePageLast"
}
let sectionDisplay = {
    "rdioscreen": "inherit",
    "userFormDiv": "inherit",
    "imageFormDiv": "flex",
    "frameListPage": "flex",
    "frameListPagesecond": "flex",
    "downloadFramePage": "inherit",
    "firstprevediv": "flex",
    "lastFrame": "inherit",
    "downloadFramePageLast": "inherit"
}
let routeArray = ["FirstPage", "landingPage","uploadPage","downloadFramePageLast", "framedownloadPage","firstprevediv"];
let idx = 0;

function FirstPage() {
    location = location
    console.log("FirstPage")
    byId("bodyId").style.backgroundSize= ("cover");
    byId("bodyId").style.background= ("url('images/13.png')")
    byId(pageSectionMap.FirstPage).style.display = sectionDisplay[pageSectionMap.FirstPage];
    byId(pageSectionMap.landingPage).style.display = 'none';
    byId(pageSectionMap.uploadPage).style.display = 'none';
    byId(pageSectionMap.framelistPage).style.display = 'none';
    byId(pageSectionMap.framedownloadPage).style.display = 'none';
    byId(pageSectionMap.firstprevediv).style.display = 'none';
    byId(pageSectionMap.lastFrame).style.display = 'none';
    byId(pageSectionMap.downloadFramePageLast).style.display = 'none';
    byId("mergedImageLast").style.display = 'none';
}

function landingPage() {
    console.log("landingPage")
    document.querySelector("body").style.overflow = 'inherit';
    byId("bodyId").style.backgroundSize= ("cover");
    byId("bodyId").style.background= ("url('images/13.png')")
    byId(pageSectionMap.FirstPage).style.display = 'none';
    byId(pageSectionMap.landingPage).style.display = sectionDisplay[pageSectionMap.landingPage];
    byId(pageSectionMap.uploadPage).style.display = 'none';
    byId(pageSectionMap.framelistPage).style.display = 'none';
    byId(pageSectionMap.framedownloadPage).style.display = 'none';
    byId(pageSectionMap.firstprevediv).style.display = 'none';
    byId(pageSectionMap.lastFrame).style.display = 'none';
    byId(pageSectionMap.downloadFramePageLast).style.display = 'none';
    byId("mergedImageLast").style.display = 'none';
}

function uploadPage() {
    console.log("uploadPage")
    document.querySelector("body").style.overflow = 'inherit';
    byId("bodyId").style.backgroundSize= ("cover");
    byId("bodyId").style.background= ("url('images/13.png')")
    byId(pageSectionMap.FirstPage).style.display = 'none';
    byId(pageSectionMap.landingPage).style.display = 'none';
    byId(pageSectionMap.uploadPage).style.display = sectionDisplay[pageSectionMap.uploadPage];
    byId(pageSectionMap.framelistPage).style.display = 'none';
    byId(pageSectionMap.framedownloadPage).style.display = 'none';
    byId(pageSectionMap.firstprevediv).style.display = 'none';
    byId(pageSectionMap.lastFrame).style.display = 'none';
    byId(pageSectionMap.downloadFramePageLast).style.display = 'none';
    byId("mergedImageLast").style.display = 'none';
}

function framelistPage() {
    console.log("framelistPage")
    document.querySelector("body").style.overflow = 'inherit';
    removeListeners(byId("draggableDiv"));
    removeListeners(byId("draggableText"));
    byId(pageSectionMap.FirstPage).style.display = 'none';
    byId(pageSectionMap.landingPage).style.display = 'none';
    byId(pageSectionMap.uploadPage).style.display = 'none';
    byId(pageSectionMap.framelistPage).style.display = sectionDisplay[pageSectionMap.framelistPage];
    byId(pageSectionMap.framedownloadPage).style.display = 'none';
    byId(pageSectionMap.firstprevediv).style.display = 'none';
    byId(pageSectionMap.lastFrame).style.display = 'none';
    byId(pageSectionMap.downloadFramePageLast).style.display = 'none';
    byId("mergedImageLast").style.display = 'none';
}

function framedownloadPage() {
    console.log("framedownloadPage")
    document.querySelector("body").style.overflow = 'hidden';
    byId(pageSectionMap.FirstPage).style.display = 'none';
    byId(pageSectionMap.landingPage).style.display = 'none';
    byId(pageSectionMap.uploadPage).style.display = 'none';
    byId(pageSectionMap.framelistPage).style.display = 'none';
    byId(pageSectionMap.firstprevediv).style.display = 'none';
    byId(pageSectionMap.framedownloadPage).style.display = sectionDisplay[pageSectionMap.framedownloadPage];
    byId(pageSectionMap.lastFrame).style.display = 'none';
    byId(pageSectionMap.downloadFramePageLast).style.display = 'none';
    byId("frameDiv").style.display = "block"
    removeListeners(byId("draggableDiv"));
    removeListeners(byId("draggableText"));
    byId("mergedImageLast").style.display = 'none';

}
function lastFrame() {
    console.log("lastFrame")
    // document.querySelector("body").style.overflow = 'hidden';
    document.querySelector("body").style.overflow = 'inherit';
    byId(pageSectionMap.FirstPage).style.display = 'none';
    byId(pageSectionMap.landingPage).style.display = 'none';
    byId(pageSectionMap.uploadPage).style.display = 'none';
    byId(pageSectionMap.framelistPage).style.display = 'none';
    byId(pageSectionMap.firstprevediv).style.display = 'none';
    byId(pageSectionMap.framedownloadPage).style.display = 'none';
    byId(pageSectionMap.lastFrame).style.display = sectionDisplay[pageSectionMap.lastFrame];
    byId(pageSectionMap.downloadFramePageLast).style.display = 'none';
    removeListeners(byId("draggableDiv"));
    removeListeners(byId("draggableText"));
    byId("mergedImageLast").style.display = 'none';

}
function downloadFramePageLast() {
    console.log("downloadFramePageLast")
    document.querySelector("body").style.overflow = 'hidden';
    byId(pageSectionMap.FirstPage).style.display = 'none';
    byId(pageSectionMap.landingPage).style.display = 'none';
    byId(pageSectionMap.uploadPage).style.display = 'none';
    byId(pageSectionMap.framelistPage).style.display = 'none';
    byId(pageSectionMap.firstprevediv).style.display = 'none';
    byId(pageSectionMap.framedownloadPage).style.display = 'none';
    byId(pageSectionMap.lastFrame).style.display = 'none';
    byId(pageSectionMap.downloadFramePageLast).style.display = sectionDisplay[pageSectionMap.downloadFramePageLast];
    byId("frameDiv").style.display = "block"
    byId("mergedImageLast").style.display = 'none';
}

var CapturePopStateHandler = function(e) {
    if (e.state && e.state._fileexplorer) {
        // if (idx == 0) {
        //     for (i = 0; i < 1; i++) {
        //         location.reload();
        //         break;
        //     }
        // }
        if (e.state._fileexplorer === 'back') {
            window.history.forward();
            console.log("b1")
            if (idx > 0) {
                console.log(idx);
                idx--;
                pages[routeArray[idx]]();
                console.log(idx);
                console.log("b2")
                if (idx == 0) {
                    console.log("reload");
                    location.reload();
                }
            } else if (idx == 0) {
                console.log(idx);
                window.history.go(-3);
                console.log("b3")
            }
        } else if (e.state._fileexplorer === 'forward') {
            window.history.back();
            console.log("f1")
            if (idx < routeArray.length - 1) {
                idx++;
                pages[routeArray[idx]]();
                console.log("f2")
            }
        }
    }
};

// Sets up three history items and places the user in the middle of those three.
window.history.pushState({ _fileexplorer: 'back' }, document.title);
window.history.pushState({ _fileexplorer: 'main' }, document.title);
window.history.pushState({ _fileexplorer: 'forward' }, document.title);
window.history.back();

window.addEventListener('popstate', CapturePopStateHandler, true);