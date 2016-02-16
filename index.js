var cheerio = require( "cheerio" )
	,$
	,options = // map annotations to styles
	{
		/* info */
		"info": {
			alert: "info",
			picto: "fa-info"
		},
		"note": {
			alert: "info",
			picto: "fa-edit"
		},
		"tag": {
			alert: "info",
			picto: "fa-tag"
		},
		"comment": {
			alert: "info",
			picto: "fa-comment-o"
		},
		/* success */
		"hint": {
			alert: "success",
			picto: "fa-lightbulb-o"
		},
		"success": {
			alert: "success",
			picto: "fa-lightbulb-o"
		},
		/* warning */
		"warning": {
			alert: "warning",
			picto: "fa-exclamation-triangle"
		},
		"caution": {
			alert: "warning",
			picto: "fa-exclamation-triangle"
		},
		"todo": {
			alert: "warning",
			picto: "fa-bookmark"
		},
		/* danger */
		"danger": {
			alert: "danger",
			picto: "fa-times-circle"
		},
		"fixme": {
			alert: "danger",
			picto: "fa-bug"
		},
		"bug": {
			alert: "danger",
			picto: "fa-bug"
		},
		/* quote */
		"quote": {
			alert: "quote",
			picto: "fa-quote-left"
		},
	}
;

module.exports = {
	book : {
		assets: "./book",
		css   : [
			"plugin.css"
		]
	},
	hooks: {
		// For all the hooks, this represent the current generator
		// This is called before the book is generated
		init  : function ()
		{
			// console.log( "callouts init!" );
			if( this.options.pluginsConfig && this.options.pluginsConfig.callouts )
			{
				// callouts is a POJO, save to use for-in
				var callouts = this.options.pluginsConfig.callouts;
				for (key in callouts) {
					// console.log(key, callouts[key]);
					options[key] = callouts[key] === false? undefined : callouts[key];
				}
			}
		},

		// This is called for each page of the book
		// It can be used for modifying page content
		// It should return the new page
		page  : function ( page )
		{
			var section
				,$bq
				,$this
				,$strong
				,style
				;

			for ( var i in page.sections )
			{
				section = page.sections[i];
				if ( section.type !== "normal" )
				{
					continue;
				}

				$ = cheerio.load( section.content );
				$bq = $( "blockquote" ).each(function () {
$this = $(this);
    $testheader = $this.find('h4:first-child');
    if( !$testheader || $testheader.length == 0) {
        return;
    }

    var children = $this.children().toArray();
    $header = children.shift();

    $title = $($header).text();
    $parts = $title.split('::', 2);

    var style = options[$parts[0].toLowerCase()] ?  // look up annotation in options
                options[$parts[0].toLowerCase()] :
                options['default'];

    if (!style) {
        return;
    }

    var icon = $('<i>')
                .addClass('fa ' + style.picto);

    var title = ($parts[1] === "") ? $parts[0] : $parts.join(": ");
    var panelTitle = $('<h3>')
                    .addClass('panel-title')
                    .append(icon)
                    .append(" " + title)
                    ;
    var panelHeading = $('<div>')
                    .addClass('panel-heading')
                    .append(panelTitle)
                    ;
    var panelBody = $('<div>')
                    .addClass('panel-body')
                    .append(children)
                    ;


    var panel = $('<div>')
                .addClass('panel panel-' + style.alert)
                .append(panelHeading)
                .append(panelBody);

    $this.before(panel);
    $this.remove();

					// Replace by the transformed element
					section.content = $.html();
				});
			}

			return page;
		}
	}
};
