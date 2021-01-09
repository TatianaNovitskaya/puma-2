document.addEventListener("DOMContentLoaded", function () {
    castomSelect.init();
});


var castomSelect = {
    objSelect: {
        man: ['Выберите размер', '40 (26.5 см)', '41 (27.5 см)', '42 (28 см)', '43 (28.5 см)', '44 (29 см)', '45 (29.5 см)']
    },
    init: function () {
        this.addSize()
    },

    addSize: function () {
        var self = this;
        var genderArray = document.querySelectorAll('.js__gender');
        genderArray.forEach(function (item) {
            var currentGenderValue = item.getAttribute('data-select');
            var currentInput = item.querySelector('[name="phone"]');
            self.createSelect(currentInput, self.objSelect[currentGenderValue])
        })


    },

    createSelect: function (itemPhone, arrayOptions) {
        var createFormGroup = document.createElement('div');
        createFormGroup.className = 'form-group';

        var createSelectDiv = document.createElement('div');
        createSelectDiv.className = 'select';

        var formSelect = document.createElement('select');
        formSelect.className = 'nice-select';
        formSelect.name = 'choose-size';
        arrayOptions.forEach(function (value, index) {
            var opt = document.createElement('option');
            if (index === 0) {
                opt.selected = 'selected';
                opt.disabled = 'disabled';
                opt.hidden = 'hidden'
            }
            opt.value = index;
            opt.innerHTML = value;
            formSelect.appendChild(opt);
        });
        createSelectDiv.appendChild(formSelect);
        createFormGroup.appendChild(createSelectDiv);

        this.addSelect(createFormGroup, itemPhone);
    },
    addSelect: function (createFormGroup, itemPhone) {
        var parentFormGroup = itemPhone.closest('.form-group');
        AppendElemenInDOM.insertAfter(createFormGroup, parentFormGroup)
        this.initSelect();

    },
    initSelect: function () {
        $('select').niceSelect();
    },
};
var AppendElemenInDOM = {
    insertAfter: function (elem, refElem) {
        var parent = refElem.parentNode;
        var next = refElem.nextSibling;
        if (next) {
            return parent.insertBefore(elem, next);
        } else {
            return parent.appendChild(elem);
        }
    },
};