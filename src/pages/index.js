import React, {
  useState,
} from 'react'
import classNames from 'classnames'

import css from './index.module.scss'
import 'hamburgers/dist/hamburgers.css'

// we can use window.matchMedia if we're not in SSR and if the function is available
function canMatchMedia () {
  const hasMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
  console.log('hasMatchMedia', hasMatchMedia)
  return hasMatchMedia
}

function isMobile () {
  const isLessThan768 = window.matchMedia('screen and (max-width: 768px)').matches
  console.log('isLessThan768', isLessThan768)
  return isLessThan768
}

function Menu () {
  return (
    <nav
      className={classNames([
        css.menu,
      ])}
    >
      <ul>
        <li>Some</li>
        <li>items</li>
        <li>in</li>
        <li>here</li>
      </ul>
    </nav>
  )
}

function BurgerButton ({ isActive, inMenu = false, onClickHandler }) {
  // Hides and disables the burger/cross in these situations:
  // - if it's in the menu it's hidden and disabled when the menu is closed
  // - if it's on the page it's hidden and disabled when the menu is opened
  const isInvisible = inMenu
    ? !isActive
    : isActive
  return (
    <button
      className={classNames([
        'hamburger',
        'hamburger--boring',
        css.burger,
      ], {
        'is-active': isActive,
        [css.burgerOnPage]: !inMenu,
        [css.burgerInMenu]: inMenu,
        [css.invisible]: isInvisible,
      })}
      type='button'
      onClick={() => {
        console.log('clicked menu button')
        onClickHandler()
      }}
      disabled={isInvisible}
    >
      <span className='hamburger-box'>
        <span className='hamburger-inner' />
      </span>
    </button>
  )
}

function Page () {
  // on desktop the menu starts in the open position
  const [ menuIsOpen, setMenuIsOpen ] = useState(
    // We first check if `window.matchMedia` is available...
    canMatchMedia()
      // ... if it is, we check the width of the window so that the menu starts in an
      // open position on desktop...
      ? !isMobile()
      // ... otherwise we just start with the menu in a closed position
      : false
  )
  console.log('menuIsOpen', menuIsOpen)

  const toggleMenu = () => {
    console.log('toggling')
    setMenuIsOpen((prev) => {
      console.log('previous value of menuIsOpen was', prev, ' and is now', !prev)
      return !prev
    })
  }

  return (
    <div
      className={classNames([
        css.siteWrapper,
      ])}
    >
      <main>
        <aside
          className={classNames([
            css.element,
            css.sidebar,
          ], {
            [css.sidebarOpened]: menuIsOpen,
            [css.sidebarClosed]: !menuIsOpen,
          })}
        >
          {/*
            ⚠️ This burger button is placed in the menu.
            It's hidden and disabled while the menu is CLOSED.
          */}
          <BurgerButton
            isActive={menuIsOpen}
            inMenu
            onClickHandler={toggleMenu}
          />

          <Menu
            menuIsOpen={menuIsOpen}
          />
        </aside>

        <section
          className={classNames([
            css.element,
            css.contentWrapper,
          ], {
            [css.preventScrollOnMobileWhenMenuIsOpen]: menuIsOpen,
            [css.fillScreen]: !menuIsOpen,
          })}
        >
          {/*
            ⚠️ This burger button is placed on the page.
            It's hidden and disabled while the menu is OPEN.
          */}
          <BurgerButton
            isActive={menuIsOpen}
            onClickHandler={toggleMenu}
          />

          <article
            className={classNames([
              css.content,
            ])}
          >
            <h2>Bug description</h2>

            <p>
              The navigation menu can be opened and closed. If the site is loaded on
              desktop (defined as a window width of more than 768 pixels), then the menu
              should start in the open state. If the site is loaded with a window width
              of less than 768 pixels the menu should start in the closed state. I use
              window.matchMedia to check the window width.
            </p>

            <p>
              This works fine in development (try it with "npm run develop"). But when I
              build the site something strange occurs. If I load the page in a wide
              window the menu button doesn't work. However, if I reload the page while it
              has a narrow width and resize afterwards to a wide window the menu button
              now works. (try it with "npm run build" and "npm run serve")
            </p>

            <p>
              Check the console in development and after building. When the menu button
              doesn't work, it's onClick handler is never called.
            </p>

            <p>
              Why is this happening? I'm even using the DEV_SSR flag, to pre-empt bugs
              like this.
            </p>
          </article>
        </section>
      </main>
    </div>
  )
}
export default Page
