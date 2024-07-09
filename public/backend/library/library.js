//ham tu biuld
//fix lỗi khi switchery chỉ hoạt động với một bản ghi duy nhất (thay "classname"="this")
(function ($) {
    'use strict';
    var HT = {};
    var _token = $('meta[name="csrf-token"]').attr('content');

    //check active
    HT.switchery = () => {
        $('.js-switch').each(function () {
            var switchery = new Switchery(this, { color: "#1AB394" });
        });
    };


    //looking for in select option
    HT.select2 = () => { //giup tra ve ket qua tuong ung khi tim kiem trong input
        if ($('.setupSelect2').length) {
            $('.setupSelect2').select2();
        }
    }


    //change activite status
    HT.changeStatus = () => {
        if ($('.status').length) {
            $(document).on('change', '.status', function (e) {
                let _this = $(this)
                let option = {
                    'value': _this.val(),
                    'modelId': _this.attr('data-modelId'),
                    'model': _this.attr('data-model'),
                    'field': _this.attr('data-field'),
                    '_token': _token
                }

                $.ajax({
                    url: 'ajax/dashboard/changeStatus',
                    type: 'POST',
                    data: option,
                    dataType: "json",
                    success: function (res) {
                        console.log(res);

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log("error:" + errorThrown);
                    }
                });
                e.preventDefault()
            })
        }
    }

    //CheckAll in user table

    HT.checkAll = () => {
        if ($('#checkAll').length) {
            $(document).on('click', '#checkAll', function () {
                let isChecked = $(this).prop('checked')

                $('.checkBoxItem').prop('checked', isChecked);
                $('.checkBoxItem').each(function () {
                    let _this = $(this);
                    HT.changeBackground(_this);
                    HT.allChecked();
                })
            })
        }
    }

    //checked each box
    HT.checkBoxItem = () => {
        if ($('.checkBoxItem').length) {
            $(document).on('click', '.checkBoxItem', function () {
                let _this = $(this)
                HT.changeBackground(_this);
            })
        }
    }

    HT.changeBackground = (object) => {
        let isChecked = object.prop('checked')
        if (isChecked) {
            object.closest('tr').addClass('active-bg');
        } else {
            object.closest('tr').removeClass('active-bg');
        }

    }

    // uncheckAll 


    HT.allChecked = () => { //error
        //if any checkbox unchecked,the checkAll is unchecked
        let allChecked = $('.checkBoxItem:checked').length === $('.checkBoxItem').length;
        $('#checkAll').prop('checked', allChecked);
    }


    HT.changeStatusAll = () => {
        if ($('.changeStatusAll').length) {
            $(document).on('click', '.changeStatusAll', function (e) {
                let _this = $(this)
                let id = []
                $('.checkBoxItem').each(function (e) {
                    let checkBox = $(this)
                    if (checkBox.prop('checked')) {
                        id.push(checkBox.val())
                    }
                })
                let option = {
                    'value': _this.attr('data-value'),
                    'model': _this.attr('data-model'),
                    'field': _this.attr('data-field'),
                    'id': id,
                    '_token': _token
                }

                $.ajax({
                    url: 'ajax/dashboard/changeStatusAll',
                    type: 'POST',
                    data: option,
                    dataType: "json",
                    success: function (res) {
                        if (option.value == 1) {
                            id.forEach(currentId => {
                                const switcheryInput = document.querySelector('.js-switch-' + currentId);
                                if (switcheryInput && !switcheryInput.checked) {
                                    switcheryInput.checked = true;
                                    const event = new Event('change'); // Tạo sự kiện thay đổi
                                    switcheryInput.dispatchEvent(event); // Gửi sự kiện để kích hoạt các trình xử lý thay đổi
                                }
                            });
                        }
                        if (option.value == 0) {
                            id.forEach(currentId => {
                                const switcheryInput = document.querySelector('.js-switch-' + currentId);
                                if (switcheryInput && switcheryInput.checked) {
                                    switcheryInput.checked = false; // Tắt switch
                                    const event = new Event('change'); // Tạo sự kiện thay đổi
                                    switcheryInput.dispatchEvent(event); // Gửi sự kiện để kích hoạt các trình xử lý thay đổi
                                }
                            });
                        }

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log("error:" + errorThrown);
                    }
                });
                e.preventDefault()
            })
        }

    }
    $(document).ready(function () {
        HT.switchery();
        HT.select2();
        HT.changeStatus();
        HT.checkAll();
        HT.checkBoxItem();
        HT.allChecked();
        HT.changeStatusAll();
    });
})(jQuery);