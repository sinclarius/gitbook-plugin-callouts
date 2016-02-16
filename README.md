# Gitbook Plugin: Transform annotated quotes to callouts

This plugin was modified from [erixtekila/gitbook-plugin-richquotes](https://github.com/erixtekila/gitbook-plugin-richquotes) to create callouts similar to the ones provided by [Sphinx](http://www.sphinx-doc.org/).

## How to create callouts

Callouts are an extension of markdown blockquotes. All callouts must start with a h4 header, the callout type, and an optional title. The format for this is:

```
> #### type::title

(blockquote) (h4) (type)::(title)
```

Supported default callouts are:

- `> #### Info::Info`
- `> #### Note::Note`
- `> #### Tag::Tag`
- `> #### Comment::Comment`
- `> #### Hint::Hint`
- `> #### Success::Success`
- `> #### Warning::Warning`
- `> #### Caution::Caution`
- `> #### Danger::Danger`
- `> #### Quote::Quote`

Callouts are case-insensitive.

#### Installation

Add this plugin to your `book.json`:

```js
{
	"plugins": ["callouts"]
}
```

Then run `gitbook install` to download and install the plugin.

#### Override built-in callouts

You can add user defined or override built-in callouts in `book.json` file:

```js
{
	"plugins": ["callouts"],
	"pluginsConfig":
	{
		"callouts":
		{
			"star": {
				"alert": "warning",
				"picto": "fa-star"
			}
		}
	}
}
```

Alert values are:
* primary
* info
* success
* warning
* danger

Examples of each alert type are:

![Examples](examples.png)

Refer to [Font Awesome doc](http://fortawesome.github.io/Font-Awesome/icons/) for picto value.
