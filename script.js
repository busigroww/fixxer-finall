// Enhanced script for Fixxer website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });
        
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
            });
        });
    }

    // Sticky header on scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        lastScrollTop = scrollTop;
    });

    // Spare Parts Price Search Functionality
    const searchInput = document.getElementById('searchInput');
    const brandFilter = document.getElementById('brandFilter');
    const searchResults = document.getElementById('searchResults');
    const searchBtn = document.querySelector('.search-btn');

    // Ensure the search elements exist
    if (searchInput && searchResults && searchBtn && brandFilter) {
        // Initialize the search results container
        searchResults.innerHTML = '';

        // Function to perform search
        function performSearch() {
            const query = searchInput.value.trim().toLowerCase();
            const selectedBrand = brandFilter.value.trim().toUpperCase();
            
            if (query.length < 2 && selectedBrand === '') {
                searchResults.classList.remove('active');
                searchResults.innerHTML = '';
                return;
            }

            // Filter the data based on the query and selected brand
            let results = sparePartsData;
            
            // Apply text search filter if query exists
            if (query.length >= 2) {
                results = results.filter(item => 
                    item["Item Name"].toLowerCase().includes(query)
                );
            }
            
            // Apply brand filter if a brand is selected
            if (selectedBrand !== '') {
                results = results.filter(item => 
                    item["Item Name"].toUpperCase().includes(selectedBrand)
                );
            }

            // Display the results
            if (results.length > 0) {
                searchResults.innerHTML = '';
                
                results.slice(0, 10).forEach(item => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';
                    
                    const itemName = document.createElement('div');
                    itemName.className = 'item-name';
                    itemName.textContent = item["Item Name"];
                    
                    const itemPrice = document.createElement('div');
                    itemPrice.className = 'item-price';
                    itemPrice.textContent = `₹${item["Selling Price (Customer)"]}`;
                    
                    resultItem.appendChild(itemName);
                    resultItem.appendChild(itemPrice);
                    searchResults.appendChild(resultItem);
                });
                
                searchResults.classList.add('active');
            } else {
                searchResults.innerHTML = '<div class="no-results">No matching spare parts found</div>';
                searchResults.classList.add('active');
            }
        }

        // Event listeners
        searchInput.addEventListener('input', performSearch);
        brandFilter.addEventListener('change', performSearch);
        
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });

        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchBtn.contains(e.target) && !searchResults.contains(e.target) && !brandFilter.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }

    // Initialize testimonials slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length > 0 && dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                
                testimonials.forEach(testimonial => {
                    testimonial.classList.remove('active');
                });
                
                dots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                testimonials[index].classList.add('active');
                this.classList.add('active');
            });
        });
        
        // Auto-rotate testimonials
        let currentIndex = 0;
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            testimonials[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }, 5000);
    }

    // Initialize modal functionality
    const bookNowBtn = document.getElementById('bookNowBtn');
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (bookNowBtn && bookingModal && closeModal) {
        bookNowBtn.addEventListener('click', function() {
            bookingModal.classList.add('active');
        });
        
        closeModal.addEventListener('click', function() {
            bookingModal.classList.remove('active');
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('active');
            }
        });
    }

    // Add click event to hero button for booking
    const heroBookBtn = document.querySelector('.hero-buttons .btn-primary');
    if (heroBookBtn && bookingModal) {
        heroBookBtn.addEventListener('click', function() {
            bookingModal.classList.add('active');
        });
    }

    // Add click event to service cards to open booking modal
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        // Add click event to service cards to open booking modal and select appropriate appliance
        card.addEventListener('click', function() {
            const serviceTitle = this.querySelector('h3').textContent.trim();
            const bookingModal = document.getElementById('bookingModal');
            const applianceTypeSelect = document.getElementById('applianceType');
            
            // Open the booking modal
            if (bookingModal) {
                bookingModal.classList.add('active');
                
                // Select the appropriate appliance type based on the service card clicked
                if (applianceTypeSelect) {
                    // Map service titles to appliance type options
                    const serviceToApplianceMap = {
                        'AC Installation': 'ac_installation',
                        'AC Service': 'ac_service',
                        'Refrigerator Repair': 'refrigerator',
                        'Washing Machine Repair': 'washing_machine',
                        'Microwave Repair': 'microwave',
                        'General Appliance Service': 'ac_repair'
                    };
                    
                    const applianceValue = serviceToApplianceMap[serviceTitle];
                    
                    // Find and select the matching option
                    if (applianceValue) {
                        applianceTypeSelect.value = applianceValue;
                    }
                }
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.service-card, .feature, .about-image, .hero-image');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Current year for copyright
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Load spare parts data from CSV
    loadSparePartsData();
});

// Function to load and parse CSV data
function loadSparePartsData() {
    // Parse CSV data
    const csvData = `﻿Item Name,Selling Price (Customer)
WHIRLPOOL SPIN CAP,70
SAMSUNG SPIN CAP,70
VIDEOCON SPIN CAP,70
LG WASH PULLY,120
SAMSUNG WASH PULLY,120
GODREJ WASH PULLY,120
WHIRLPOOL WASH PULLY,120
BREAK PLATE MIX,120
WHIRLPOOL KNOB,40
PDS KNOB,30
GODREJ KNOB,30
GODREJ KNOB SILVER,30
SAMSUNG KNOB ,30
WHIRLPOOL DRAIN LEVER,35
SAMSUNG DRAIN LEVER,35
LG DRAIN LEVER,35
VIDEOCON DRAIN LEVER,35
WHIRLPOOL SPIN MOTOR,1000
LG OLD KNOB,25
SEMI AUTO 2MTR INLET PIPE,100
LG ROLLER,20
SAMSUNG 3 ROLLER PULSATOR ROLLER,100
SAMSUNG 2 ROLLER PULSATOR ROLLER,50
WHIRLPOOL SEMI SHOCKER,150
GODREJ SEMI SHOCKER,150
LG SEMI SHOCKER,150
VIDEOCON SEMI SHOCKER,150
SAMSUNG SEMI SHOCKER,150
TAP ADAPTOR/INLET,70
WHIRLPOOL TAP ADAPTOR,80
V BELT,80
WHIRLPOOL BELT,80
GODREJ DRAIN TIMER,150
UNIVERSAL BUFFER RAJA,110
SAMSUNG BUFFER,110
WHIRLPOOL BUFFER OLD TYPE,160
LG BUFFER OLD TYPE ,110
COCK DRAIN VAVLE RUBBER,70
LG SPIN CAP,70
TAPE ADAPTOR WHITE,70
GODREJ 15 MIN SINGLE WASH TIMER OLD 00027,350
SAMSUNG 4 WIRE 15 MIN SINGLE WASH TIMER,350
WHIRLPOOL 15 MIN 4 WIRE SINGLE WASH  TIMER,350
ONIDA 7 WIRE SINGLE WASH TIMR ,400
SAMSUNG 15 MIN SINGLE WASH TIMER,350
SAMSUNG 15 MIN DOUBLE WASH TIMER,400
WHIRLPOOL 6012 DOUBLE WASH TIMER,400
SAMSUNG 4 WIRE 15 MIN DOUBLE WASH TIMER,400
SAMSUNG 42 MIN DOUBLE WASH TIMER,400
LG 4 WIRE 15 MIN DOUBLE WASH TIMER,400
LG 4 WIRE SINGLE WASH TIMER,350
HAIER 15 MIN SINGLE WASH TIMER,350
HAIER 35 MIN SINGLE WASH TIMER,350
LG SPIN TIMER JACK,170
SAMSUNG SPIN TIMER JACK,150
VIDEOCON SPIN TIMER,150
WHIRLPOOL SPIN TIMER,150
GODREJ SPIN TIMER 00013,150
ELX 15 MIN 7 WIRE SINGLE WASH TIMER,350
WHIRLPOOL SPIN TIMER,150
LG SMALL 3 ROLLER PULSATOR,400
LG DRAIN ASSEMBLY,350
LG 9 KG DRAIN ASSEMBLY,350
WHIRLPOOL DRAIN ASSEMBLY,200
VIDEOCON DRAIN ASSEMBLY,250
SAMSUNG SPIN MOTOR W.P(DVM),950
LG SPIN MOTOR W.P (DVM),950
UNIVERSAL SPIN MOTOR W.P (DVM),950
40 T SPIN MOTOR,950
LG JACK SPIN MOTOR,950
40 T WASH MOTOR,1100
6800 WASH MOTOR,1100
180 WAT WASH MOTOR,1200
WHIRLPOOL WASH MOTOR,1100
LG WASH MOTOR WP,1100
SAMSUNG WASH MOTOR WP,1100
GODREJ 7 WIRE 35 MIN SINGLE WASH TIMER 00012,350
VIDEOCON DOUBLE WASH TIMER 42 MIN OLD,500
VOLTAS 8 WIRE 35 MIN SINGLE WASH TIMER BECKO,350
LG 42 MIN DOUBLE WASH TIMER,400
LG GEAR BOX,450
LG OLD GEAR BOX,400
WHIRLPOOL NEW MODEL GEAR BOX,550
LG 3 ROLLER PULSATOR MEDIUM OLD,400
GODREJ NEW PULSATOR,400
6801 GODREJ PULSATOR,400
VIDEOCON PULSATOR,400
LLOYD PULSATOR LG TYPE,450
VOLTAS BECKO PULSATOR,450
PANSASONIC PULSATOR,450
LLOYD PULSATOR,450
WHIRLPOOL 4 HOLE PULSATOR,400
GODREJ 4 BALL PULSATOR,400
GODREJ 4 FULLY PULSATOR,400
SAMSUNG 2 ROLLER PULSATOR ,450
SAMSUNG 4 FULLY PULSATOR,450
PDS PULSATOR,350
SAMSUNG 3 ROLLER PULSATOR,450
3 EYE PULSATOR,350
HAIER PULSATOR,450
WHIRLPOOL SMALL GEAR BOX,550
WHIRLPOOL BIG GEAR BOX,550
WHIRLPOOL 6001 GEAR BOX,450
VIRAT GEAR BOX,450
VIDEOCON 4 SCREW GEAR BOX,450
GODREJ LG TYPE GEAR BOX,450
GODREJ 4 SCREW GEAR BOX,450
VIDEOCON LG OLD TYPE GEAR BOX,450
VIDEOCON 6800 GEAR BOX,350
11 NO GEAR BOX,450
13 NO GEAR BOX,450
33 NO GEAR BOX,450
42 NO GEAR BOX,450
16 NO GEAR BOX,450
22 NO GEAR BOX,450
17 NO GEAR BOX,450
07 NO GEAR BOX,450
21 NO GEAR BOX,450
SAMSUNG GEAR BOX,450
3 MTR INLET PIPE GODREJ,150
SINGLE MANIFOLD GAUGE  350 PSI(DVM),550
250 PSI GAUGE,300
HC VALVE (DVM),250
HC VALVE (RISE),250
MAIN CODE,200
GODREJ 6801 GEAR BOX,450
GODREJ 7002 GEAR BOX,450
WHIRPOOL BULB,10-12 NO,30
LG STAR 1 VEG BOX,450
SAMSUNG VEG BOX,450
STAR 1.5 VEG BOX,450
LG OLD SPIN LID,450
GODREJ EDGE PRO FREEZER DOOR 03159,220
WHIRLPOOL ZENUS BOTTLE SHELF,150
LG STAR 1 BOTTLE SHELF,120
SAMSUNG 1719 BOTTLE SHELF,200
WHIRLPOOL ZENY BOTTLE SHELF,250
LG 2689 BOTTLE SHELF,250
STAR 1.5 FREEZER DOOR,200
SAMSUNG FREEZER DOOR,200
LG SPUN,20
WHIRLPOOL FAN MOTOR,500
GODREJ FAN MOTOR 00380,400
6120 FAN MOTOR(RAISE),600
CHARGING NIPPLE,30
10 WAT FAN MOTOR(DIKEN),650
5 WAT FAN MOTOR,550
2 POLE CONTRACTOR (KOVEA),350
1 POLE CONTRACTOR (DIKEN),350
3 POLE CONTRACTOR ,500
LG FAN MOTOR ,450
SAMSUNG FAN MOTOR,350
WHIRLPOOL RADIAL FAN,920
GODREJ DC FAN MOTOR PANASONIC 00166,750
DOUBLE MANIFOLD GAUGE 134 (BLASK),1000
LG SPIN PULLY,120
SAMSUNG SPIN PULLY,120
SAMSUNG SPIN PULLY NEW,120
GODREJ SPIN PULLY,120
GODREJ 8 HOURS FROST FREE TIMER,300
WHIRLPOOL RBI THERMOSTAT,200
THIMBAL,200
SAMSUNG PRESSURE SENSOR,300
LG PRESSURE SENSOR,350
WASHING MACHINE BUZZER,100
LG DOOR LOCK FRONT LOAD,450
SAMSUNG DOOR LOCK FRONT LOAD,450
IFB DOOR LOCK FRONT LOAD,450
LG MAGIC FITTER,150
SAMSUNG MAGIC FITTER,150
HMB MAGIC FITTER,40
VIJAY MAGIC FITTER,70
ANUPOORNA MAGIC FILTER,50
GODREJ POUCH CAPLARY,100
36 INCH CAPLARY,100
40 INCH CAPLARIY,110
25 GM DRIER,75
WHIRLPOOL DRAIN MOTOR ASS,550
WHIRLPOOL DUMP VALUE ASS,300
BABA DRIER,65
SAMSUNG THERMOSTAT,200
LG FROST FREE TIMER ,300
Frost free TIMER Samsung,300
WHIRLPOOL Frost Free TIMER,350
WHIRLPOOL Frosr Free TIMER LG TYPE,350
WHIRLPOOL R-600 Thermostat,210
VIDEOCON LINT FITTER ,30
SAMSUNG LINT FITTER ,40
GODREJ LINT FITTER,40
LG LINT FITTER,40
WHIRLPOOL LINT FITTER,50
WHIRLPOOL BIMETAL,200
WHIRLPOOL THARMAL FUSE,120
GODREJ BIMETAL 01751,150
LG BIMETAL ,170
GODREJ OVER FLOW PIPE INNER HOSE,250
SAMSUNG BIMETAL,170
T-11 THERMOSTAT(ANUPURNA),250
GODREJ 36 NO THERMOSTAT,200
WHIRLPOOL OPERA THERMOSTAT,200
SAMSUNG INLET VALVE SINGLE(0),300
SAMSUNG DOUBLE INLET VALVE(0),500
GODREJ SINGLE INLET VALVE,250
GODREJ SINGLE INLET VALVE OLD,250
LG SINGLE INLET VALVE ,250
LG SINGLE DC AC TYPE INLET VALVE,250
LG DOUBLE INLET VALVE,400
WHIRLPOOL SINGLE INLET VALVE(L),250
WHIRLPOOL SINGLE INLET VALVE(0),350
DRAIN FITA CLOTH,30
TORCH GUARD,50
LG DRAIN MOTOR,550
SAMSUNG DRAIN MOTOR,450
LG DOUBLE DC INLET VALVE RED BLUE,550
LG DC INLET VALVE BLUE,350
WHIRLPOOL R-600 RELAY,150
WHIRLPOOL 1340 RELAY,110
WHIRLPOOL 1340 OLP,110
LG THERMOSTAT,200
LG OLD  THERMOSTAT,200
1 PIN RELAY,70
88 RELAY,220
88 OLP,110
4941 RELAY (GRATWAL),200
SAMSUNG RELAY,180
GODREJ PTC RELAY 00178,150
4241 RELAY (GRATWAL),200
72 H3 OLP (ANUPURNA),150
AC RELAY (MICROTECH),250
1 MFD BLACK CAPACITOR,50
2 MFD BLACK CAPACITOR,60
3 MFD BLACK CAPACITOR,65
5 MFD BLACK CAPACITOR,80
2.5 MFD BLACK CAPACITOR,60
3.15 MFD BLACK CAPACITOR,70
1.5 MFD BLACK CAPACITOR,50
LG DRAIN VALVE,300
SAMSUNG DRAIN VALVE,300
IFB DRAIN VALVE,350
GODREJ APOXY,90
LG SINGLE LINE SPIN LID,400
LG DOUBLE LINE SPIN LID,400
LG WIND JET DRY SPIN LID,450
LG WIND JET DRY SPIN LID,450
VOLTAS BECKO FAST DRY SPIN LID,500
WHIRLPOOL SPIN LID,450
VIDEOCON SPIN LID,400
SAMSUNG SPIN LID AIR TURBO SPIN LID,500
LG 10001 PULSATOR,400
GODREJ 6502 GEAR BOX,450
WHIRLPOOL OVER FLOW PIPE,50
PATLA OVER FLOW PIPE,40
OVER FLOW PIPE WITH HOLDER,100
HAIER MAGIC FITTER,200
SMALL CLAMP METER,450
OVER FLOW PIPE,50
4 PIN RELAY,70
3 PIN RELAY,70
2 PIN RELAY,70
DRIER ANNPURNA,30
GODREJ MINI BLBC PCB 02839,1750
GODREJ EDGE FREEZER DOOR,220
GODREJ EDGE FREEZER FRAME,150
LG DC FAN SQUIRE,650
SAMSUNG DC FAN SQUIRE,650
GODREJ BLDC PCB 02408,1900
LG COCK PACK,80
DRAIN PIPE 2 MTR,120
DRAIN PIPE 3 MTR,250
OLP ,60
LG SINGLE DOOR PCB,1750
1/4 FLAIR NUT/FLARE NUT,35
3/8 FLAIR NUT/FLARE NUT,50
5/16 FLAIR NUT/FLARE NUT,55
1/2 FLAIR NUT/FLARE NUT,60
5/8 * 1/2 RADUSER NUT,80
1/4 DEAD NUT/DEAD NUT,35
5/16 DEAD NUT/DEAD NUT,45
1/4 SPLIT CAP,35
1/2 SPLIT CAP,50
3/8 SPLIT CAP,55
BALL VALVE,220
GAS CYLINDER VALVE,130
1/4 UNION ,60
WHIRLPOOL HINGE,80
LG HINGE,80
SAMSUNG HINGE,80
5/8 FLAIR NUT /FLARE NUT,90
2 WAY FILTER VIJAY,65
3 WAY FILTER VIJAY,65
4 WAY FILTER VIJAY,65
5 MFD ROUND CAPACITOR,70
6 MFD ROUND CAPACITOR,80
3 MFD ROUND CAPACITOR,60
4 MFD ROUND CAPACITOR,70
10 MFD ROUND CAPACITOR,90
9+5 MFD ROUND CAPACITOR  (DIKEN),150
10+5 MFD CAPACITOR (JKB),160
11+6 MFD CAPACITOR (JKB),160
12+5 MFD CAPACITOR (JKB),170
2.5 MFD CAPACITOR ROUND,50
410 CHARGING PIPE,300
134 CHARGING PIPE,250
FILTER ADAPTOR,150
TORCH (KOVEA),250
80+100 MFD CAPACITOR (CONCAP),170
40+60 MFD CAPACITOR (CONCAP),150
60+80 MFD CAPACITOR,160
36 MFD (MTECH) CAPACITOR,160
50 MFD (MTECH) CAPACITOR,180
45 MFD (MTECH) CAPACITOR,170
120+150 MFD (DIKEN) CAPACITOR,190
150+200 MFD (DIKEN) CAPACITOR,200
100+120 MFD (DIKEN) CAPACITOR,180
55 MFD (DIKEN) CAPACITOR,220
1 MFD MICROWAVE CAPACITOR(DIKEN),250
1/2 BINDER /BINDER /BINDER,100
5/8 BINDER/ BINDER/BINDER,120
1/2 INDOOR BINDER,150
5/8 INDOOR BINDER,200
1/4 OUT DOOR VALVE,250
1/2 OUTDOOR VALVE,300
5/8 OUTDOOR VALVE,500
LG FROST FREE THERMOSTAT,220
WHIRLPOOL FROST FREE THERMOSTAT,270
SAMSUNG FROST FREE THERMOSTAT,225
LG OLD KNOB,20
GODREJ DC FAN 00166,750
BIG CLAMP METER (KOVEA),500
12 NO LED BULB,40
14 NO LED BULB,40
WIRE CUTTER /WIRE CUTTOR,90
CONTINUTY TESTER,80
LG DC DRAIN MOTOR,800
LANCER PCB,950
4000 UNIVERSAL PCB,950
SAMSUNG CHOKE PCB,550
SWING MOTOR MIX,250
250 MM TIE CABLE/CABAL,140
50+4 MFD (MTECH),220
55+4 MFD (MTECH),230
45+4 MFD (UNIQ),220
2 MTR FULLY PIPE,250
3 MTR FULLY PIPE ,350
4 INCH AC AXIAL FAN MOTOR,450
6 INCH AC AXIAL FAN MOTOR,650
FLARING TOOLS,550
FLORON 134 GAS,330
HALINGS COPPER PIPE,104
GODREJ R-134 PIN gas,350
BIG LPG,120
WELDING ROD,30
R-600 GODREJ GAS,300
R-290 GODREJ,325
HYDROCARBON GODREJ GAS,200
R-32 1KG GAS CAN,750
R-410 1KG GAS CAN,750
R-22 1KG GAS CAN,750
LUSTURE LG,50
DIGITAL THERMOMETER,120
FLUX ROUND SMALL,15
Godrej Chamber 01068,950
Godrej chamber 00214,1000
Door switch double,80
Door switch godrej ,60
Door switch double,60
Door switch godrej ,40
TORCH DOUBLE MOUTH,400
EDGE PRO COOLING COIL GODREJ OO211,950
MAGNATRON 610,900
MAGNATRON L G,850
MAGNATRON SAMSUNG ,850
MAGNATRON 210 SMALL,850
DIODE DOUBLE MICRO WAVE,80
DIODE SINGLE MICRO WAVE,70
AC DRAIN PIPE,100
TOOLS BAG SAMSUNG,L.G,750
TOOLS BAG LEATHER L.G,700
LID SWITCH W/M WHITE,60
1/4 LIQUID DRIER WHITE PACK,200
SAMSUNG FAN MOTOR DC SQUARE,650
L G FROST FREE SENSOR,300
FLAME GUN TORCH,350
AC INSULATION FOAM 1/2,35
AC INSULATION FOAM 1/4,30
3 CORE WIRE (36.6),50
4 CORE WIRE (50) INVERTOR AC,60
FROST CARE TIMER GODREJ,1200
I BLUE DETERGENT LIQUID GODREJ,300
WHIRLPOOL PRESSURE SENSOR,350
GODREJ DRAIN MOTOR,450
GODREJ GEAR BOX ASS GWS 7002 PPC,450
GODREJ THERMOSTAT DOUBLE DOOR(00038),210
GODREJ PCB A SPIN BASE Q1 REF D/D(02824),1400
GODREJ FREEZER DOOR ASS EDGE PRO,220
GODREJ INTAKE VALVE,250
GODREJ RELAY (00178),150
GODREJ WATER LEVEL SENSOR,350
GODREJ SPD CHANNEL,22703,50190
TROLLY GODREJ WHEEL BARROW GODREJ 00097,1200
GODREJ SPIN MOTOR 70 WAT (00385),1000
GODREJ DEFROST TIMER 0-12HR,350
GODREJ AC STABLIZER 4KVA 130-280,3600
GODREJ FRIDGE STABLIZER 0.5 KVA(120-280),1800
GODREJ SPD CHANNEL,102990
GODREJ CONDENSOR COIL 200L,425
GODREJ CONDENSOR COIL 250L,500
GODREJ SPD CHANNEL,7139
3 PIN MAIN CORD,130
9V BATTERY(HW),35
FUSE (BIG),60
JORRIK SPRAY (MEDIUM),150
2032 BATTERY CELL,20
10 WATT LED BULB,350
FLEXKWIK GLUE,60
06 WIRE CUTTER EGO,110
07 WIRE CUTTER EGO,80
WIRE CUTTER 150 BLUE,60
CLAMP METER WIRE,120
CLAMP METER WIRE ORIGINAL,150
25 WATT SOLDING IRON ROD(SMAILL),130
25 WATT SOLDING IRON ROD(BIG),200
LINE TESTER (BEST),30
LINE TESTER (DUP),25
SOLDRING WIRE(10 GM),25
SOLDRING WIRE(30 GM),50
SOLDRING WIRE PASTE,25
L.G  freezer door,1
LG STAR I BOTTLE SHELF,120
PULSATOR SCREW,40
ANTIMOIST ,10
STAR I FREEZER DOOR,250
LG CHILL TRAY,350
VOLTAS DC INDOOR MOTOR A/C,1450
CAMIPRO DC INDOOR MOTOR A/C,1450
VOLTAS AC INDOOR MOTOR,1150
GODREJ DOOR SWITCH,60
MICROWAVE FUSE,100
MICROWAVE LID SWITCH,70
1/2,1/4 COPPER(MPCL),140
5/8 COPPER(GODREJ),130
WHIRLPOOL 170L CONDENSOR COIL,400
WHIRLPOOL 220L CONDENSOR COIL,475
HYDROCARBON GODREJ GAS,200
R-290 GODREJ,325
R-600 GODREJ GAS,300
FLORON 134 GAS,360
GODREJ BLDC PCB(02408),1900
GODREJ MINI BLDC PCB(02839),1750
GODREJ MINI 3 JACK PCB(01842),1800
GODREJ KNOB PCB(02824),1700
WHIRLPOOL FROST FREE THERMOSTAT,210
ANNAPURNA DRIER,30
GODREJ DC FAN MOTOR PANASONIC 00007,700
R-290 OIL 250ML,150
R-32 OIL 250ML,150
BATALI SERVICE MACHINE,4200
SAMSUNG NEW LED BULB,100
26MM DRILL MACHINE,2800
VACCUM PUMP(CAMPIRO),4200
BATALI SERVICE PIPE,800
BATALI SERVICE GUN,550
LG DRAIN ASSEMBLY(GODREJ),350
R-134 OIL UNICLA,310
R-134 OIL SANDEN,320
WHIRLPOOL WASHING MACHINE DOOR SWITCH,100
COIL SHINE,120
CONDENSOR CLEANER SPRAY,200
PLASTIC POLYTHENE PACKET,0.666666667
WHIRLPOOL GENIUS VEG TRAY COVER ,300
2 MTR FULLY PIPE,250
3 MTR FULLY PIPE ,350
INSULATION FOAM 5/8(90 PIPE_,40
GODREJ DRAIN PIPE 2 MTR,120
LG COMPRESSOR MA 42,2750
LG COMPRESSOR MA 53,3200
CAMIPRO COMPRESSOR 1.5 TON AC(GMCC),7300
HITACHI 1.5 TON COMPRESSOR(HIGHLY),7200
2 MTR DRAIN PIPE FRONTLOAD (IFB),100
SCROLL COMPRESSOR(8 TON),31900
LEVEL SCALE,150
DRILL BIT 5/16 STEEL,120
DRILL BIT 3/16 WALL,110
1/4 DRILL BIT WALL,90
10 INCH SALAI WRENCH,250
08 INCH SALAI WRENCH,220
ALLEN KEY 5MM ,50
ALLEN KEY 6MM,50
1.5 INCH PLASTIC GULLY PER PACKET,70
2 INCH PLASTIC GULLY PER PACKET,130
DIAL WRICH 10*11 RINCH,40
DIAL WRICH 12*13 RINCH,40
DIAL WRICH 14*15 RINCH,50
3 MTR MEASUREMENT TAPE,80
5 MTR MEASUREMENT TAPE,100
CELLO TAPE 6 PCS PACK,70
LATTO PECHKAS SCREW DRIVER,85
PECHKASS 6 NO SCREW DRIVER,100
PECHKASS 8 NO SCREW DRIVER,110
PECHKASS 10 NO SCREW DRIVER,120
PECHKASS 12 NO SCREW DRIVER,130
PECHKASS 14 NO SCREW DRIVER,150
NOSE PILAAS,90
PILAAS 8 NO,140
PIN FASTNER 3INCH 70,20
T WRINCH 11 NO RINCH ,110
INSULATION FOAM 1/4,30
INSULATION FOAM 1/2,35
VEG BOX CRISPER COVER WHIRLPOOL BIG,350
SKY TECH ODU STAND 2500 GM,330
VOLTAS AC STABLIZER 4KV 130-280,3500
GODREJ BIMETAL SENSOR 00066,350
LG BIOMETAL + SENSOR,180
CAR AC KNOB NOB NOBE,480
ADUPTOR / ADUPTOR,80
GODREJ TOP PCB 02952,1700
ALIMUNINM WELDING ROD,80
WHIRLPOOL FROST FREE SENSOR,220
WHIRLPOOL FROST FREE PCB,950
GALAXY CHARGING PIPE R 22,250
GALAXY CHARGING PIPE R 410,300
CHARGING NIPPLE,30
TUBE CUTTER BIG CT 274,380
TUBE CUTTER MINI CT 128,180
TUBE CUTTER GALAXY,180
FAN MOTOR PANASONIC 0007,700
FAN MOTOR GODREJ 00166,750
WELDING ROD,30
CAR AC CHARGING VALVE BLUE,450
CAR AC CHARGING VALVE RED,450
134 VALVE BIG AND,250
L G FRONT LOAD DRAIN MOTOR,2300
GODREJ THERMOSTAT 00036,200
MICRO WAVE TURN TABLE MOTOR 3 WAAT,250
MICRO WAVE TURN TABLE MOTOR 4 WAAT,250
CLAMP METER BIG DVM,500
ANCOR FASTNER 10 MM,25
ANCOR FASTNER 8 MM,15
NUT BOLT 12 NO,20
GAS R 22 60 KG CYLENDER,850
GAS R 32 40 KG CYLENDER,800
THERMOSTAT GODREJ FROST FREE,210
COMRESSOR GODREJ 00377,2650
COMPRESSOR GODREJ 00378,2900
SPLIT A/C 1.5 TON INV 3 STAR GODREJ,32500
GODREJ SUSPENSION ROD SET,170
MICROWAVE PULLY,70
TEMPERATURE METER,200
GODREJ SENSOR 00064,300
GODREJ PCB 00211 EDGE DIGI,1500
WASHING MACHINE COVER TL/FL,400
AC SERVICE JACKET,550
WHIRLPOOL ZENZY BOTTLE SHELF,200
WHIRLPOOL ZENZY BIG BOTTLE SHELF,250
WHIRLPOOL GENIUS BOTTLE SHELF,200
GODREJ MECHANICAL ASS OOO27 ALR,2050
GODREJ OLD MECHANICAL ASS 00001 OLD,2100
GODREJ KNOB PCB 02847,1700
AC SENSOR ALL MODEL DOUBLE,200
SENSOR GODREJ 00066,350
L.G FAN MOTOR DC SQUARE,600
SWING MOTOR HITACHI,250
ODU STAND DAIKEN,330
WATER LAVEL SENSOR HAIER,300
SCALE LUSTER POWDER L.G,50
MICRO WAVE CAPACITOR 1 MFD DAIKEN,250
GODREJ INVERTOR PCB 02839,1750
BATALI PIPE 6 MTR,800
134 HC VALVE AND,250
134 HC VALVE RAISE,250
INLET PIPE 3 MTR GODREJ,110
INLET PIPE 2 MTR GODREJ,90
CONDENSOR SPRAY,250
COIL SHINE,120
TROLLY GODREJ WHEEL BARROW GODREJ 00095,1150
INDOOR PLATE SPLIT AC,80
GODREJ BOTTLE SHELF 01153,170
GODREJ PULSATOR 04127 ALLURE,550
GAS R 22 CAN,850
RELAY GREATWALL ,250
SPLIT A/C 1 TON INV 3 STAR GODREJ,29000
3 CORE WIRE (36.6),50
4 CORE WIRE (50) INVERTOR AC,60
SPLIT A/C 1.5 TON INV 3 STAR GODREJ,32500
L.G DOOR LOCK FRONT LOAD W/M,450
FAN MOTOR PANASONIC 00007,700
FAN MOTOR GODREJ 00380,430
CHARGING PIN V`;

    // Parse the CSV data
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    
    // Initialize the array to store parsed data
    const parsedData = [];
    
    // Process each line (skip header)
    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');
        
        // Skip empty lines or lines with missing data
        if (currentLine.length < 2 || !currentLine[0].trim() || !currentLine[1].trim()) {
            continue;
        }
        
        // Create an object for this item
        const item = {
            "Item Name": currentLine[0].trim(),
            "Selling Price (Customer)": parseFloat(currentLine[1].trim()) || 0
        };
        
        // Add to parsed data array
        parsedData.push(item);
    }
    
    // Set the global sparePartsData variable
    window.sparePartsData = parsedData;
}
