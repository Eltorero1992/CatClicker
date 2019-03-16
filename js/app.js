
/* ======= Model ======= */

var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        adminMenuView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },

    getFormInfo: function(clickCount,catName,URL) {
        return octopus.setNewCatInfo(clickCount,catName,URL)
    },

    setNewCatInfo: function(clickCount,catName,URL) {
        let newCatInfo = [clickCount,catName,URL];
        let currentCat = octopus.getCurrentCat();

        for (var i = 0; i <= newCatInfo.length ; i++) {
            if (newCatInfo[i] !== "" || undefined || null) {

                switch (i) {
                    case 0 :
                        currentCat.clickCount = newCatInfo[0];
                        break
                    case 1 :
                        currentCat.name = newCatInfo[1];
                        break
                    case 2 :
                        currentCat.URL = newCatInfo[2];
                }
            }
        }

        console.log(currentCat)

        catView.render();
    }
};


/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

var adminMenuView = {

    init: function () {

        this.adminButton = document.querySelector(".adminButton");
        this.adminFormSubmitButton = document.querySelector(".submitAdminForm")
        this.adminFormCancelButton = document.querySelector(".cancelAdminForm")

        this.render();

    },

    render: function () {

        this.adminButton.addEventListener('click', function(){
            this.adminMenu = document.querySelector(".adminMenu");
            this.adminMenu.classList.toggle("hiddenMenu");
        })

        this.adminFormSubmitButton.addEventListener('click', function(){

            let formCatName = document.querySelector("input[name=catName]")
            let formURL = document.querySelector("input[name=URL]")
            let formClickNumber = document.querySelector("input[name=clickNumber]")

            octopus.getFormInfo(formClickNumber.value,formCatName.value,formURL.value);

            formCatName.value = ' ';
            formURL.value = ' ';
            formClickNumber.value = ' ';

            this.adminMenu = document.querySelector(".adminMenu");
            this.adminMenu.classList.toggle("hiddenMenu");

        })

        this.adminFormCancelButton.addEventListener('click', function(){
            let formCatName = document.querySelector("input[name=catName]")
            let formURL = document.querySelector("input[name=URL]")
            let formClickNumber = document.querySelector("input[name=clickNumber]")

            formCatName.value = ' ';
            formURL.value = ' ';
            formClickNumber.value = ' ';

            this.adminMenu = document.querySelector(".adminMenu");
            this.adminMenu.classList.toggle("hiddenMenu");


        })


    }

}

// make it go!
octopus.init();
