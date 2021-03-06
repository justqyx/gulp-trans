(function($) {

    var jquery_ztree_toc_opts = {
        debug: false,
        is_auto_number: true,
        highlight_on_scroll: true,
        documment_selector: '.markdown-body',
        ztreeStyle: {
            width: '320px',
            overflow: 'auto',
            position: 'fixed',
            'z-index': 1,
            border: '0px none',
            left: '0px',
            top: '0px',
            // 'overflow-x': 'hidden',
            'height': $(window).height() + 'px'
        }
    }

    var markdown_panel_style = {
        'width': '70%',
        'margin-left': '25%'
    };

    var transtool_opts = {
        toolbarselector: "#mp-menu",
        default_state: 'all',
        states: [{
            'all': {
                'icon': 'icon-shop',
                'display': "全部",
                click: function() {
                    alert('zh111');
                }
            },
            'zh': {
                'icon': 'icon-world',
                'display': "中文",
                click: function() {
                    alert('zh111');
                }
            },
            'en': {
                'icon': 'icon-cloud',
                'display': "英文",
                click: function() {
                    alert('en');
                }
            }
        }]
    };


    $(document).ready(function() {
        $('#readme').css(markdown_panel_style)
        $('#tree').ztree_toc(jquery_ztree_toc_opts);
        $.transtool(transtool_opts);
        new mlPushMenu(
            document.getElementById('mp-menu'),
            document.getElementById('normal-button'), {
                type: 'cover'
            });
    });

})(window.jQuery);
