## Bug description

The navigation menu can be opened and closed. If the site is loaded on desktop (defined as a window width of more than 768 pixels), then the menu should start in the open state. If the site is loaded with a window width of less than 768 pixels the menu should start in the closed state. I use `window.matchMedia` to check the window width.

This works fine in development (try it with `npm run develop`). But when I build the site something strange occurs. If I load the page in a wide window the menu button doesn't work. However, if I reload the page while it has a narrow width and resize afterwards to a wide window the menu button now works. (try it with `npm run build` and `npm run serve`)

Check the console in development and after building. When the menu button doesn't work, it's onClick handler is never called.

Why is this happening? I'm even using the `DEV_SSR` flag, to pre-empt bugs like this.
