
"use strict";

/*==================================================
    FASHIONKART
    Professional Ecommerce JavaScript
    Version : 1.0
    Author  : Dinesh K
==================================================*/

/*==================================================
    APPLICATION
==================================================*/

const App = {

    name: "FashionKart",

    version: "1.0.0",

    developer: "Dinesh K",

    initialized: false

};

/*==================================================
    DOM CACHE
==================================================*/

const DOM = {

    loader: document.getElementById("loader"),

    header: document.getElementById("header"),

    mobileMenuBtn: document.getElementById("mobileMenuBtn"),

    mobileMenu: document.getElementById("mobileMenu"),

    overlay: document.getElementById("overlay"),

    backTop: document.getElementById("backToTop"),

    progressBar: document.getElementById("scrollProgress"),

    darkToggle: document.getElementById("darkModeToggle"),

    searchInput: document.querySelector(".search-form input"),

    searchForm: document.querySelector(".search-form"),

    cartBadge: document.querySelector(".cart-btn .badge"),

    wishlistBadge: document.querySelector(".wishlist-btn .badge"),

    newsletterForm: document.querySelector(".newsletter-form"),

    faqItems: document.querySelectorAll(".faq-item"),

    modals: document.querySelectorAll(".modal"),

    productCards: document.querySelectorAll(".product-card")

};

/*==================================================
    APPLICATION STATE
==================================================*/

const State = {

    darkMode: false,

    mobileMenuOpen: false,

    cart: [],

    wishlist: [],

    recentlyViewed: [],

    searchHistory: [],

    currentUser: null

};

/*==================================================
    UTILITIES
==================================================*/

const Utils = {

    qs(selector){

        return document.querySelector(selector);

    },

    qsa(selector){

        return document.querySelectorAll(selector);

    },

    id(id){

        return document.getElementById(id);

    },

    random(min,max){

        return Math.floor(Math.random()*(max-min+1))+min;

    },

    debounce(callback,delay){

        let timeout;

        return (...args)=>{

            clearTimeout(timeout);

            timeout=setTimeout(()=>{

                callback(...args);

            },delay);

        };

    },

    throttle(callback,limit){

        let waiting=false;

        return (...args)=>{

            if(waiting) return;

            callback(...args);

            waiting=true;

            setTimeout(()=>{

                waiting=false;

            },limit);

        };

    },

    save(key,value){

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    load(key,defaultValue){

        const item=localStorage.getItem(key);

        return item

            ? JSON.parse(item)

            : defaultValue;

    }

};

/*==================================================
    LOCAL STORAGE
==================================================*/

function loadApplicationData(){

    State.cart=Utils.load("cart",[]);

    State.wishlist=Utils.load("wishlist",[]);

    State.darkMode=Utils.load("darkMode",false);

    State.searchHistory=Utils.load("searchHistory",[]);

}

function saveApplicationData(){

    Utils.save("cart",State.cart);

    Utils.save("wishlist",State.wishlist);

    Utils.save("darkMode",State.darkMode);

    Utils.save("searchHistory",State.searchHistory);

}

/*==================================================
    UPDATE BADGES
==================================================*/

function updateBadges(){

    if(DOM.cartBadge){

        DOM.cartBadge.textContent=State.cart.length;

    }

    if(DOM.wishlistBadge){

        DOM.wishlistBadge.textContent=State.wishlist.length;

    }

}

/*==================================================
    INITIALIZATION
==================================================*/

function initializeApplication(){

    if(App.initialized){

        return;

    }

    loadApplicationData();

    updateBadges();

    App.initialized=true;

    console.log(

        `${App.name} ${App.version} Initialized`

    );

}

/*==================================================
    DOM READY
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeApplication

);

/*==================================================
    WINDOW LOAD
==================================================*/

window.addEventListener(

    "load",

    ()=>{

        console.log("All resources loaded.");

    }

);



/*==================================================
    LOADER SYSTEM
==================================================*/

const Loader = {

    duration: 1200,

    minimumTime: 600,

    initialized: false

};

/*==================================================
    SHOW LOADER
==================================================*/

function showLoader() {

    if (!DOM.loader) return;

    DOM.loader.style.display = "flex";

    DOM.loader.style.opacity = "1";

    document.body.style.overflow = "hidden";

}

/*==================================================
    HIDE LOADER
==================================================*/

function hideLoader() {

    if (!DOM.loader) return;

    DOM.loader.style.opacity = "0";

    DOM.loader.style.pointerEvents = "none";

    setTimeout(() => {

        DOM.loader.style.display = "none";

        document.body.style.overflow = "";

    }, 500);

}

/*==================================================
    LOADER PROGRESS
==================================================*/

function animateLoader() {

    const dots = DOM.loader
        ? DOM.loader.querySelectorAll(".loader-animation span")
        : [];

    if (!dots.length) return;

    dots.forEach((dot, index) => {

        dot.style.animationDelay = `${index * 0.2}s`;

    });

}

/*==================================================
    START LOADER
==================================================*/

function initializeLoader() {

    if (!DOM.loader) return;

    if (Loader.initialized) return;

    Loader.initialized = true;

    showLoader();

    animateLoader();

    const startTime = Date.now();

    window.addEventListener("load", () => {

        const elapsed = Date.now() - startTime;

        const remaining = Math.max(
            Loader.minimumTime - elapsed,
            0
        );

        setTimeout(() => {

            hideLoader();

        }, remaining);

    });

}

/*==================================================
    PAGE TRANSITION
==================================================*/

function pageTransition() {

    document.querySelectorAll("a[href]").forEach(link => {

        const href = link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("javascript") ||
            link.target === "_blank"
        ) {
            return;
        }

        link.addEventListener("click", function () {

            showLoader();

        });

    });

}

/*==================================================
    IMAGE PRELOAD
==================================================*/

function preloadImages() {

    const images = document.images;

    let loaded = 0;

    if (!images.length) return;

    [...images].forEach(img => {

        if (img.complete) {

            loaded++;

            return;

        }

        img.onload = img.onerror = () => {

            loaded++;

        };

    });

}

/*==================================================
    LOADER INIT
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initializeLoader();

        preloadImages();

        pageTransition();

    }

);


/*==================================================
    ANNOUNCEMENT BAR
==================================================*/

const Announcement = {

    currentIndex: 0,

    autoPlay: true,

    interval: 4000,

    timer: null,

    initialized: false

};

/*==================================================
    ELEMENTS
==================================================*/

Announcement.container = document.querySelector(".announcement-container");

Announcement.items = document.querySelectorAll(".announcement-item");

/*==================================================
    SHOW ITEM
==================================================*/

function showAnnouncement(index){

    if(!Announcement.items.length) return;

    Announcement.items.forEach((item)=>{

        item.style.display="none";

        item.style.opacity="0";

    });

    Announcement.items[index].style.display="flex";

    Announcement.items[index].style.opacity="1";

}

/*==================================================
    NEXT
==================================================*/

function nextAnnouncement(){

    if(!Announcement.items.length) return;

    Announcement.currentIndex++;

    if(Announcement.currentIndex>=Announcement.items.length){

        Announcement.currentIndex=0;

    }

    showAnnouncement(Announcement.currentIndex);

}

/*==================================================
    PREVIOUS
==================================================*/

function previousAnnouncement(){

    if(!Announcement.items.length) return;

    Announcement.currentIndex--;

    if(Announcement.currentIndex<0){

        Announcement.currentIndex=

        Announcement.items.length-1;

    }

    showAnnouncement(Announcement.currentIndex);

}

/*==================================================
    START
==================================================*/

function startAnnouncement(){

    if(!Announcement.autoPlay) return;

    stopAnnouncement();

    Announcement.timer=setInterval(()=>{

        nextAnnouncement();

    },Announcement.interval);

}

/*==================================================
    STOP
==================================================*/

function stopAnnouncement(){

    clearInterval(

        Announcement.timer

    );

}

/*==================================================
    HOVER
==================================================*/

function announcementHover(){

    if(!Announcement.container) return;

    Announcement.container.addEventListener(

        "mouseenter",

        ()=>{

            stopAnnouncement();

        }

    );

    Announcement.container.addEventListener(

        "mouseleave",

        ()=>{

            startAnnouncement();

        }

    );

}

/*==================================================
    KEYBOARD SUPPORT
==================================================*/

function announcementKeyboard(){

    document.addEventListener(

        "keydown",

        (event)=>{

            if(event.key==="ArrowRight"){

                nextAnnouncement();

            }

            if(event.key==="ArrowLeft"){

                previousAnnouncement();

            }

        }

    );

}

/*==================================================
    API READY
==================================================*/

function updateAnnouncement(messages){

    if(!Array.isArray(messages)) return;

    console.log(

        "Future API Messages:",

        messages

    );

}

/*==================================================
    INIT
==================================================*/

function initializeAnnouncement(){

    if(Announcement.initialized) return;

    if(!Announcement.items.length) return;

    Announcement.initialized=true;

    showAnnouncement(0);

    startAnnouncement();

    announcementHover();

    announcementKeyboard();

}

/*==================================================
    START MODULE
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeAnnouncement

);


/*==================================================
    STICKY HEADER
==================================================*/

const Header = {

    initialized: false,

    lastScroll: 0,

    scrollOffset: 80,

    hideOnScroll: true

};

/*==================================================
    HEADER SHADOW
==================================================*/

function updateHeaderShadow(){

    if(!DOM.header) return;

    if(window.scrollY > 20){

        DOM.header.classList.add("header-scrolled");

    }else{

        DOM.header.classList.remove("header-scrolled");

    }

}

/*==================================================
    STICKY HEADER
==================================================*/

function updateStickyHeader(){

    if(!DOM.header) return;

    if(window.scrollY > Header.scrollOffset){

        DOM.header.classList.add("sticky");

    }else{

        DOM.header.classList.remove("sticky");

    }

}

/*==================================================
    HIDE / SHOW HEADER
==================================================*/

function updateHeaderVisibility(){

    if(!DOM.header) return;

    if(!Header.hideOnScroll) return;

    const currentScroll = window.scrollY;

    if(currentScroll <= 0){

        DOM.header.classList.remove("header-hide");

        Header.lastScroll = 0;

        return;

    }

    if(

        currentScroll >

        Header.lastScroll &&

        currentScroll > 120

    ){

        DOM.header.classList.add("header-hide");

    }else{

        DOM.header.classList.remove("header-hide");

    }

    Header.lastScroll = currentScroll;

}

/*==================================================
    ACTIVE NAVIGATION
==================================================*/

function updateActiveNavigation(){

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(

        ".desktop-nav a"

    );

    if(!sections.length) return;

    let currentSection = "";

    sections.forEach(section=>{

        const top = section.offsetTop - 150;

        const height = section.offsetHeight;

        if(

            window.scrollY >= top &&

            window.scrollY < top + height

        ){

            currentSection = section.id;

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if(

            href === "#" + currentSection

        ){

            link.classList.add("active");

        }

    });

}

/*==================================================
    SMOOTH SCROLL
==================================================*/

function initializeSmoothScroll(){

    document.querySelectorAll(

        'a[href^="#"]'

    ).forEach(anchor=>{

        anchor.addEventListener(

            "click",

            function(event){

                const target = document.querySelector(

                    this.getAttribute("href")

                );

                if(!target) return;

                event.preventDefault();

                window.scrollTo({

                    top:

                        target.offsetTop - 80,

                    behavior:"smooth"

                });

            }

        );

    });

}

/*==================================================
    SCROLL EVENT
==================================================*/

const handleHeaderScroll = Utils.throttle(()=>{

    updateHeaderShadow();

    updateStickyHeader();

    updateHeaderVisibility();

    updateActiveNavigation();

},16);

/*==================================================
    INITIALIZE HEADER
==================================================*/

function initializeHeader(){

    if(Header.initialized) return;

    Header.initialized = true;

    updateHeaderShadow();

    updateStickyHeader();

    initializeSmoothScroll();

    window.addEventListener(

        "scroll",

        handleHeaderScroll

    );

}

/*==================================================
    START HEADER
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeHeader

);


/*==================================================
    MOBILE MENU
==================================================*/

const MobileMenu = {

    initialized: false,

    isOpen: false

};

/*==================================================
    OVERLAY
==================================================*/

function showOverlay() {

    if (!DOM.overlay) return;

    DOM.overlay.classList.add("active");

}

function hideOverlay() {

    if (!DOM.overlay) return;

    DOM.overlay.classList.remove("active");

}

/*==================================================
    BODY SCROLL
==================================================*/

function lockBodyScroll() {

    document.body.style.overflow = "hidden";

}

function unlockBodyScroll() {

    document.body.style.overflow = "";

}

/*==================================================
    OPEN MENU
==================================================*/

function openMobileMenu() {

    if (!DOM.mobileMenu) return;

    DOM.mobileMenu.classList.add("active");

    showOverlay();

    lockBodyScroll();

    MobileMenu.isOpen = true;

}

/*==================================================
    CLOSE MENU
==================================================*/

function closeMobileMenu() {

    if (!DOM.mobileMenu) return;

    DOM.mobileMenu.classList.remove("active");

    hideOverlay();

    unlockBodyScroll();

    MobileMenu.isOpen = false;

}

/*==================================================
    TOGGLE
==================================================*/

function toggleMobileMenu() {

    if (MobileMenu.isOpen) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }

}

/*==================================================
    BUTTON
==================================================*/

function initializeMenuButton() {

    if (!DOM.mobileMenuBtn) return;

    DOM.mobileMenuBtn.addEventListener(

        "click",

        toggleMobileMenu

    );

}

/*==================================================
    OVERLAY CLICK
==================================================*/

function initializeOverlayClose() {

    if (!DOM.overlay) return;

    DOM.overlay.addEventListener(

        "click",

        closeMobileMenu

    );

}

/*==================================================
    ESC KEY
==================================================*/

function initializeEscapeKey() {

    document.addEventListener(

        "keydown",

        (event) => {

            if (

                event.key === "Escape" &&

                MobileMenu.isOpen

            ) {

                closeMobileMenu();

            }

        }

    );

}

/*==================================================
    CLOSE WHEN LINK CLICKED
==================================================*/

function initializeMenuLinks() {

    if (!DOM.mobileMenu) return;

    DOM.mobileMenu

        .querySelectorAll("a")

        .forEach(link => {

            link.addEventListener(

                "click",

                closeMobileMenu

            );

        });

}

/*==================================================
    RESIZE
==================================================*/

function initializeResizeWatcher() {

    window.addEventListener(

        "resize",

        Utils.debounce(() => {

            if (

                window.innerWidth > 992 &&

                MobileMenu.isOpen

            ) {

                closeMobileMenu();

            }

        }, 200)

    );

}

/*==================================================
    INIT
==================================================*/

function initializeMobileMenu() {

    if (MobileMenu.initialized) return;

    MobileMenu.initialized = true;

    initializeMenuButton();

    initializeOverlayClose();

    initializeEscapeKey();

    initializeMenuLinks();

    initializeResizeWatcher();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeMobileMenu

);


/*==================================================
    SEARCH SYSTEM
==================================================*/

const Search = {

    initialized: false,

    suggestions: [],

    selectedIndex: -1,

    maxHistory: 8

};

/*==================================================
    SEARCH ELEMENTS
==================================================*/

Search.input = DOM.searchInput;

Search.form = DOM.searchForm;

Search.dropdown = document.getElementById("searchSuggestions");

/*==================================================
    SAMPLE DATA
==================================================*/

Search.products = [

    "Lehenga",

    "Lehenga Choli",

    "Silk Saree",

    "Half Saree",

    "Kurti",

    "Anarkali",

    "Dupatta",

    "Blouse",

    "Wedding Collection",

    "Festival Collection",

    "Kids Wear",

    "Mens Shirt",

    "Cotton Saree",

    "Designer Saree",

    "Jewellery"

];

/*==================================================
    CREATE DROPDOWN
==================================================*/

function createSearchDropdown(){

    if(Search.dropdown) return;

    Search.dropdown=document.createElement("div");

    Search.dropdown.id="searchSuggestions";

    Search.dropdown.className="search-suggestions";

    Search.form.appendChild(Search.dropdown);

}

/*==================================================
    RENDER
==================================================*/

function renderSuggestions(list){

    if(!Search.dropdown) return;

    Search.dropdown.innerHTML="";

    if(!list.length){

        Search.dropdown.style.display="none";

        return;

    }

    list.forEach((item,index)=>{

        const div=document.createElement("div");

        div.className="search-item";

        div.textContent=item;

        div.dataset.index=index;

        div.addEventListener(

            "click",

            ()=>{

                Search.input.value=item;

                saveSearch(item);

                Search.dropdown.style.display="none";

            }

        );

        Search.dropdown.appendChild(div);

    });

    Search.dropdown.style.display="block";

}

/*==================================================
    SEARCH
==================================================*/

function performSearch(keyword){

    keyword=keyword.trim().toLowerCase();

    if(keyword===""){

        renderSuggestions([]);

        return;

    }

    const results=

        Search.products.filter(product=>

            product.toLowerCase()

            .includes(keyword)

        );

    renderSuggestions(results);

}

/*==================================================
    SAVE HISTORY
==================================================*/

function saveSearch(value){

    if(!value) return;

    State.searchHistory=

        State.searchHistory.filter(

            item=>item!==value

        );

    State.searchHistory.unshift(value);

    State.searchHistory=

        State.searchHistory.slice(

            0,

            Search.maxHistory

        );

    saveApplicationData();

}

/*==================================================
    KEYBOARD
==================================================*/

function searchKeyboard(event){

    const items=

        Search.dropdown.querySelectorAll(

            ".search-item"

        );

    if(!items.length) return;

    if(event.key==="ArrowDown"){

        event.preventDefault();

        Search.selectedIndex++;

        if(

            Search.selectedIndex>=items.length

        ){

            Search.selectedIndex=0;

        }

    }

    if(event.key==="ArrowUp"){

        event.preventDefault();

        Search.selectedIndex--;

        if(

            Search.selectedIndex<0

        ){

            Search.selectedIndex=

            items.length-1;

        }

    }

    items.forEach(item=>

        item.classList.remove("active")

    );

    if(items[Search.selectedIndex]){

        items[Search.selectedIndex]

        .classList.add("active");

    }

    if(

        event.key==="Enter" &&

        Search.selectedIndex>-1

    ){

        event.preventDefault();

        const value=

            items[Search.selectedIndex]

            .textContent;

        Search.input.value=value;

        saveSearch(value);

        Search.dropdown.style.display="none";

    }

}

/*==================================================
    EVENTS
==================================================*/

function initializeSearchEvents(){

    if(!Search.input) return;

    Search.input.addEventListener(

        "input",

        Utils.debounce((event)=>{

            performSearch(

                event.target.value

            );

        },250)

    );

    Search.input.addEventListener(

        "keydown",

        searchKeyboard

    );

    document.addEventListener(

        "click",

        (event)=>{

            if(

                !Search.form.contains(

                    event.target

                )

            ){

                Search.dropdown.style.display="none";

            }

        }

    );

    Search.form.addEventListener(

        "submit",

        (event)=>{

            event.preventDefault();

            const value=

                Search.input.value.trim();

            if(value==="") return;

            saveSearch(value);

            console.log(

                "Searching:",

                value

            );

        }

    );

}

/*==================================================
    INIT
==================================================*/

function initializeSearch(){

    if(Search.initialized) return;

    if(!Search.form) return;

    Search.initialized=true;

    createSearchDropdown();

    initializeSearchEvents();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeSearch

);

/*==================================================
    DARK MODE
==================================================*/

const Theme = {

    initialized: false,

    current: "light"

};

/*==================================================
    APPLY THEME
==================================================*/

function applyTheme(theme){

    document.documentElement.setAttribute(

        "data-theme",

        theme

    );

    Theme.current = theme;

    State.darkMode = theme === "dark";

    saveApplicationData();

    updateThemeIcon();

}

/*==================================================
    TOGGLE
==================================================*/

function toggleTheme(){

    if(Theme.current === "light"){

        applyTheme("dark");

    }else{

        applyTheme("light");

    }

}

/*==================================================
    ICON
==================================================*/

function updateThemeIcon(){

    if(!DOM.darkToggle) return;

    DOM.darkToggle.innerHTML =

        Theme.current === "dark"

        ? "☀️"

        : "🌙";

}

/*==================================================
    SYSTEM THEME
==================================================*/

function detectSystemTheme(){

    const media = window.matchMedia(

        "(prefers-color-scheme: dark)"

    );

    return media.matches

        ? "dark"

        : "light";

}

/*==================================================
    RESTORE
==================================================*/

function restoreTheme(){

    const saved = Utils.load(

        "darkMode",

        null

    );

    if(saved === null){

        applyTheme(

            detectSystemTheme()

        );

        return;

    }

    applyTheme(

        saved

            ? "dark"

            : "light"

    );

}

/*==================================================
    SYSTEM CHANGE
==================================================*/

function watchSystemTheme(){

    window.matchMedia(

        "(prefers-color-scheme: dark)"

    ).addEventListener(

        "change",

        (event)=>{

            if(

                localStorage.getItem(

                    "darkMode"

                )===null

            ){

                applyTheme(

                    event.matches

                    ? "dark"

                    : "light"

                );

            }

        }

    );

}

/*==================================================
    BUTTON
==================================================*/

function initializeThemeButton(){

    if(!DOM.darkToggle) return;

    DOM.darkToggle.addEventListener(

        "click",

        toggleTheme

    );

}

/*==================================================
    SHORTCUT
==================================================*/

function initializeThemeShortcut(){

    document.addEventListener(

        "keydown",

        (event)=>{

            if(

                event.altKey &&

                event.key.toLowerCase()==="d"

            ){

                toggleTheme();

            }

        }

    );

}

/*==================================================
    INIT
==================================================*/

function initializeTheme(){

    if(Theme.initialized) return;

    Theme.initialized = true;

    restoreTheme();

    initializeThemeButton();

    initializeThemeShortcut();

    watchSystemTheme();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeTheme

);

/*==================================================
    SCROLL PROGRESS
==================================================*/

const ScrollProgress = {

    initialized: false,

    ticking: false

};

/*==================================================
    UPDATE PROGRESS
==================================================*/

function updateScrollProgress(){

    if(!DOM.progressBar) return;

    const scrollTop = window.scrollY;

    const documentHeight =

        document.documentElement.scrollHeight -

        window.innerHeight;

    const progress =

        documentHeight > 0

        ? (scrollTop / documentHeight) * 100

        : 0;

    DOM.progressBar.style.width =

        progress + "%";

}

/*==================================================
    RAF PERFORMANCE
==================================================*/

function requestProgressUpdate(){

    if(ScrollProgress.ticking) return;

    ScrollProgress.ticking = true;

    requestAnimationFrame(()=>{

        updateScrollProgress();

        ScrollProgress.ticking = false;

    });

}

/*==================================================
    PAGE COMPLETE
==================================================*/

function completeProgress(){

    if(!DOM.progressBar) return;

    DOM.progressBar.style.width = "100%";

}

/*==================================================
    RESET
==================================================*/

function resetProgress(){

    if(!DOM.progressBar) return;

    DOM.progressBar.style.width = "0%";

}

/*==================================================
    PAGE VISIBILITY
==================================================*/

function initializeVisibilityWatcher(){

    document.addEventListener(

        "visibilitychange",

        ()=>{

            if(

                document.visibilityState ===

                "visible"

            ){

                updateScrollProgress();

            }

        }

    );

}

/*==================================================
    WINDOW EVENTS
==================================================*/

function initializeProgressEvents(){

    window.addEventListener(

        "scroll",

        requestProgressUpdate,

        { passive:true }

    );

    window.addEventListener(

        "resize",

        Utils.debounce(

            updateScrollProgress,

            150

        )

    );

    window.addEventListener(

        "load",

        completeProgress

    );

}

/*==================================================
    INIT
==================================================*/

function initializeScrollProgress(){

    if(ScrollProgress.initialized) return;

    ScrollProgress.initialized = true;

    resetProgress();

    updateScrollProgress();

    initializeVisibilityWatcher();

    initializeProgressEvents();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeScrollProgress

);

/*==================================================
    BACK TO TOP
==================================================*/

const BackToTop = {

    initialized: false,

    visibleAfter: 300,

    scrolling: false

};

/*==================================================
    SHOW / HIDE BUTTON
==================================================*/

function updateBackToTopVisibility(){

    if(!DOM.backTop) return;

    if(window.scrollY >= BackToTop.visibleAfter){

        DOM.backTop.classList.add("show");

    }else{

        DOM.backTop.classList.remove("show");

    }

}

/*==================================================
    SMOOTH SCROLL
==================================================*/

function scrollToTop(){

    if(BackToTop.scrolling) return;

    BackToTop.scrolling = true;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

    setTimeout(()=>{

        BackToTop.scrolling=false;

    },700);

}

/*==================================================
    BUTTON CLICK
==================================================*/

function initializeBackTopButton(){

    if(!DOM.backTop) return;

    DOM.backTop.addEventListener(

        "click",

        scrollToTop

    );

}

/*==================================================
    KEYBOARD SHORTCUT
==================================================*/

function initializeBackTopShortcut(){

    document.addEventListener(

        "keydown",

        (event)=>{

            if(

                event.altKey &&

                event.key.toLowerCase()==="t"

            ){

                scrollToTop();

            }

        }

    );

}

/*==================================================
    SCROLL LISTENER
==================================================*/

const handleBackTopScroll = Utils.throttle(()=>{

    updateBackToTopVisibility();

},16);

/*==================================================
    ACCESSIBILITY
==================================================*/

function initializeAccessibility(){

    if(!DOM.backTop) return;

    DOM.backTop.setAttribute(

        "aria-label",

        "Back to Top"

    );

    DOM.backTop.setAttribute(

        "role",

        "button"

    );

    DOM.backTop.setAttribute(

        "tabindex",

        "0"

    );

    DOM.backTop.addEventListener(

        "keydown",

        (event)=>{

            if(

                event.key==="Enter" ||

                event.key===" "

            ){

                event.preventDefault();

                scrollToTop();

            }

        }

    );

}

/*==================================================
    INIT
==================================================*/

function initializeBackToTop(){

    if(BackToTop.initialized) return;

    BackToTop.initialized = true;

    updateBackToTopVisibility();

    initializeBackTopButton();

    initializeBackTopShortcut();

    initializeAccessibility();

    window.addEventListener(

        "scroll",

        handleBackTopScroll,

        { passive:true }

    );

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeBackToTop

);

/*==================================================
    HERO SLIDER
==================================================*/

const HeroSlider = {

    initialized: false,

    current: 0,

    autoplay: true,

    interval: 5000,

    timer: null,

    touchStartX: 0,

    touchEndX: 0

};

/*==================================================
    ELEMENTS
==================================================*/

HeroSlider.container = document.querySelector(".hero-slider");

HeroSlider.slides = document.querySelectorAll(".hero-slide");

HeroSlider.prev = document.querySelector(".hero-prev");

HeroSlider.next = document.querySelector(".hero-next");

HeroSlider.dots = document.querySelector(".hero-dots");

/*==================================================
    CREATE DOTS
==================================================*/

function createHeroDots(){

    if(
        !HeroSlider.dots ||
        !HeroSlider.slides.length
    ) return;

    HeroSlider.dots.innerHTML = "";

    HeroSlider.slides.forEach((_,index)=>{

        const dot = document.createElement("button");

        dot.className = "hero-dot";

        if(index===0){

            dot.classList.add("active");

        }

        dot.addEventListener("click",()=>{

            goToHeroSlide(index);

        });

        HeroSlider.dots.appendChild(dot);

    });

}

/*==================================================
    UPDATE DOTS
==================================================*/

function updateHeroDots(){

    if(!HeroSlider.dots) return;

    HeroSlider.dots
        .querySelectorAll(".hero-dot")
        .forEach((dot,index)=>{

            dot.classList.toggle(

                "active",

                index===HeroSlider.current

            );

        });

}

/*==================================================
    SHOW SLIDE
==================================================*/

function showHeroSlide(index){

    if(!HeroSlider.slides.length) return;

    HeroSlider.slides.forEach(slide=>{

        slide.classList.remove("active");

    });

    HeroSlider.current=index;

    HeroSlider.slides[index]

        .classList.add("active");

    updateHeroDots();

}

/*==================================================
    NEXT
==================================================*/

function nextHeroSlide(){

    let next=

        HeroSlider.current+1;

    if(next>=HeroSlider.slides.length){

        next=0;

    }

    showHeroSlide(next);

}

/*==================================================
    PREVIOUS
==================================================*/

function previousHeroSlide(){

    let prev=

        HeroSlider.current-1;

    if(prev<0){

        prev=

        HeroSlider.slides.length-1;

    }

    showHeroSlide(prev);

}

/*==================================================
    GOTO
==================================================*/

function goToHeroSlide(index){

    showHeroSlide(index);

}

/*==================================================
    AUTOPLAY
==================================================*/

function startHeroAutoplay(){

    if(!HeroSlider.autoplay) return;

    stopHeroAutoplay();

    HeroSlider.timer=setInterval(()=>{

        nextHeroSlide();

    },HeroSlider.interval);

}

function stopHeroAutoplay(){

    clearInterval(

        HeroSlider.timer

    );

}

/*==================================================
    BUTTONS
==================================================*/

function initializeHeroButtons(){

    HeroSlider.next?.addEventListener(

        "click",

        nextHeroSlide

    );

    HeroSlider.prev?.addEventListener(

        "click",

        previousHeroSlide

    );

}

/*==================================================
    HOVER
==================================================*/

function initializeHeroHover(){

    if(!HeroSlider.container) return;

    HeroSlider.container.addEventListener(

        "mouseenter",

        stopHeroAutoplay

    );

    HeroSlider.container.addEventListener(

        "mouseleave",

        startHeroAutoplay

    );

}

/*==================================================
    KEYBOARD
==================================================*/

function initializeHeroKeyboard(){

    document.addEventListener(

        "keydown",

        (event)=>{

            if(event.key==="ArrowRight"){

                nextHeroSlide();

            }

            if(event.key==="ArrowLeft"){

                previousHeroSlide();

            }

        }

    );

}

/*==================================================
    TOUCH SUPPORT
==================================================*/

function initializeHeroTouch(){

    if(!HeroSlider.container) return;

    HeroSlider.container.addEventListener(

        "touchstart",

        event=>{

            HeroSlider.touchStartX=

                event.changedTouches[0].clientX;

        }

    );

    HeroSlider.container.addEventListener(

        "touchend",

        event=>{

            HeroSlider.touchEndX=

                event.changedTouches[0].clientX;

            const distance=

                HeroSlider.touchStartX-

                HeroSlider.touchEndX;

            if(distance>50){

                nextHeroSlide();

            }

            if(distance<-50){

                previousHeroSlide();

            }

        }

    );

}

/*==================================================
    INIT
==================================================*/

function initializeHeroSlider(){

    if(HeroSlider.initialized) return;

    if(!HeroSlider.slides.length) return;

    HeroSlider.initialized=true;

    createHeroDots();

    showHeroSlide(0);

    initializeHeroButtons();

    initializeHeroHover();

    initializeHeroKeyboard();

    initializeHeroTouch();

    startHeroAutoplay();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeHeroSlider

);

/*==================================================
    PRODUCT SLIDER
==================================================*/

const ProductSlider = {

    initialized: false,

    sliders: [],

    autoplayDelay: 4000

};

/*==================================================
    CREATE SLIDER
==================================================*/

function createProductSlider(container){

    const track = container.querySelector(".products-track");

    const items = container.querySelectorAll(".product-card");

    const prev = container.querySelector(".slider-prev");

    const next = container.querySelector(".slider-next");

    if(!track || !items.length) return;

    const slider = {

        container,

        track,

        items,

        prev,

        next,

        index:0,

        visible:4,

        timer:null

    };

    ProductSlider.sliders.push(slider);

}

/*==================================================
    UPDATE
==================================================*/

function updateProductSlider(slider){

    const width = slider.items[0].offsetWidth;

    const gap = 20;

    slider.track.style.transform =

        `translateX(-${slider.index*(width+gap)}px)`;

}

/*==================================================
    NEXT
==================================================*/

function nextProductSlide(slider){

    const max =

        slider.items.length-slider.visible;

    slider.index++;

    if(slider.index>max){

        slider.index=0;

    }

    updateProductSlider(slider);

}

/*==================================================
    PREVIOUS
==================================================*/

function previousProductSlide(slider){

    const max =

        slider.items.length-slider.visible;

    slider.index--;

    if(slider.index<0){

        slider.index=max;

    }

    updateProductSlider(slider);

}

/*==================================================
    AUTOPLAY
==================================================*/

function startProductAutoplay(slider){

    stopProductAutoplay(slider);

    slider.timer=setInterval(()=>{

        nextProductSlide(slider);

    },ProductSlider.autoplayDelay);

}

function stopProductAutoplay(slider){

    clearInterval(slider.timer);

}

/*==================================================
    RESPONSIVE ITEMS
==================================================*/

function updateVisibleItems(slider){

    const width=window.innerWidth;

    if(width>=1400){

        slider.visible=4;

    }else if(width>=992){

        slider.visible=3;

    }else if(width>=768){

        slider.visible=2;

    }else{

        slider.visible=1;

    }

}

/*==================================================
    EVENTS
==================================================*/

function initializeSliderEvents(slider){

    slider.next?.addEventListener(

        "click",

        ()=>nextProductSlide(slider)

    );

    slider.prev?.addEventListener(

        "click",

        ()=>previousProductSlide(slider)

    );

    slider.container.addEventListener(

        "mouseenter",

        ()=>stopProductAutoplay(slider)

    );

    slider.container.addEventListener(

        "mouseleave",

        ()=>startProductAutoplay(slider)

    );

}

/*==================================================
    RESIZE
==================================================*/

function updateAllProductSliders(){

    ProductSlider.sliders.forEach(slider=>{

        updateVisibleItems(slider);

        updateProductSlider(slider);

    });

}

/*==================================================
    INITIALIZE
==================================================*/

function initializeProductSlider(){

    if(ProductSlider.initialized) return;

    ProductSlider.initialized=true;

    document

    .querySelectorAll(".product-slider")

    .forEach(container=>{

        createProductSlider(container);

    });

    ProductSlider.sliders.forEach(slider=>{

        updateVisibleItems(slider);

        updateProductSlider(slider);

        initializeSliderEvents(slider);

        startProductAutoplay(slider);

    });

    window.addEventListener(

        "resize",

        Utils.debounce(

            updateAllProductSliders,

            200

        )

    );

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeProductSlider

);

/*==================================================
    CATEGORY SLIDER
==================================================*/

const CategorySlider = {

    initialized: false,

    currentIndex: 0,

    visibleItems: 6,

    autoPlay: true,

    interval: 3500,

    timer: null

};

/*==================================================
    ELEMENTS
==================================================*/

CategorySlider.container =
document.querySelector(".categories-slider");

CategorySlider.track =
document.querySelector(".categories-track");

CategorySlider.cards =
document.querySelectorAll(".category-card");

CategorySlider.prev =
document.querySelector(".categories-prev");

CategorySlider.next =
document.querySelector(".categories-next");

/*==================================================
    RESPONSIVE
==================================================*/

function updateCategoryVisibleItems(){

    const width = window.innerWidth;

    if(width >= 1400){

        CategorySlider.visibleItems = 6;

    }else if(width >= 1200){

        CategorySlider.visibleItems = 5;

    }else if(width >= 992){

        CategorySlider.visibleItems = 4;

    }else if(width >= 768){

        CategorySlider.visibleItems = 3;

    }else if(width >= 576){

        CategorySlider.visibleItems = 2;

    }else{

        CategorySlider.visibleItems = 1;

    }

}

/*==================================================
    UPDATE POSITION
==================================================*/

function updateCategorySlider(){

    if(
        !CategorySlider.track ||
        !CategorySlider.cards.length
    ) return;

    const cardWidth =
        CategorySlider.cards[0].offsetWidth;

    const gap = 20;

    const translate =

        CategorySlider.currentIndex *

        (cardWidth + gap);

    CategorySlider.track.style.transform =

        `translateX(-${translate}px)`;

}

/*==================================================
    NEXT
==================================================*/

function nextCategorySlide(){

    const max =

        Math.max(

            CategorySlider.cards.length -

            CategorySlider.visibleItems,

            0

        );

    CategorySlider.currentIndex++;

    if(CategorySlider.currentIndex > max){

        CategorySlider.currentIndex = 0;

    }

    updateCategorySlider();

}

/*==================================================
    PREVIOUS
==================================================*/

function previousCategorySlide(){

    const max =

        Math.max(

            CategorySlider.cards.length -

            CategorySlider.visibleItems,

            0

        );

    CategorySlider.currentIndex--;

    if(CategorySlider.currentIndex < 0){

        CategorySlider.currentIndex = max;

    }

    updateCategorySlider();

}

/*==================================================
    AUTOPLAY
==================================================*/

function startCategoryAutoplay(){

    if(!CategorySlider.autoPlay) return;

    stopCategoryAutoplay();

    CategorySlider.timer = setInterval(()=>{

        nextCategorySlide();

    },CategorySlider.interval);

}

function stopCategoryAutoplay(){

    clearInterval(

        CategorySlider.timer

    );

}

/*==================================================
    TOUCH SUPPORT
==================================================*/

let categoryTouchStart = 0;

let categoryTouchEnd = 0;

function initializeCategoryTouch(){

    if(!CategorySlider.container) return;

    CategorySlider.container.addEventListener(

        "touchstart",

        event=>{

            categoryTouchStart =

            event.changedTouches[0].clientX;

        }

    );

    CategorySlider.container.addEventListener(

        "touchend",

        event=>{

            categoryTouchEnd =

            event.changedTouches[0].clientX;

            const distance =

                categoryTouchStart -

                categoryTouchEnd;

            if(distance > 50){

                nextCategorySlide();

            }

            if(distance < -50){

                previousCategorySlide();

            }

        }

    );

}

/*==================================================
    BUTTON EVENTS
==================================================*/

function initializeCategoryButtons(){

    CategorySlider.next?.addEventListener(

        "click",

        nextCategorySlide

    );

    CategorySlider.prev?.addEventListener(

        "click",

        previousCategorySlide

    );

}

/*==================================================
    HOVER
==================================================*/

function initializeCategoryHover(){

    if(!CategorySlider.container) return;

    CategorySlider.container.addEventListener(

        "mouseenter",

        stopCategoryAutoplay

    );

    CategorySlider.container.addEventListener(

        "mouseleave",

        startCategoryAutoplay

    );

}

/*==================================================
    RESIZE
==================================================*/

function initializeCategoryResize(){

    window.addEventListener(

        "resize",

        Utils.debounce(()=>{

            updateCategoryVisibleItems();

            updateCategorySlider();

        },200)

    );

}

/*==================================================
    INITIALIZE
==================================================*/

function initializeCategorySlider(){

    if(CategorySlider.initialized) return;

    if(!CategorySlider.track) return;

    CategorySlider.initialized = true;

    updateCategoryVisibleItems();

    updateCategorySlider();

    initializeCategoryButtons();

    initializeCategoryTouch();

    initializeCategoryHover();

    initializeCategoryResize();

    startCategoryAutoplay();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeCategorySlider

);


/*==================================================
    FLASH SALE COUNTDOWN
==================================================*/

const Countdown = {

    initialized: false,

    timer: null,

    endDate: new Date(

        Date.now() +

        (3 * 24 * 60 * 60 * 1000)

    )

};

/*==================================================
    ELEMENTS
==================================================*/

Countdown.days =
document.getElementById("days");

Countdown.hours =
document.getElementById("hours");

Countdown.minutes =
document.getElementById("minutes");

Countdown.seconds =
document.getElementById("seconds");

Countdown.container =
document.querySelector(".flash-countdown");

/*==================================================
    FORMAT
==================================================*/

function formatTime(value){

    return String(value).padStart(2,"0");

}

/*==================================================
    UPDATE
==================================================*/

function updateCountdown(){

    const now = new Date().getTime();

    const distance =

        Countdown.endDate.getTime() - now;

    if(distance <= 0){

        finishCountdown();

        return;

    }

    const days =

        Math.floor(

            distance /

            (1000*60*60*24)

        );

    const hours =

        Math.floor(

            (distance %

            (1000*60*60*24))

            /

            (1000*60*60)

        );

    const minutes =

        Math.floor(

            (distance %

            (1000*60*60))

            /

            (1000*60)

        );

    const seconds =

        Math.floor(

            (distance %

            (1000*60))

            /

            1000

        );

    if(Countdown.days)

        Countdown.days.textContent =

        formatTime(days);

    if(Countdown.hours)

        Countdown.hours.textContent =

        formatTime(hours);

    if(Countdown.minutes)

        Countdown.minutes.textContent =

        formatTime(minutes);

    if(Countdown.seconds)

        Countdown.seconds.textContent =

        formatTime(seconds);

}

/*==================================================
    FINISH
==================================================*/

function finishCountdown(){

    clearInterval(

        Countdown.timer

    );

    if(Countdown.container){

        Countdown.container.classList.add(

            "sale-ended"

        );

    }

    if(Countdown.days)

        Countdown.days.textContent="00";

    if(Countdown.hours)

        Countdown.hours.textContent="00";

    if(Countdown.minutes)

        Countdown.minutes.textContent="00";

    if(Countdown.seconds)

        Countdown.seconds.textContent="00";

    console.log(

        "Flash Sale Ended"

    );

}

/*==================================================
    RESTART
==================================================*/

function restartCountdown(days=3){

    Countdown.endDate =

        new Date(

            Date.now() +

            (days*24*60*60*1000)

        );

    startCountdown();

}

/*==================================================
    START
==================================================*/

function startCountdown(){

    clearInterval(

        Countdown.timer

    );

    updateCountdown();

    Countdown.timer =

        setInterval(

            updateCountdown,

            1000

        );

}

/*==================================================
    VISIBILITY
==================================================*/

function initializeCountdownVisibility(){

    document.addEventListener(

        "visibilitychange",

        ()=>{

            if(

                document.visibilityState ===

                "visible"

            ){

                updateCountdown();

            }

        }

    );

}

/*==================================================
    INITIALIZE
==================================================*/

function initializeCountdown(){

    if(Countdown.initialized) return;

    if(!Countdown.container) return;

    Countdown.initialized = true;

    startCountdown();

    initializeCountdownVisibility();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeCountdown

);

/*==================================================
    SCROLL ANIMATIONS
==================================================*/

const ScrollAnimation = {

    initialized: false,

    observer: null,

    animationClass: "animate"

};

/*==================================================
    ELEMENTS
==================================================*/

ScrollAnimation.elements = [

    "[data-animate]",

    ".product-card",

    ".category-card",

    ".blog-card",

    ".gallery-card",

    ".testimonial-card",

    ".look-card",

    ".brand-card",

    ".why-card",

    ".arrival-card"

];

/*==================================================
    OBSERVER CALLBACK
==================================================*/

function handleAnimation(entries){

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add(

                ScrollAnimation.animationClass

            );

            ScrollAnimation.observer.unobserve(

                entry.target

            );

        }

    });

}

/*==================================================
    CREATE OBSERVER
==================================================*/

function createAnimationObserver(){

    ScrollAnimation.observer =

        new IntersectionObserver(

            handleAnimation,

            {

                root:null,

                threshold:0.15,

                rootMargin:"0px 0px -50px 0px"

            }

        );

}

/*==================================================
    REGISTER ELEMENTS
==================================================*/

function registerAnimationElements(){

    ScrollAnimation.elements.forEach(selector=>{

        document

        .querySelectorAll(selector)

        .forEach((element,index)=>{

            element.style.transitionDelay=

                `${index*80}ms`;

            ScrollAnimation.observer.observe(

                element

            );

        });

    });

}

/*==================================================
    INITIAL STATE
==================================================*/

function prepareAnimationElements(){

    ScrollAnimation.elements.forEach(selector=>{

        document

        .querySelectorAll(selector)

        .forEach(element=>{

            if(

                !element.dataset.animate

            ){

                element.dataset.animate="fade-up";

            }

        });

    });

}

/*==================================================
    REFRESH
==================================================*/

function refreshAnimations(){

    registerAnimationElements();

}

/*==================================================
    RESET
==================================================*/

function resetAnimations(){

    document

    .querySelectorAll(".animate")

    .forEach(element=>{

        element.classList.remove(

            "animate"

        );

    });

    refreshAnimations();

}

/*==================================================
    REDUCED MOTION
==================================================*/

function prefersReducedMotion(){

    return window.matchMedia(

        "(prefers-reduced-motion: reduce)"

    ).matches;

}

/*==================================================
    INITIALIZE
==================================================*/

function initializeScrollAnimations(){

    if(ScrollAnimation.initialized) return;

    ScrollAnimation.initialized = true;

    if(prefersReducedMotion()){

        document

        .querySelectorAll(

            ScrollAnimation.elements.join(",")

        )

        .forEach(element=>{

            element.classList.add("animate");

        });

        return;

    }

    prepareAnimationElements();

    createAnimationObserver();

    registerAnimationElements();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeScrollAnimations

);

/*==================================================
    NUMBER COUNTER
==================================================*/

const Counter = {

    initialized: false,

    observer: null,

    duration: 2000

};

/*==================================================
    FORMAT NUMBER
==================================================*/

function formatCounter(value){

    return Math.floor(value).toLocaleString();

}

/*==================================================
    ANIMATE COUNTER
==================================================*/

function animateCounter(element){

    const target = Number(

        element.dataset.target || 0

    );

    const start = 0;

    const duration = Counter.duration;

    const startTime = performance.now();

    function update(currentTime){

        const elapsed = currentTime - startTime;

        const progress = Math.min(

            elapsed / duration,

            1

        );

        const value =

            start +

            (target - start) * progress;

        element.textContent =

            formatCounter(value);

        if(progress < 1){

            requestAnimationFrame(update);

        }else{

            element.textContent =

                formatCounter(target);

        }

    }

    requestAnimationFrame(update);

}

/*==================================================
    OBSERVER
==================================================*/

function handleCounter(entries){

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        animateCounter(entry.target);

        Counter.observer.unobserve(

            entry.target

        );

    });

}

/*==================================================
    CREATE OBSERVER
==================================================*/

function createCounterObserver(){

    Counter.observer =

        new IntersectionObserver(

            handleCounter,

            {

                threshold:0.4

            }

        );

}

/*==================================================
    REGISTER COUNTERS
==================================================*/

function registerCounters(){

    document

    .querySelectorAll(

        "[data-target]"

    )

    .forEach(counter=>{

        Counter.observer.observe(

            counter

        );

    });

}

/*==================================================
    RESET
==================================================*/

function resetCounters(){

    document

    .querySelectorAll(

        "[data-target]"

    )

    .forEach(counter=>{

        counter.textContent = "0";

        Counter.observer.observe(counter);

    });

}

/*==================================================
    INIT
==================================================*/

function initializeCounter(){

    if(Counter.initialized) return;

    Counter.initialized = true;

    createCounterObserver();

    registerCounters();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeCounter

);

/*==================================================
    PRODUCT QUICK VIEW
==================================================*/

const QuickView = {

    initialized: false,

    currentProduct: null

};

/*==================================================
    ELEMENTS
==================================================*/

QuickView.modal =
document.getElementById("quickViewModal");

QuickView.overlay =
document.getElementById("overlay");

QuickView.close =
document.querySelector(".quick-view-close");

QuickView.image =
document.querySelector(".quick-view-image img");

QuickView.title =
document.querySelector(".quick-view-title");

QuickView.price =
document.querySelector(".quick-view-price");

QuickView.description =
document.querySelector(".quick-view-description");

QuickView.rating =
document.querySelector(".quick-view-rating");

QuickView.quantity =
document.querySelector(".quick-view-quantity");

/*==================================================
    SAMPLE PRODUCTS
==================================================*/

const ProductData = [

{

id:1,

name:"Premium Silk Saree",

price:"₹2,499",

rating:"4.8",

image:"assets/images/product1.jpg",

description:"Premium quality silk saree with elegant traditional design."

},

{

id:2,

name:"Designer Lehenga",

price:"₹5,999",

rating:"4.9",

image:"assets/images/product2.jpg",

description:"Beautiful bridal lehenga crafted with premium embroidery."

},

{

id:3,

name:"Cotton Kurti",

price:"₹999",

rating:"4.6",

image:"assets/images/product3.jpg",

description:"Comfortable daily wear cotton kurti."

}

];

/*==================================================
    OPEN
==================================================*/

function openQuickView(productId){

    if(!QuickView.modal) return;

    const product =

    ProductData.find(item=>item.id==productId);

    if(!product) return;

    QuickView.currentProduct = product;

    if(QuickView.image)

        QuickView.image.src = product.image;

    if(QuickView.title)

        QuickView.title.textContent = product.name;

    if(QuickView.price)

        QuickView.price.textContent = product.price;

    if(QuickView.description)

        QuickView.description.textContent =

        product.description;

    if(QuickView.rating)

        QuickView.rating.textContent =

        "⭐ " + product.rating;

    if(QuickView.quantity)

        QuickView.quantity.value = 1;

    QuickView.modal.classList.add("active");

    DOM.overlay?.classList.add("active");

    document.body.style.overflow = "hidden";

}

/*==================================================
    CLOSE
==================================================*/

function closeQuickView(){

    if(!QuickView.modal) return;

    QuickView.modal.classList.remove("active");

    DOM.overlay?.classList.remove("active");

    document.body.style.overflow = "";

}

/*==================================================
    BUTTONS
==================================================*/

function initializeQuickViewButtons(){

    document

    .querySelectorAll(".quick-view-btn")

    .forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                const id =

                button.dataset.product;

                openQuickView(id);

            }

        );

    });

}

/*==================================================
    CLOSE EVENTS
==================================================*/

function initializeQuickViewClose(){

    QuickView.close?.addEventListener(

        "click",

        closeQuickView

    );

    DOM.overlay?.addEventListener(

        "click",

        closeQuickView

    );

    document.addEventListener(

        "keydown",

        event=>{

            if(

                event.key==="Escape"

            ){

                closeQuickView();

            }

        }

    );

}

/*==================================================
    ADD TO CART
==================================================*/

function initializeQuickViewCart(){

    const button =

    document.querySelector(

        ".quick-view-add-cart"

    );

    if(!button) return;

    button.addEventListener(

        "click",

        ()=>{

            if(

                !QuickView.currentProduct

            ) return;

            State.cart.push(

                QuickView.currentProduct

            );

            updateBadges();

            saveApplicationData();

            closeQuickView();

            console.log(

                "Added To Cart"

            );

        }

    );

}

/*==================================================
    WISHLIST
==================================================*/

function initializeQuickViewWishlist(){

    const button =

    document.querySelector(

        ".quick-view-wishlist"

    );

    if(!button) return;

    button.addEventListener(

        "click",

        ()=>{

            if(

                !QuickView.currentProduct

            ) return;

            State.wishlist.push(

                QuickView.currentProduct

            );

            updateBadges();

            saveApplicationData();

            console.log(

                "Added To Wishlist"

            );

        }

    );

}

/*==================================================
    INIT
==================================================*/

function initializeQuickView(){

    if(QuickView.initialized) return;

    QuickView.initialized = true;

    initializeQuickViewButtons();

    initializeQuickViewClose();

    initializeQuickViewCart();

    initializeQuickViewWishlist();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeQuickView

);

/*==================================================
    SHOPPING CART
==================================================*/

const Cart = {

    initialized: false,

    items: []

};

/*==================================================
    ELEMENTS
==================================================*/

Cart.drawer =
document.getElementById("cartDrawer");

Cart.body =
document.querySelector(".cart-items");

Cart.total =
document.querySelector(".cart-total-price");

Cart.openBtn =
document.querySelector(".cart-btn");

Cart.closeBtn =
document.querySelector(".cart-close");

/*==================================================
    LOAD CART
==================================================*/

function loadCart(){

    Cart.items = Utils.load("cart", []);

    State.cart = Cart.items;

}

/*==================================================
    SAVE CART
==================================================*/

function saveCart(){

    State.cart = Cart.items;

    Utils.save("cart", Cart.items);

    updateBadges();

}

/*==================================================
    ADD ITEM
==================================================*/

function addToCart(product){

    const existing = Cart.items.find(

        item => item.id === product.id

    );

    if(existing){

        existing.quantity++;

    }else{

        Cart.items.push({

            ...product,

            quantity:1

        });

    }

    saveCart();

    renderCart();

}

/*==================================================
    REMOVE ITEM
==================================================*/

function removeFromCart(id){

    Cart.items = Cart.items.filter(

        item => item.id !== id

    );

    saveCart();

    renderCart();

}

/*==================================================
    CHANGE QUANTITY
==================================================*/

function updateCartQuantity(id, change){

    const item = Cart.items.find(

        product => product.id === id

    );

    if(!item) return;

    item.quantity += change;

    if(item.quantity <= 0){

        removeFromCart(id);

        return;

    }

    saveCart();

    renderCart();

}

/*==================================================
    TOTAL
==================================================*/

function calculateCartTotal(){

    return Cart.items.reduce(

        (total,item)=>{

            const price = Number(

                item.price

                .replace(/[₹,]/g,"")

            );

            return total +

            price * item.quantity;

        },

        0

    );

}

/*==================================================
    RENDER
==================================================*/

function renderCart(){

    if(!Cart.body) return;

    Cart.body.innerHTML = "";

    if(!Cart.items.length){

        Cart.body.innerHTML =

        "<p>Your cart is empty.</p>";

    }

    Cart.items.forEach(product=>{

        const card = document.createElement("div");

        card.className = "cart-item";

        card.innerHTML = `

        <img src="${product.image}" alt="${product.name}">

        <div class="cart-item-content">

            <h4>${product.name}</h4>

            <p>${product.price}</p>

            <div class="quantity-box">

                <button class="qty-minus"
                data-id="${product.id}">−</button>

                <span>${product.quantity}</span>

                <button class="qty-plus"
                data-id="${product.id}">+</button>

            </div>

            <button
            class="remove-cart"
            data-id="${product.id}">

            Remove

            </button>

        </div>

        `;

        Cart.body.appendChild(card);

    });

    if(Cart.total){

        Cart.total.textContent =

        "₹" +

        calculateCartTotal()

        .toLocaleString();

    }

    initializeCartEvents();

}

/*==================================================
    EVENTS
==================================================*/

function initializeCartEvents(){

    document

    .querySelectorAll(".qty-plus")

    .forEach(button=>{

        button.onclick=()=>{

            updateCartQuantity(

                Number(button.dataset.id),

                1

            );

        };

    });

    document

    .querySelectorAll(".qty-minus")

    .forEach(button=>{

        button.onclick=()=>{

            updateCartQuantity(

                Number(button.dataset.id),

                -1

            );

        };

    });

    document

    .querySelectorAll(".remove-cart")

    .forEach(button=>{

        button.onclick=()=>{

            removeFromCart(

                Number(button.dataset.id)

            );

        };

    });

}

/*==================================================
    DRAWER
==================================================*/

function openCart(){

    Cart.drawer?.classList.add("active");

    document.body.style.overflow="hidden";

}

function closeCart(){

    Cart.drawer?.classList.remove("active");

    document.body.style.overflow="";

}

/*==================================================
    BUTTONS
==================================================*/

function initializeCartButtons(){

    Cart.openBtn?.addEventListener(

        "click",

        openCart

    );

    Cart.closeBtn?.addEventListener(

        "click",

        closeCart

    );

    DOM.overlay?.addEventListener(

        "click",

        closeCart

    );

}

/*==================================================
    INIT
==================================================*/

function initializeCart(){

    if(Cart.initialized) return;

    Cart.initialized = true;

    loadCart();

    renderCart();

    initializeCartButtons();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeCart

);

/*==================================================
    WISHLIST SYSTEM
==================================================*/

const Wishlist = {

    initialized: false,

    items: []

};

/*==================================================
    ELEMENTS
==================================================*/

Wishlist.drawer =
document.getElementById("wishlistDrawer");

Wishlist.body =
document.querySelector(".wishlist-items");

Wishlist.openBtn =
document.querySelector(".wishlist-btn");

Wishlist.closeBtn =
document.querySelector(".wishlist-close");

/*==================================================
    LOAD
==================================================*/

function loadWishlist(){

    Wishlist.items = Utils.load(

        "wishlist",

        []

    );

    State.wishlist = Wishlist.items;

}

/*==================================================
    SAVE
==================================================*/

function saveWishlist(){

    State.wishlist = Wishlist.items;

    Utils.save(

        "wishlist",

        Wishlist.items

    );

    updateBadges();

}

/*==================================================
    ADD
==================================================*/

function addToWishlist(product){

    const exists = Wishlist.items.find(

        item => item.id === product.id

    );

    if(exists){

        console.log(

            "Already in wishlist"

        );

        return;

    }

    Wishlist.items.push(product);

    saveWishlist();

    renderWishlist();

}

/*==================================================
    REMOVE
==================================================*/

function removeFromWishlist(id){

    Wishlist.items = Wishlist.items.filter(

        item => item.id !== id

    );

    saveWishlist();

    renderWishlist();

}

/*==================================================
    MOVE TO CART
==================================================*/

function moveWishlistToCart(id){

    const product = Wishlist.items.find(

        item => item.id === id

    );

    if(!product) return;

    addToCart(product);

    removeFromWishlist(id);

}

/*==================================================
    RENDER
==================================================*/

function renderWishlist(){

    if(!Wishlist.body) return;

    Wishlist.body.innerHTML = "";

    if(!Wishlist.items.length){

        Wishlist.body.innerHTML =

        "<p>Your wishlist is empty.</p>";

        return;

    }

    Wishlist.items.forEach(product=>{

        const card = document.createElement("div");

        card.className = "wishlist-item";

        card.innerHTML = `

        <img src="${product.image}"

        alt="${product.name}">

        <div class="wishlist-content">

            <h4>${product.name}</h4>

            <p>${product.price}</p>

            <div class="wishlist-actions">

                <button

                class="wishlist-cart"

                data-id="${product.id}">

                Add to Cart

                </button>

                <button

                class="wishlist-remove"

                data-id="${product.id}">

                Remove

                </button>

            </div>

        </div>

        `;

        Wishlist.body.appendChild(card);

    });

    initializeWishlistEvents();

}

/*==================================================
    EVENTS
==================================================*/

function initializeWishlistEvents(){

    document

    .querySelectorAll(".wishlist-cart")

    .forEach(button=>{

        button.onclick = ()=>{

            moveWishlistToCart(

                Number(button.dataset.id)

            );

        };

    });

    document

    .querySelectorAll(".wishlist-remove")

    .forEach(button=>{

        button.onclick = ()=>{

            removeFromWishlist(

                Number(button.dataset.id)

            );

        };

    });

}

/*==================================================
    DRAWER
==================================================*/

function openWishlist(){

    Wishlist.drawer?.classList.add(

        "active"

    );

    document.body.style.overflow = "hidden";

}

function closeWishlist(){

    Wishlist.drawer?.classList.remove(

        "active"

    );

    document.body.style.overflow = "";

}

/*==================================================
    BUTTONS
==================================================*/

function initializeWishlistButtons(){

    Wishlist.openBtn?.addEventListener(

        "click",

        openWishlist

    );

    Wishlist.closeBtn?.addEventListener(

        "click",

        closeWishlist

    );

    DOM.overlay?.addEventListener(

        "click",

        closeWishlist

    );

}

/*==================================================
    INIT
==================================================*/

function initializeWishlist(){

    if(Wishlist.initialized) return;

    Wishlist.initialized = true;

    loadWishlist();

    renderWishlist();

    initializeWishlistButtons();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeWishlist

);


/*==================================================
    QUANTITY CONTROLLER
==================================================*/

const QuantityController = {

    initialized: false,

    min: 1,

    max: 99

};

/*==================================================
    VALIDATE
==================================================*/

function validateQuantity(value){

    value = Number(value);

    if(isNaN(value)){

        value = QuantityController.min;

    }

    if(value < QuantityController.min){

        value = QuantityController.min;

    }

    if(value > QuantityController.max){

        value = QuantityController.max;

    }

    return value;

}

/*==================================================
    UPDATE INPUT
==================================================*/

function updateQuantityInput(input,value){

    if(!input) return;

    input.value = validateQuantity(value);

}

/*==================================================
    INCREASE
==================================================*/

function increaseQuantity(input){

    const value = validateQuantity(

        Number(input.value) + 1

    );

    updateQuantityInput(input,value);

    triggerQuantityUpdate(input);

}

/*==================================================
    DECREASE
==================================================*/

function decreaseQuantity(input){

    const value = validateQuantity(

        Number(input.value) - 1

    );

    updateQuantityInput(input,value);

    triggerQuantityUpdate(input);

}

/*==================================================
    MANUAL INPUT
==================================================*/

function handleQuantityInput(event){

    const input = event.target;

    updateQuantityInput(

        input,

        input.value

    );

    triggerQuantityUpdate(input);

}

/*==================================================
    UPDATE CALLBACK
==================================================*/

function triggerQuantityUpdate(input){

    const id = Number(

        input.dataset.product

    );

    const value = Number(

        input.value

    );

    const product = Cart.items.find(

        item => item.id === id

    );

    if(product){

        product.quantity = value;

        saveCart();

        renderCart();

    }

}

/*==================================================
    EVENTS
==================================================*/

function initializeQuantityEvents(){

    document

    .querySelectorAll(".qty-input")

    .forEach(input=>{

        input.addEventListener(

            "input",

            handleQuantityInput

        );

    });

    document

    .querySelectorAll(".qty-plus")

    .forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                const input =

                button.parentElement

                .querySelector(".qty-input");

                if(input){

                    increaseQuantity(input);

                }

            }

        );

    });

    document

    .querySelectorAll(".qty-minus")

    .forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                const input =

                button.parentElement

                .querySelector(".qty-input");

                if(input){

                    decreaseQuantity(input);

                }

            }

        );

    });

}

/*==================================================
    STOCK CHECK
==================================================*/

function isStockAvailable(quantity){

    return quantity <= QuantityController.max;

}

/*==================================================
    RESET
==================================================*/

function resetQuantity(input){

    if(!input) return;

    input.value = QuantityController.min;

}

/*==================================================
    INITIALIZE
==================================================*/

function initializeQuantityController(){

    if(

        QuantityController.initialized

    ) return;

    QuantityController.initialized = true;

    initializeQuantityEvents();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeQuantityController

);

/*==================================================
    PRODUCT SEARCH ENGINE
==================================================*/

const ProductSearch = {

    initialized: false,

    products: [],

    filtered: []

};

/*==================================================
    LOAD PRODUCTS
==================================================*/

function loadProductData(){

    if(window.ProductData){

        ProductSearch.products = ProductData;

    }else{

        ProductSearch.products = [];

    }

}

/*==================================================
    SEARCH PRODUCTS
==================================================*/

function searchProducts(keyword){

    keyword = keyword.trim().toLowerCase();

    if(keyword === ""){

        ProductSearch.filtered = [

            ...ProductSearch.products

        ];

        renderProductResults();

        return;

    }

    ProductSearch.filtered =

        ProductSearch.products.filter(product=>{

            return(

                product.name

                ?.toLowerCase()

                .includes(keyword)

                ||

                product.description

                ?.toLowerCase()

                .includes(keyword)

                ||

                product.category

                ?.toLowerCase()

                .includes(keyword)

                ||

                product.brand

                ?.toLowerCase()

                .includes(keyword)

            );

        });

    renderProductResults();

}

/*==================================================
    HIGHLIGHT TEXT
==================================================*/

function highlightText(text,keyword){

    if(!keyword) return text;

    const regex =

        new RegExp(

            `(${keyword})`,

            "gi"

        );

    return text.replace(

        regex,

        "<mark>$1</mark>"

    );

}

/*==================================================
    RENDER RESULTS
==================================================*/

function renderProductResults(){

    const container =

    document.querySelector(

        ".products-grid"

    );

    if(!container) return;

    container.innerHTML = "";

    if(!ProductSearch.filtered.length){

        container.innerHTML =

        `

        <div class="empty-products">

            <h3>No Products Found</h3>

            <p>Try another keyword.</p>

        </div>

        `;

        return;

    }

    ProductSearch.filtered.forEach(product=>{

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

        <img

        src="${product.image}"

        alt="${product.name}">

        <h3>

        ${product.name}

        </h3>

        <p>${product.price}</p>

        `;

        container.appendChild(card);

    });

}

/*==================================================
    LIVE SEARCH
==================================================*/

function initializeProductSearch(){

    const input =

    document.querySelector(

        "#productSearch"

    );

    if(!input) return;

    input.addEventListener(

        "input",

        Utils.debounce(event=>{

            searchProducts(

                event.target.value

            );

        },300)

    );

}

/*==================================================
    CLEAR SEARCH
==================================================*/

function clearProductSearch(){

    const input =

    document.querySelector(

        "#productSearch"

    );

    if(!input) return;

    input.value = "";

    searchProducts("");

}

/*==================================================
    SEARCH SHORTCUT
==================================================*/

function initializeSearchShortcut(){

    document.addEventListener(

        "keydown",

        event=>{

            if(

                event.ctrlKey &&

                event.key.toLowerCase()==="k"

            ){

                event.preventDefault();

                document

                .querySelector(

                    "#productSearch"

                )

                ?.focus();

            }

        }

    );

}

/*==================================================
    INIT
==================================================*/

function initializeProductSearchEngine(){

    if(ProductSearch.initialized) return;

    ProductSearch.initialized = true;

    loadProductData();

    ProductSearch.filtered = [

        ...ProductSearch.products

    ];

    initializeProductSearch();

    initializeSearchShortcut();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeProductSearchEngine

);

/*==================================================
    PRODUCT FILTER SYSTEM
==================================================*/

const ProductFilter = {

    initialized: false,

    filters: {

        category: "all",

        brand: "all",

        rating: 0,

        minPrice: 0,

        maxPrice: Infinity,

        inStock: false

    }

};

/*==================================================
    FILTER PRODUCTS
==================================================*/

function filterProducts(){

    let products = [...ProductSearch.products];

    products = products.filter(product=>{

        const price = Number(

            String(product.price)

            .replace(/[₹,]/g,"")

        );

        const categoryMatch =

            ProductFilter.filters.category==="all" ||

            product.category===

            ProductFilter.filters.category;

        const brandMatch =

            ProductFilter.filters.brand==="all" ||

            product.brand===

            ProductFilter.filters.brand;

        const ratingMatch =

            Number(product.rating || 0) >=

            ProductFilter.filters.rating;

        const priceMatch =

            price >= ProductFilter.filters.minPrice &&

            price <= ProductFilter.filters.maxPrice;

        const stockMatch =

            !ProductFilter.filters.inStock ||

            product.stock > 0;

        return (

            categoryMatch &&

            brandMatch &&

            ratingMatch &&

            priceMatch &&

            stockMatch

        );

    });

    ProductSearch.filtered = products;

    renderProductResults();

}

/*==================================================
    CATEGORY
==================================================*/

function initializeCategoryFilter(){

    document

    .querySelectorAll(

        "[data-category]"

    )

    .forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                ProductFilter.filters.category =

                button.dataset.category;

                filterProducts();

            }

        );

    });

}

/*==================================================
    BRAND
==================================================*/

function initializeBrandFilter(){

    const select =

    document.getElementById(

        "brandFilter"

    );

    if(!select) return;

    select.addEventListener(

        "change",

        ()=>{

            ProductFilter.filters.brand =

            select.value;

            filterProducts();

        }

    );

}

/*==================================================
    PRICE
==================================================*/

function initializePriceFilter(){

    const min =

    document.getElementById(

        "minPrice"

    );

    const max =

    document.getElementById(

        "maxPrice"

    );

    if(min){

        min.addEventListener(

            "input",

            ()=>{

                ProductFilter.filters.minPrice =

                Number(min.value)||0;

                filterProducts();

            }

        );

    }

    if(max){

        max.addEventListener(

            "input",

            ()=>{

                ProductFilter.filters.maxPrice =

                Number(max.value)||Infinity;

                filterProducts();

            }

        );

    }

}

/*==================================================
    RATING
==================================================*/

function initializeRatingFilter(){

    document

    .querySelectorAll(

        "[data-rating]"

    )

    .forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                ProductFilter.filters.rating =

                Number(

                    button.dataset.rating

                );

                filterProducts();

            }

        );

    });

}

/*==================================================
    STOCK
==================================================*/

function initializeStockFilter(){

    const stock =

    document.getElementById(

        "stockFilter"

    );

    if(!stock) return;

    stock.addEventListener(

        "change",

        ()=>{

            ProductFilter.filters.inStock =

            stock.checked;

            filterProducts();

        }

    );

}

/*==================================================
    RESET
==================================================*/

function resetFilters(){

    ProductFilter.filters={

        category:"all",

        brand:"all",

        rating:0,

        minPrice:0,

        maxPrice:Infinity,

        inStock:false

    };

    filterProducts();

}

/*==================================================
    INIT
==================================================*/

function initializeProductFilter(){

    if(ProductFilter.initialized) return;

    ProductFilter.initialized=true;

    initializeCategoryFilter();

    initializeBrandFilter();

    initializePriceFilter();

    initializeRatingFilter();

    initializeStockFilter();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeProductFilter

);


/*==================================================
    PRODUCT SORTING SYSTEM
==================================================*/

const ProductSort = {

    initialized: false,

    currentSort: "default"

};

/*==================================================
    SORT PRODUCTS
==================================================*/

function sortProducts(sortType){

    ProductSort.currentSort = sortType;

    let products = [...ProductSearch.filtered];

    switch(sortType){

        case "price-low":

            products.sort((a,b)=>{

                return getProductPrice(a) -

                       getProductPrice(b);

            });

            break;

        case "price-high":

            products.sort((a,b)=>{

                return getProductPrice(b) -

                       getProductPrice(a);

            });

            break;

        case "rating":

            products.sort((a,b)=>{

                return (b.rating||0) -

                       (a.rating||0);

            });

            break;

        case "popular":

            products.sort((a,b)=>{

                return (b.sales||0) -

                       (a.sales||0);

            });

            break;

        case "newest":

            products.sort((a,b)=>{

                return (b.id||0) -

                       (a.id||0);

            });

            break;

        case "name-asc":

            products.sort((a,b)=>{

                return a.name.localeCompare(b.name);

            });

            break;

        case "name-desc":

            products.sort((a,b)=>{

                return b.name.localeCompare(a.name);

            });

            break;

        default:

            break;

    }

    ProductSearch.filtered = products;

    renderProductResults();

}

/*==================================================
    PRICE HELPER
==================================================*/

function getProductPrice(product){

    return Number(

        String(product.price)

        .replace(/[₹,]/g,"")

    ) || 0;

}

/*==================================================
    SORT SELECT
==================================================*/

function initializeSortDropdown(){

    const sortSelect =

        document.getElementById(

            "sortProducts"

        );

    if(!sortSelect) return;

    sortSelect.addEventListener(

        "change",

        function(){

            sortProducts(

                this.value

            );

        }

    );

}

/*==================================================
    SORT BUTTONS
==================================================*/

function initializeSortButtons(){

    document

    .querySelectorAll(

        "[data-sort]"

    )

    .forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                document

                .querySelectorAll(

                    "[data-sort]"

                )

                .forEach(btn=>{

                    btn.classList.remove(

                        "active"

                    );

                });

                button.classList.add(

                    "active"

                );

                sortProducts(

                    button.dataset.sort

                );

            }

        );

    });

}

/*==================================================
    RESET SORT
==================================================*/

function resetSorting(){

    ProductSort.currentSort = "default";

    sortProducts("default");

}

/*==================================================
    APPLY FILTER + SORT
==================================================*/

function applyFilterAndSort(){

    filterProducts();

    sortProducts(

        ProductSort.currentSort

    );

}

/*==================================================
    INITIALIZE
==================================================*/

function initializeProductSort(){

    if(ProductSort.initialized) return;

    ProductSort.initialized = true;

    initializeSortDropdown();

    initializeSortButtons();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeProductSort

);

/*==================================================
    NEWSLETTER SYSTEM
==================================================*/

const Newsletter = {

    initialized: false,

    subscribers: []

};

/*==================================================
    ELEMENTS
==================================================*/

Newsletter.form =
document.querySelector(".newsletter-form");

Newsletter.email =
document.querySelector(".newsletter-form input[type='email']");

Newsletter.button =
document.querySelector(".newsletter-form button");

/*==================================================
    LOAD
==================================================*/

function loadSubscribers(){

    Newsletter.subscribers = Utils.load(

        "newsletterSubscribers",

        []

    );

}

/*==================================================
    SAVE
==================================================*/

function saveSubscribers(){

    Utils.save(

        "newsletterSubscribers",

        Newsletter.subscribers

    );

}

/*==================================================
    EMAIL VALIDATION
==================================================*/

function isValidEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    .test(email);

}

/*==================================================
    DUPLICATE CHECK
==================================================*/

function isSubscribed(email){

    return Newsletter.subscribers.includes(

        email.toLowerCase()

    );

}

/*==================================================
    SUBSCRIBE
==================================================*/

function subscribeNewsletter(email){

    email = email.toLowerCase();

    if(!isValidEmail(email)){

        showToast(

            "Please enter a valid email address.",

            "error"

        );

        return;

    }

    if(isSubscribed(email)){

        showToast(

            "You are already subscribed.",

            "warning"

        );

        return;

    }

    Newsletter.subscribers.push(email);

    saveSubscribers();

    showToast(

        "Newsletter subscription successful!",

        "success"

    );

    Newsletter.form.reset();

    console.log(

        "Subscribed:",

        email

    );

}

/*==================================================
    FORM SUBMIT
==================================================*/

function initializeNewsletterForm(){

    if(!Newsletter.form) return;

    Newsletter.form.addEventListener(

        "submit",

        function(event){

            event.preventDefault();

            const email =

                Newsletter.email.value.trim();

            subscribeNewsletter(email);

        }

    );

}

/*==================================================
    AUTO FOCUS
==================================================*/

function initializeNewsletterFocus(){

    Newsletter.email?.addEventListener(

        "focus",

        ()=>{

            Newsletter.email.select();

        }

    );

}

/*==================================================
    INIT
==================================================*/

function initializeNewsletter(){

    if(Newsletter.initialized) return;

    Newsletter.initialized = true;

    loadSubscribers();

    initializeNewsletterForm();

    initializeNewsletterFocus();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeNewsletter

);



/*==================================================
    CONTACT FORM
==================================================*/

const Contact = {

    initialized:false,

    sending:false

};

/*==================================================
    ELEMENTS
==================================================*/

Contact.form=document.getElementById(

    "contactForm"

);

Contact.submit=document.querySelector(

    "#contactForm button[type='submit']"

);

/*==================================================
    VALIDATION
==================================================*/

function validateContactForm(formData){

    const errors=[];

    if(formData.name.trim().length<3){

        errors.push(

            "Enter valid name."

        );

    }

    if(

        !isValidEmail(

            formData.email

        )

    ){

        errors.push(

            "Invalid email."

        );

    }

    if(

        formData.phone

        .replace(/\D/g,"")

        .length<10

    ){

        errors.push(

            "Invalid phone number."

        );

    }

    if(

        formData.subject

        .trim().length<3

    ){

        errors.push(

            "Subject required."

        );

    }

    if(

        formData.message

        .trim().length<10

    ){

        errors.push(

            "Message is too short."

        );

    }

    return errors;

}

/*==================================================
    BUTTON
==================================================*/

function setContactLoading(state){

    if(!Contact.submit) return;

    Contact.sending=state;

    Contact.submit.disabled=state;

    Contact.submit.innerHTML=

        state

        ? "Sending..."

        : "Send Message";

}

/*==================================================
    SEND
==================================================*/

async function submitContactForm(data){

    setContactLoading(true);

    try{

        await new Promise(resolve=>

            setTimeout(resolve,1500)

        );

        console.log(

            "Contact Data",

            data

        );

        showToast(

            "Message sent successfully.",

            "success"

        );

        Contact.form.reset();

    }

    catch(error){

        showToast(

            "Something went wrong.",

            "error"

        );

    }

    finally{

        setContactLoading(false);

    }

}

/*==================================================
    FORM
==================================================*/

function initializeContactForm(){

    if(!Contact.form) return;

    Contact.form.addEventListener(

        "submit",

        function(event){

            event.preventDefault();

            if(Contact.sending) return;

            const formData={

                name:

                this.name.value,

                email:

                this.email.value,

                phone:

                this.phone.value,

                subject:

                this.subject.value,

                message:

                this.message.value

            };

            const errors=

            validateContactForm(

                formData

            );

            if(errors.length){

                showToast(

                    errors[0],

                    "warning"

                );

                return;

            }

            submitContactForm(

                formData

            );

        }

    );

}

/*==================================================
    AUTO TRIM
==================================================*/

function initializeTrimInputs(){

    if(!Contact.form) return;

    Contact.form

    .querySelectorAll(

        "input,textarea"

    )

    .forEach(field=>{

        field.addEventListener(

            "blur",

            ()=>{

                field.value=

                field.value.trim();

            }

        );

    });

}

/*==================================================
    INIT
==================================================*/

function initializeContact(){

    if(Contact.initialized) return;

    Contact.initialized=true;

    initializeContactForm();

    initializeTrimInputs();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeContact

);

/*==================================================
    FAQ ACCORDION
==================================================*/

const FAQ = {

    initialized: false,

    allowMultiple: false

};

/*==================================================
    ELEMENTS
==================================================*/

FAQ.items = document.querySelectorAll(".faq-item");

/*==================================================
    CLOSE ALL
==================================================*/

function closeAllFAQs(){

    FAQ.items.forEach(item=>{

        item.classList.remove("active");

        const content = item.querySelector(".faq-content");

        if(content){

            content.style.maxHeight = null;

        }

    });

}

/*==================================================
    OPEN
==================================================*/

function openFAQ(item){

    const content = item.querySelector(".faq-content");

    if(!content) return;

    item.classList.add("active");

    content.style.maxHeight =

        content.scrollHeight + "px";

}

/*==================================================
    CLOSE
==================================================*/

function closeFAQ(item){

    const content = item.querySelector(".faq-content");

    if(!content) return;

    item.classList.remove("active");

    content.style.maxHeight = null;

}

/*==================================================
    TOGGLE
==================================================*/

function toggleFAQ(item){

    const isActive =

        item.classList.contains("active");

    if(!FAQ.allowMultiple){

        closeAllFAQs();

    }

    if(!isActive){

        openFAQ(item);

    }

}

/*==================================================
    CLICK EVENTS
==================================================*/

function initializeFAQEvents(){

    FAQ.items.forEach(item=>{

        const header =

            item.querySelector(".faq-header");

        if(!header) return;

        header.addEventListener(

            "click",

            ()=>{

                toggleFAQ(item);

            }

        );

    });

}

/*==================================================
    KEYBOARD
==================================================*/

function initializeFAQKeyboard(){

    FAQ.items.forEach(item=>{

        const header =

            item.querySelector(".faq-header");

        if(!header) return;

        header.setAttribute(

            "tabindex",

            "0"

        );

        header.addEventListener(

            "keydown",

            event=>{

                if(

                    event.key==="Enter" ||

                    event.key===" "

                ){

                    event.preventDefault();

                    toggleFAQ(item);

                }

            }

        );

    });

}

/*==================================================
    DEFAULT OPEN
==================================================*/

function openFirstFAQ(){

    if(FAQ.items.length){

        openFAQ(

            FAQ.items[0]

        );

    }

}

/*==================================================
    INIT
==================================================*/

function initializeFAQ(){

    if(FAQ.initialized) return;

    FAQ.initialized = true;

    initializeFAQEvents();

    initializeFAQKeyboard();

    openFirstFAQ();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeFAQ

);

/*==================================================
    LOGIN & REGISTER SYSTEM
==================================================*/

const Auth = {

    initialized:false,

    currentUser:null,

    rememberMe:false

};

/*==================================================
    ELEMENTS
==================================================*/

Auth.modal=document.getElementById("loginModal");

Auth.loginForm=document.getElementById("loginForm");

Auth.registerForm=document.getElementById("registerForm");

Auth.openButtons=document.querySelectorAll(".account-btn");

Auth.closeButton=document.querySelector(".login-close");

/*==================================================
    MODAL
==================================================*/

function openAuthModal(){

    if(!Auth.modal) return;

    Auth.modal.classList.add("active");

    document.body.style.overflow="hidden";

}

function closeAuthModal(){

    if(!Auth.modal) return;

    Auth.modal.classList.remove("active");

    document.body.style.overflow="";

}

/*==================================================
    PASSWORD VISIBILITY
==================================================*/

function initializePasswordToggle(){

    document

    .querySelectorAll(".password-toggle")

    .forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                const input=

                button.previousElementSibling;

                if(!input) return;

                input.type=

                input.type==="password"

                ? "text"

                : "password";

                button.textContent=

                input.type==="password"

                ? "👁"

                : "🙈";

            }

        );

    });

}

/*==================================================
    PASSWORD STRENGTH
==================================================*/

function checkPasswordStrength(password){

    let score=0;

    if(password.length>=8) score++;

    if(/[A-Z]/.test(password)) score++;

    if(/[a-z]/.test(password)) score++;

    if(/[0-9]/.test(password)) score++;

    if(/[^A-Za-z0-9]/.test(password)) score++;

    return score;

}

function updatePasswordStrength(input){

    const meter=

    document.querySelector(

        ".password-strength"

    );

    if(!meter) return;

    const score=

    checkPasswordStrength(input.value);

    meter.value=score;

}

/*==================================================
    LOGIN
==================================================*/

function loginUser(data){

    Auth.currentUser={

        email:data.email,

        name:"FashionKart User"

    };

    Utils.save(

        "currentUser",

        Auth.currentUser

    );

    showToast(

        "Login Successful",

        "success"

    );

    closeAuthModal();

}

/*==================================================
    REGISTER
==================================================*/

function registerUser(data){

    Utils.save(

        "registeredUser",

        data

    );

    showToast(

        "Registration Successful",

        "success"

    );

}

/*==================================================
    LOGIN FORM
==================================================*/

function initializeLoginForm(){

    if(!Auth.loginForm) return;

    Auth.loginForm.addEventListener(

        "submit",

        event=>{

            event.preventDefault();

            const data={

                email:

                event.target.email.value,

                password:

                event.target.password.value

            };

            if(

                !isValidEmail(

                    data.email

                )

            ){

                showToast(

                    "Invalid Email",

                    "error"

                );

                return;

            }

            loginUser(data);

        }

    );

}

/*==================================================
    REGISTER FORM
==================================================*/

function initializeRegisterForm(){

    if(!Auth.registerForm) return;

    const password=

    Auth.registerForm.querySelector(

        "input[name='password']"

    );

    password?.addEventListener(

        "input",

        ()=>{

            updatePasswordStrength(

                password

            );

        }

    );

    Auth.registerForm.addEventListener(

        "submit",

        event=>{

            event.preventDefault();

            const data={

                name:

                event.target.name.value,

                email:

                event.target.email.value,

                password:

                event.target.password.value

            };

            if(

                !isValidEmail(

                    data.email

                )

            ){

                showToast(

                    "Invalid Email",

                    "error"

                );

                return;

            }

            if(

                checkPasswordStrength(

                    data.password

                )<3

            ){

                showToast(

                    "Weak Password",

                    "warning"

                );

                return;

            }

            registerUser(data);

        }

    );

}

/*==================================================
    REMEMBER USER
==================================================*/

function restoreUserSession(){

    const user=

    Utils.load(

        "currentUser",

        null

    );

    if(user){

        Auth.currentUser=user;

        console.log(

            "Welcome Back",

            user.name

        );

    }

}

/*==================================================
    BUTTONS
==================================================*/

function initializeAuthButtons(){

    Auth.openButtons.forEach(button=>{

        button.addEventListener(

            "click",

            openAuthModal

        );

    });

    Auth.closeButton?.addEventListener(

        "click",

        closeAuthModal

    );

    DOM.overlay?.addEventListener(

        "click",

        closeAuthModal

    );

}

/*==================================================
    ESC
==================================================*/

document.addEventListener(

    "keydown",

    event=>{

        if(

            event.key==="Escape"

        ){

            closeAuthModal();

        }

    }

);

/*==================================================
    INITIALIZE
==================================================*/

function initializeAuthentication(){

    if(Auth.initialized) return;

    Auth.initialized=true;

    restoreUserSession();

    initializePasswordToggle();

    initializeLoginForm();

    initializeRegisterForm();

    initializeAuthButtons();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeAuthentication

);

/*==================================================
    TOAST NOTIFICATION SYSTEM
==================================================*/

const Toast = {

    initialized: false,

    container: null,

    duration: 3500,

    queue: []

};

/*==================================================
    CREATE CONTAINER
==================================================*/

function createToastContainer(){

    Toast.container = document.createElement("div");

    Toast.container.id = "toastContainer";

    Toast.container.className = "toast-container";

    document.body.appendChild(Toast.container);

}

/*==================================================
    ICONS
==================================================*/

function getToastIcon(type){

    switch(type){

        case "success":

            return "✅";

        case "error":

            return "❌";

        case "warning":

            return "⚠️";

        case "info":

            return "ℹ️";

        default:

            return "🔔";

    }

}

/*==================================================
    SHOW TOAST
==================================================*/

function showToast(message,type="info"){

    if(!Toast.container){

        createToastContainer();

    }

    const toast=document.createElement("div");

    toast.className=`toast toast-${type}`;

    toast.innerHTML=`

        <div class="toast-icon">

            ${getToastIcon(type)}

        </div>

        <div class="toast-content">

            ${message}

        </div>

        <button class="toast-close">

            ✕

        </button>

    `;

    Toast.container.appendChild(toast);

    requestAnimationFrame(()=>{

        toast.classList.add("show");

    });

    const timeout=setTimeout(()=>{

        removeToast(toast);

    },Toast.duration);

    toast.querySelector(".toast-close")

    .addEventListener(

        "click",

        ()=>{

            clearTimeout(timeout);

            removeToast(toast);

        }

    );

}

/*==================================================
    REMOVE
==================================================*/

function removeToast(toast){

    toast.classList.remove("show");

    setTimeout(()=>{

        toast.remove();

    },300);

}

/*==================================================
    CLEAR ALL
==================================================*/

function clearAllToasts(){

    if(!Toast.container) return;

    Toast.container.innerHTML="";

}

/*==================================================
    INIT
==================================================*/

function initializeToast(){

    if(Toast.initialized) return;

    Toast.initialized=true;

    createToastContainer();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeToast

);


/*==================================================
    LAZY LOADING & IMAGE OPTIMIZATION
==================================================*/

const LazyLoader = {

    initialized: false,

    observer: null,

    loadedImages: 0,

    totalImages: 0

};

/*==================================================
    CREATE OBSERVER
==================================================*/

function createLazyObserver(){

    LazyLoader.observer = new IntersectionObserver(

        handleLazyImages,

        {

            root:null,

            rootMargin:"150px",

            threshold:0.01

        }

    );

}

/*==================================================
    OBSERVER CALLBACK
==================================================*/

function handleLazyImages(entries){

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        loadLazyImage(entry.target);

        LazyLoader.observer.unobserve(entry.target);

    });

}

/*==================================================
    LOAD IMAGE
==================================================*/

function loadLazyImage(image){

    const source = image.dataset.src;

    if(!source) return;

    image.onload = ()=>{

        image.classList.add("loaded");

        LazyLoader.loadedImages++;

    };

    image.onerror = ()=>{

        image.classList.add("image-error");

        console.warn(

            "Failed to load:",

            source

        );

    };

    image.src = source;

    image.removeAttribute("data-src");

}

/*==================================================
    REGISTER IMAGES
==================================================*/

function registerLazyImages(){

    const images =

    document.querySelectorAll(

        "img[data-src]"

    );

    LazyLoader.totalImages =

        images.length;

    images.forEach(image=>{

        LazyLoader.observer.observe(

            image

        );

    });

}

/*==================================================
    PRELOAD HERO
==================================================*/

function preloadHeroImages(){

    document

    .querySelectorAll(

        ".hero img[data-src]"

    )

    .forEach(loadLazyImage);

}

/*==================================================
    FALLBACK
==================================================*/

function fallbackLazyLoad(){

    document

    .querySelectorAll(

        "img[data-src]"

    )

    .forEach(loadLazyImage);

}

/*==================================================
    CHECK SUPPORT
==================================================*/

function supportsIntersectionObserver(){

    return "IntersectionObserver"

    in window;

}

/*==================================================
    INIT
==================================================*/

function initializeLazyLoading(){

    if(LazyLoader.initialized) return;

    LazyLoader.initialized = true;

    if(!supportsIntersectionObserver()){

        fallbackLazyLoad();

        return;

    }

    createLazyObserver();

    preloadHeroImages();

    registerLazyImages();

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeLazyLoading

);

/*==================================================
    PERFORMANCE OPTIMIZATION
==================================================*/

const PerformanceManager = {

    initialized: false,

    observers: [],

    timers: [],

    idleTasks: []

};

/*==================================================
    REGISTER TIMER
==================================================*/

function registerTimer(timer){

    PerformanceManager.timers.push(timer);

}

/*==================================================
    CLEAR TIMERS
==================================================*/

function clearRegisteredTimers(){

    PerformanceManager.timers.forEach(timer=>{

        clearInterval(timer);

        clearTimeout(timer);

    });

    PerformanceManager.timers=[];

}

/*==================================================
    REGISTER OBSERVER
==================================================*/

function registerObserver(observer){

    if(observer){

        PerformanceManager.observers.push(observer);

    }

}

/*==================================================
    DISCONNECT OBSERVERS
==================================================*/

function disconnectObservers(){

    PerformanceManager.observers.forEach(observer=>{

        observer.disconnect();

    });

    PerformanceManager.observers=[];

}

/*==================================================
    IDLE TASKS
==================================================*/

function runIdleTask(callback){

    if("requestIdleCallback" in window){

        requestIdleCallback(callback);

    }else{

        setTimeout(callback,1);

    }

}

/*==================================================
    PREFETCH LINKS
==================================================*/

function prefetchInternalLinks(){

    document

    .querySelectorAll("a[href]")

    .forEach(link=>{

        link.addEventListener(

            "mouseenter",

            ()=>{

                const href=

                link.getAttribute("href");

                if(

                    !href ||

                    href.startsWith("#") ||

                    href.startsWith("http")

                ){

                    return;

                }

                const prefetch=

                document.createElement("link");

                prefetch.rel="prefetch";

                prefetch.href=href;

                document.head.appendChild(prefetch);

            },

            {once:true}

        );

    });

}

/*==================================================
    PASSIVE EVENTS
==================================================*/

function registerPassiveEvents(){

    window.addEventListener(

        "scroll",

        ()=>{},

        {passive:true}

    );

    window.addEventListener(

        "touchstart",

        ()=>{},

        {passive:true}

    );

    window.addEventListener(

        "touchmove",

        ()=>{},

        {passive:true}

    );

}

/*==================================================
    PAGE VISIBILITY
==================================================*/

function initializeVisibilityOptimization(){

    document.addEventListener(

        "visibilitychange",

        ()=>{

            if(

                document.hidden

            ){

                console.log(

                    "Page Hidden"

                );

            }else{

                console.log(

                    "Page Visible"

                );

            }

        }

    );

}

/*==================================================
    MEMORY CLEANUP
==================================================*/

function cleanupMemory(){

    clearRegisteredTimers();

    disconnectObservers();

}

/*==================================================
    BEFORE UNLOAD
==================================================*/

window.addEventListener(

    "beforeunload",

    cleanupMemory

);

/*==================================================
    INITIALIZE
==================================================*/

function initializePerformance(){

    if(

        PerformanceManager.initialized

    ) return;

    PerformanceManager.initialized=true;

    runIdleTask(prefetchInternalLinks);

    registerPassiveEvents();

    initializeVisibilityOptimization();

    console.log(

        "Performance Optimization Enabled"

    );

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializePerformance

);

/*==================================================
    FINAL APPLICATION
==================================================*/

const App={

    version:"1.0.0",

    initialized:false

};

/*==================================================
    CHECK DOM
==================================================*/

function checkRequiredElements(){

    const required=[

        "#app",

        "#header",

        ".website-wrapper"

    ];

    required.forEach(selector=>{

        if(!document.querySelector(selector)){

            console.warn(

                selector,

                "missing."

            );

        }

    });

}

/*==================================================
    RESTORE DATA
==================================================*/

function restoreApplicationData(){

    try{

        State.cart=

            Utils.load("cart",[]);

        State.wishlist=

            Utils.load("wishlist",[]);

        State.darkMode=

            Utils.load("darkMode",false);

    }

    catch(error){

        console.error(error);

    }

}

/*==================================================
    UPDATE BADGES
==================================================*/

function initializeApplicationState(){

    updateBadges();

}

/*==================================================
    ERROR HANDLER
==================================================*/

window.addEventListener(

    "error",

    function(event){

        console.error(

            "Application Error:",

            event.message

        );

    }

);

/*==================================================
    PROMISE ERRORS
==================================================*/

window.addEventListener(

    "unhandledrejection",

    function(event){

        console.error(

            "Unhandled Promise:",

            event.reason

        );

    }

);

/*==================================================
    RESIZE
==================================================*/

window.addEventListener(

    "resize",

    Utils.debounce(()=>{

        console.log(

            "Viewport:",

            window.innerWidth

        );

    },200)

);

/*==================================================
    ONLINE
==================================================*/

window.addEventListener(

    "online",

    ()=>{

        showToast(

            "Internet Connected",

            "success"

        );

    }

);

window.addEventListener(

    "offline",

    ()=>{

        showToast(

            "Internet Disconnected",

            "warning"

        );

    }

);

/*==================================================
    SHORTCUTS
==================================================*/

function initializeGlobalShortcuts(){

    document.addEventListener(

        "keydown",

        event=>{

            if(

                event.ctrlKey &&

                event.shiftKey &&

                event.key==="D"

            ){

                console.table(State);

            }

        }

    );

}

/*==================================================
    APP INFO
==================================================*/

function printApplicationInfo(){

    console.log(

        "%cFashionKart",

        "font-size:22px;color:#7b2cbf;font-weight:bold"

    );

    console.log(

        "Version:",

        App.version

    );

}

/*==================================================
    INITIALIZE
==================================================*/

function initializeApplication(){

    if(App.initialized) return;

    App.initialized=true;

    checkRequiredElements();

    restoreApplicationData();

    initializeApplicationState();

    initializeGlobalShortcuts();

    printApplicationInfo();

    console.log(

        "Application Ready"

    );

}

/*==================================================
    START
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeApplication

);




